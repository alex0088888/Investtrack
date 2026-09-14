# InvestTrack V12.1 — market connector fix

This patch keeps the V12 interface but fixes the market connection flow:
- includes the Vercel serverless function at `api/quotes.js`;
- validates `ALPHA_VANTAGE_KEY` server-side;
- handles Toronto `.TO` symbols via Alpha Vantage's `.TRT` format and retries the original symbol;
- returns useful provider errors instead of silently showing “Non configurée”;
- the app now displays the actual connection error in the toast.

## Vercel
1. Replace the GitHub repository contents with this package.
2. Keep `ALPHA_VANTAGE_KEY` in Vercel Project Settings → Environment Variables.
3. Make sure the variable is enabled for Production.
4. Push the changes to GitHub so Vercel creates a new deployment.
5. Open InvestTrack → Réglages → Connexion aux marchés → `/api/quotes` → Tester maintenant.

Never put the Alpha Vantage key in `index.html` or GitHub.
