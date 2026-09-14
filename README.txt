MARKET CONNECTOR
The UI expects GET /api/quotes?symbols=ZEB.TO,XEQT.TO,SPCX.TO and a JSON object:
{
  "ZEB.TO":{"price":123.45,"changePct":0.42},
  "XEQT.TO":{"price":45.20,"changePct":-0.54}
}
For production, connect this endpoint to a licensed market-data provider and keep the provider API key server-side.
Do not put a private API key in index.html or GitHub Pages.
