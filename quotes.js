export default async function handler(req, res) {
  const key = process.env.ALPHA_VANTAGE_KEY;
  if (!key) return res.status(500).json({error:"ALPHA_VANTAGE_KEY missing"});
  const symbols = String(req.query.symbols || "").split(",").filter(Boolean).slice(0,8);
  const out = {};
  for (const symbol of symbols) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol.replace(/\.TO$/i,".TRT"))}&apikey=${encodeURIComponent(key)}`;
    const r = await fetch(url);
    const j = await r.json();
    const q = j["Global Quote"] || {};
    if (q["05. price"]) {
      out[symbol] = {
        price: Number(q["05. price"]),
        changePct: Number(String(q["10. change percent"]||"0").replace("%",""))
      };
    }
  }
  res.setHeader("Cache-Control","s-maxage=30, stale-while-revalidate=120");
  return res.status(200).json(out);
}
