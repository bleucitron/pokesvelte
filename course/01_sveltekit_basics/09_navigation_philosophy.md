# Philosophie de routing

Un des objectifs d'un framework d'application tel que SvelteKit est de vous permettre de construire une application web performante sans trop de difficultés. Et la performance dans le cadre d'une application web se [mesure notamment](https://web.dev/explore/metrics?hl=fr) par la rapidité de chargement de ses pages.

Il est donc primordial d'optimiser ce qui peut l'être pour que la navigation au sein d'une application soit la plus fluide possible. SvelteKit utilise plusieurs stratégies dans cette optique.

## Routing client

Une application SvelteKit a par défaut une stratégie de routing **client**. Cela signifie qu'une fois la première chargée, un script spécial s'exécute et attend les demandes de navigation vers d'autres pages de l'application.

Lorsqu'une telle demande se produit (par exemple lors d'un clic sur un lien), le script intercepte l'évènement, empêchant ainsi le comportement par défaut du navigateur qui serait de demander le HTML de la page demandée. À la place, SvelteKit demande le code JavaScript nécessaire à la construction des éléments de la nouvelle page, ainsi que les éventuelles ressources et données nécessaires.

SvelteKit remplace alors les éléments de la page actuelle par ceux de la nouvelle page (_hydratation_), laissant intacts les éventuels éléments de layout qui sont en commun.

Cette stratégie a plusieurs avantages :

- la page n'est jamais entièrement détruite (pas de "flash" entre deux pages)
- le script et les ressources statiques d'une page ne seront toujours chargées qu'une seule fois
- les données de page ne sont chargées que lorsque nécessaire

On appelle ce type de stratégie du **routing client**, à opposer au routing serveur, où le navigateur se charge de requêter et construire les pages à chaque navigation.

Cela permet d'optimiser les chargements de page, et de construire des expériences de navigation fluides et continues. Par exemple, sur une application web comme [www.radiofrance.fr](www.radiofrance.fr), vous pouvez lancer le lecteur audio sur une page, puis naviguer vers une autre page de l'application sans que le lecteur ne s'arrête.

> Cette stratégie n'est pas propre à SvelteKit, d'autres frameworks proposent des choses similaires.

Nous verrons [plus tard]() qu'il est possible de modifier le comportement de SvelteKit concernant le routing.

[Plus de détails sur ce sujet](https://kit.sveltefr.dev/docs/glossary#routing)

## Préchargement des liens

Vous avez peut-être remarqué une chose étrange : parfois, des choses sont chargées par le navigateur sans que vous ayez cliqué nulle part...

C'est parce que par défaut, SvelteKit précharge les pages au survol des liens : si vous survolez un lien avec votre souris (ou si vous mettez le focus sur un lien avec votre clavier), toutes les ressources et données nécessaires à la construction de cette page sont chargées, comme si vous aviez cliqué sur le lien.

Cela permet de ne plus avoir à faire des chargements au moment où le clic sur le lien a lieu pour de vrai, donnant l'illusion d'une navigation instantanée. En d'autres termes, le délai entre le survol du lien et le clic sur le lien est utilisé pour gagner du temps sur le chargement de la page.

Cette astuce n'est bien sûr pas efficace si :

- vous cliquez instantanément au survol d'un lien
- vous survolez toute la page sans jamais cliquer sur aucun lien

> Il est possible d'activer ou désactiver le préchargement des liens selon les besoins.

[Plus de détails sur ce sujet](https://kit.sveltefr.dev/docs/link-options)
