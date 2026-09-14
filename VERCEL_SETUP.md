# Connexion réelle des marchés — V11

Pour une connexion de marché sérieuse, le front ne doit pas exposer une clé privée.

1. Crée un compte Alpha Vantage et une clé API via leur page officielle.
2. Déploie ce dossier sur Vercel (le dossier `api/quotes.js` est une Serverless Function).
3. Dans Vercel → Settings → Environment Variables, ajoute:
   `ALPHA_VANTAGE_KEY = ta_clé`
4. Dans l'application, le connecteur doit pointer vers:
   `/api/quotes`
5. Recharge l'app.

Alpha Vantage documente explicitement la couverture du Toronto Stock Exchange avec des symboles comme `SHOP.TRT`, ainsi que les endpoints de cotations et historiques. Pour les données réellement temps réel, les droits d'entitlement peuvent dépendre du marché et du plan; l'app doit afficher l'état de fraîcheur au lieu de prétendre qu'une donnée retardée est temps réel.

Ne mets jamais la clé API dans `index.html`, le dépôt GitHub public ou le LocalStorage.
