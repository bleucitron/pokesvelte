---
subtitle: Michel, je pige toujours pas bien la diff'
description: Rappel des différences entre Svelte et SvelteKit
---

# Svelte vs SvelteKit

Bon, on a déjà écrit un peu de code, du SvelteKit... mais aussi du Svelte !

Il y a bien quelques explications théoriques sur la différence entre les deux dans [ce
chapitre](../00_introduction/02_svelte_and_sveltekit.md), mais il n'est pas toujours simple de
savoir concrètement ce qui relève de l'un ou de l'autre.

## C'est quoi Svelte déjà ?

Svelte est un framework de **composants** : son objectif est d'orchestrer des éléments d'interface
en fonction de données. Son scope relève donc du lien entre la donnée que l'on souhaite afficher et
le HTML.

Du coup, dès que vous écrivez du markup dans un fichier `.svelte`, vous faites de facto du Svelte.
De même, le code à l'intérieur des `<script>` des fichiers `.svelte`, c'est Svelte qui le traite.

Pour simplifier, **si vous travaillez dans un fichier `.svelte`, c'est Svelte qui est aux
commandes**.

## Mais alors, c'est quoi la diff' avec SvelteKit ?

SvelteKit est un framework d'**application** : ses objectifs principaux sont d'orchestrer les
composants Svelte en des pages, de gérer le rendu côté serveur, et de fournir les pages en données.
De plus, SvelteKit gère la navigation entre les différentes pages.

Tous les fichiers `+page.svelte`, `+layout.svelte`, `+error.svelte`, `+page.server.ts` et
`+layout.server.ts` sont des fichiers spéciaux de SvelteKit permettant de définir des pages (ou des
layouts) et de les fournir en données. Ces fichiers n'auraient pas de sens particulier dans une
application Svelte simple.

Pour simplifier, **tout ce qui relève de ces fichiers en `+page.*`, `+layout.*` ou `+error.*` relève
de SvelteKit**.

> Nous n'avons jusque là vu que des fichiers `.svelte` ayant un sens pour SvelteKit – comme
> `+page.svelte` par exemple. Mais il est bien sûr possible de créer des fichiers `.svelte` avec le
> nom que l'on souhaite.

## Euh... mais c'est pas un peu la même chose ?

Ça dépend.

Effectivement, on a dit que Svelte s'occupait des fichiers `.svelte`, et que SvelteKit s'occupait
des fichiers `+page.*`, mais alors qui s'occupe des fichiers `+page.svelte` ??

Les deux, mais à des niveaux différents.

SvelteKit s'occupe d'associer le fichier `+page.svelte` à la route correspondante (selon le nom du
dossier parent), de lui fournir les données de page définies dans la fonction `load` du
`+page.server.ts` correspondant, et de déclencher le rendu côté serveur lorsque nécessaire.

Svelte s'occupe de transformer le markup défini dans le fichier `+page.svelte` en HTML correpondant,
en fonction des données fournies.

Donc oui, les fichiers `+page.svelte`, `+layout.svelte` et `+error.svelte` sont au milieu entre
Svelte et SvelteKit.

## Il y a des fichiers 100% Svelte et 100% SvelteKit ?

Oui.

Les fichiers `*.server.ts` sont exclusivement utilisés par SvelteKit (ainsi que d'autres, dont
l'usage est plus anecdotique).

Les fichier `*.svelte` ne commencant pas par `+` – donc pas `+page.svelte`, `+layout.svelte` ou
`+error.svelte` – sont (presque) exclusivement gérés par Svelte (voir note ci-dessous).

> Il est tout de même possible de servir de fonctionnalités SvelteKit au sein de n'importe quel
> fichier `.svelte` – pas que les `+page` ou `+layout` – comme lorsque l'on a utilisé le [store de
> page](../01_sveltekit_basics/05_page_store.md) importé depuis `$app/stores`. Dans ce cas, le
> fichier a une dépendance envers SvelteKit.

L'étude du fonctionnement des fichiers `.svelte` au sens large – et donc de Svelte – est abordée au
chapitre suivant.
