---
scope: kit
---

# Aller plus loin avec SvelteKit

De même que pour Svelte, SvelteKit offre plein d'autres possibilités que nous n'avons pas eu le
temps d'aborder.

En voici quelques unes que vous pouvez étudier de votre côté.

> Cette liste n'est pas ordonnée.

## Fonctions `load`

Nous avons étudié les fonctions `load` des fichiers `+page.server.ts` et `+layout.server.ts`, mais
il est aussi possible d'en déclarer dans des fichiers `+page.ts` ou `+layout.ts`, ce qui leur permet
d'être aussi exécutées sur client. On les appelle _fonctions `load` universelles_.

Nous avons également mentionné le fait qu'il était possible d'utiliser `await parent()`, même cela
est généralement déconseillé.

Il est aussi possible de manipuler les headers au sein des `load`.

Vous trouverez plus de détails sur tous ces sujets [dans la documentation
officielle](https://kit.svelte.dev/docs/load).

## Groupes de layout

Pour éviter de créer un étage à nos routes tout en permettant d'utiliser un layout commun, vous
pouvez utiliser les [groupes de
layout](https://kit.svelte.dev/docs/advanced-routing#advanced-layouts-group).

## Navigation

SvelteKit permet d'interagir avec la navigation entre pages. Apprenez-en plus
[ici](https://kit.svelte.dev/docs/modules#$app-navigation) et
[là](https://kit.svelte.dev/docs/modules#$app-stores-navigating)

## Paramètres de reste et optionnels

Le routing offre des possibilités assez poussées, notamment via [les paramètres de
reste](https://kit.svelte.dev/docs/advanced-routing#rest-parameters), permettant de grouper
plusieurs segments d'un path sous une seule variable, et les [paramètres
optionnels](https://kit.svelte.dev/docs/advanced-routing#optional-parameters), rendant un segment de
path optionnel.

## Variables d'environnement

Les variables d'environnement sont un outil indispensable pour le déploiement en production.

SvelteKit propose plusieurs moyens de les rendre disponible dans votre application :

- [variables statiques privées](https://kit.svelte.dev/docs/modules#$env-static-private)
- [variables statiques publiques](https://kit.svelte.dev/docs/modules#$env-static-public)
- [variables dynamiques privées](https://kit.svelte.dev/docs/modules#$env-dynamic-private)
- [variables dynamiques publiques](https://kit.svelte.dev/docs/modules#$env-dynamic-public)

## Autres hooks

On a vu le [hook `handle`](../14_auth/04_hooks.md) permettant de réagir à toute requête arrivant sur
le serveur SvelteKit.

Il existe d'[autres hooks](https://kit.svelte.dev/docs/hooks) pouvant être utiles pour gérer les
erreurs, les appels `fetch` de serveur, etc.

## Gestion des images

SvelteKit, via Vite, vous permet de [prégénérer vos images](https://kit.svelte.dev/docs/images) sous
différents formats afin d'alléger le poids de votre application en fonction des situations.

## Transitions de pages

Il existe une API web – encore expérimentale – permettant d'[animer les changements de
page](https://developer.chrome.com/docs/web-platform/view-transitions/).

SvelteKit permet de [s'en servir](https://svelte.dev/blog/view-transitions).

## Packaging

Si, plutôt que de créer une application SvelteKit, vous souhaitez créer une librairie autour de
Svelte – une librairie de composants par exemple –, SvelteKit vous permet également de [packager
efficacement votre code](https://kit.svelte.dev/docs/packaging) pour qu'il soit facilement
consommable par d'autres personnes.
