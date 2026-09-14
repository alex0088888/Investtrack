# InvestTrack V12 — Interactive Premium

V12 change la philosophie de l'app : ce n'est plus une simple page portefeuille. Les icônes de navigation ouvrent de vraies vues et les actions modifient des données locales.

## Fonctionnel
- Navigation Vue / Marchés / Ajouter / Objectifs / Réglages
- Détail d'une position au toucher
- Recherche de titres dans le portefeuille
- Ajout de positions
- Ajout de transactions et historique d'activité
- Objectif patrimoine modifiable
- Projection 10/20/30 ans avec curseurs
- Export JSON des données locales
- Réglages de connexion marché
- Badge explicite « Données de démo » tant que l'API n'est pas configurée
- PWA installable

## Marché réel
Le backend `api/quotes.js` de V11 est conservé. Il faut configurer `ALPHA_VANTAGE_KEY` sur Vercel pour connecter l'endpoint `/api/quotes`. La clé ne doit pas être mise dans le navigateur.
