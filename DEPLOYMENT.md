# InvestTrack — mise en production

## Ce que V11 fait
- UI premium originale
- PWA installable sur iPhone
- Portefeuille local avec positions
- Objectif patrimoine
- Simulateur composé
- Connecteur de marché prêt pour un endpoint `/api/quotes`
- Aucun secret/API key dans le navigateur

## Données de marché
Une vraie application de production ne devrait pas dépendre d'un endpoint Yahoo non documenté. Yahoo Finance expose des endpoints internes sans CORS et sans contrat API officiel. Pour une app sérieuse, branche `/api/quotes` sur un fournisseur autorisé/licencié.

Le front attend:
GET /api/quotes?symbols=ZEB.TO,XEQT.TO,SPCX.TO

Réponse:
{"ZEB.TO":{"price":123.45,"changePct":0.42},"XEQT.TO":{"price":45.20,"changePct":-0.54},"SPCX.TO":{"price":24.70,"changePct":0.50}}

Une fois l'endpoint hébergé, ajoute dans localStorage:
it_market_endpoint = "/api/quotes"
Tu peux le faire depuis la console du navigateur ou adapter la ligne dans index.html.

## Important
Le symbole SPCX est ambigu selon la source: le CDR SpaceX utilise SPCX.TO, tandis que le FNB Purpose SpaceX Yield Shares lancé en juin 2026 utilise SPXY. Vérifie ton relevé de courtage avant de choisir le symbole.
