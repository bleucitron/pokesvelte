# Stratégies de routing

## Héritage: MPAs

Historiquement, les applications web étaient ce qu'on appelle des MPAs (Multi Page Applications). La navigation sur une MPA se faisait de la manière suivante:

- le navigateur demande la page `home.html` au serveur
- le serveur envoie la page `home.html` au navigateur _(parfois en l'ayant construite)_
- le navigateur lit le fichier HTML
- le navigateur demande les ressources nécessaires (CSS, scripts, fonts...)
- le navigateur construit la page _(souvent en parallèle de l'étape précédente)_

Une fois sur l'application, toute nouvelle navigation vers une page suit le même processus, quelque soit la page demandée, et ce même si des éléments sont communs à plusieurs pages, ou même si on a déjà visité une page.

- un clic sur un le lien vers `/profile` se produit
- le navigateur demande la page `profile.html` au serveur
- le serveur envoie la page `profile.html` au navigateur
- le navigateur lit le fichier HTML
- le navigateur demande les ressources nécessaires
- le navigateur construit la page

> Le cache du navigateur peut souvent vous aider à ne pas re-télécharger inutilement certaines pages et ressources, mais pas toujours.

En plus de ne pas être idéal en termes de chargement de données, cette stratégie implique que votre navigateur détruise et reconstruise intégralement chaque page à chaque navigation, amenant à des "flashs" lors des changements de page.

## Héritage: SPAs

Une autre stratégie de chargement a été popularisée dans les années 2010 (notamment grâce à React): les SPAs (Single Page Applications). La navigation sur une SPA se fait de la manière suivante :

- le navigateur demande la page `home.html` au serveur
- le serveur envoie un fichier HTML presque vide
- le navigateur lit le fichier HTML
- le navigateur demande les ressources nécessaires, dont un script contenant **tout le code nécessaire à la gestion de l'application**
- le script est exécuté par le navigateur et construit tout le HTML de manière programmatique

Une fois sur l'application, toute nouvelle navigation vers une page se fait intégralement dans le navigateur. En effet, celui-ci a toutes les informations pour afficher n'importe quelle page.

- un clic vers un lien se produit
- le script de l'application intercepte ce clic
- le script construit et remplace les éléments nécessaires pour afficher la nouvelle page

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/modules#$app-stores-page)
