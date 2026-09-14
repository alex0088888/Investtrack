const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeForAlpha(symbol) {
  const s = String(symbol || '').trim().toUpperCase();
  if (!s) return '';
  // Alpha Vantage uses .TRT for Toronto-listed symbols.
  if (/\.TO$/.test(s)) return s.replace(/\.TO$/, '.TRT');
  return s;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const key = process.env.ALPHA_VANTAGE_KEY;
  if (!key) {
    return res.status(500).json({
      ok: false,
      error: 'ALPHA_VANTAGE_KEY missing on this deployment. Add it in Vercel → Settings → Environment Variables, then redeploy.'
    });
  }

  const raw = String(req.query?.symbols || '');
  const symbols = [...new Set(raw.split(',').map(s => s.trim().toUpperCase()).filter(Boolean))].slice(0, 8);
  if (!symbols.length) {
    return res.status(400).json({ ok: false, error: 'No symbols supplied. Example: /api/quotes?symbols=ZEB.TO' });
  }

  const out = {};
  const errors = [];

  for (const original of symbols) {
    const candidates = [normalizeForAlpha(original)];
    if (candidates[0] !== original) candidates.push(original);

    let success = false;
    let lastMessage = '';

    for (const alphaSymbol of candidates) {
      try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(alphaSymbol)}&apikey=${encodeURIComponent(key)}`;
        const r = await fetch(url);
        const text = await r.text();
        let j;
        try { j = JSON.parse(text); } catch { j = {}; }

        if (!r.ok) {
          lastMessage = `Alpha Vantage HTTP ${r.status}`;
          continue;
        }

        const q = j['Global Quote'] || {};
        if (q['05. price']) {
          out[original] = {
            price: Number(q['05. price']),
            changePct: Number(String(q['10. change percent'] || '0').replace('%', '')),
            providerSymbol: alphaSymbol,
            source: 'Alpha Vantage'
          };
          success = true;
          break;
        }

        lastMessage = j.Note || j.Information || j['Error Message'] || 'No quote returned for this symbol';
        // Do not hammer the provider if it reports a rate-limit message.
        if (/frequency|rate limit|25 requests/i.test(lastMessage)) break;
      } catch (err) {
        lastMessage = err?.message || 'Network error';
      }
    }

    if (!success) errors.push({ symbol: original, message: lastMessage });
    await sleep(120);
  }

  if (!Object.keys(out).length) {
    return res.status(502).json({
      ok: false,
      error: 'Le serveur fonctionne, mais Alpha Vantage n’a renvoyé aucun cours.',
      symbols,
      details: errors
    });
  }

  return res.status(200).json({ ok: true, quotes: out, errors });
}
