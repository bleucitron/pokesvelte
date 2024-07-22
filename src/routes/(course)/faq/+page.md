<script lang='ts'>
    import Tag from '$lib/components/Tag.svelte'
</script>

<svelte:head>

<title>À propos</title>

<meta name="description" content="Réponses aux questions que l'on peut se poser à propos de ce
    tutoriel" />

</svelte:head>

# À propos

## C'est quoi PokéSvelte ?

PokéSvelte est un tutoriel pour apprendre à construire des applications web avec Svelte 5 et
SvelteKit.

L'idée est de créer une application web simple de la première page de base jusqu'à son
déploiement.

C'est le fruit de nombreuses années d'expérience dans le milieu web front-end en tant que
développeur et formateur, et de plusieurs années à maturer l'envie de produire un contenu
pédagogique sur le web sans néanmoins franchir le pas.

## Svelte ? SvelteKit ?

Il est probable que la réponse à cette question se trouve [quelque part sur ce
site](/00_introduction/02_svelte_and_sveltekit), mais en résumé il s'agit de deux outils
complémentaires utiles pour construire des applications web relativement simplement.

[Svelte](svelte.dev/svelte) permet de construire des briques d'interface sous forme de composants.

[SvelteKit](svelte.dev/kit) permet lui d'organiser ces briques en tant que pages d'une application.

## Y a t'il des préquis à avoir pour suivre ce tutoriel ?

Oui, mais pas tant que ça.

Il est indispensable d'avoir des notions de ce que sont les technologies web de base – HTML, CSS,
JavaScript – sans lesquelles vous n'aurez pas le vocabulaire technique pour appréhender ce contenu.

Il est également recommandé de savoir se servir de [npm](npmjs.com) (ou équivalent), ainsi que d'un
IDE.

Aucune connaissance de Svelte ou SvelteKit n'est en revanche nécessaire pour suivre ce tutoriel.

## C'est payant ?

Non.

Le contenu de PokéSvelte est open-source, tout le monde peut s'en servir gratuitement.

## Comment faire si je suis bloqué•e ?

Il existe une [correction exercice par
exercice](https://github.com/bleucitron/pokesvelte/compare/start...end).

Je vous recommande d'essayer de vous en servir le moins possible, mais ça peut toujours débloquer
les situations désespérées.

## Qu'est-ce que vous ne trouverez pas ici ?

### Un cours sur Svelte 4 / un tutoriel pour passer une codebase Svelte 4 en Svelte 5.

Ce tutoriel traite uniquement de la syntaxe Svelte 5.

Aucun comparatif entre les syntaxes Svelte 4 et Svelte 5 n'est présent dans ce tutoriel. Vous pouvez
toujours vous référer à la [documentation
officielle](https://svelte.dev/docs/svelte/v5-migration-guide) si c'est ce que vous cherchez.

### Un cours sur la sécurité des applications web ou les bases de données

Certains des utilitaires fournis dans ce tutoriel permettent d'utiliser une pseudo base de données
en local (via du JSON) permettant uniquement de stocker des données simples dans le cadre de la
progression pédagogique de ce cours.

Ces utilitaires sont naïvement simplifiés pour les besoin de ce cours, et stockent notamment les
mots de passe fournis en clair, ce qu'il ne faut bien sûr pas faire dans le cadre d'une projet réel.

En aucun cas l'ambition ici n'est de former sur les sujets complexes que sont la sécurité des
applications web ou les bases de données, même si quelques notions peuvent être mentionnées.

## Pourquoi ce tutoriel commence par parler de SvelteKit, et pas Svelte ?

Parce que je tente une approche différente de ce que j'ai pu faire en tant que formateur jusqu'ici.

De la même manière qu'on n'apprend pas à conduire en commençant par apprendre comment marche un
moteur, la progression de ce tutoriel n'est pas "linéaire" dans le sens où il ne vous propose pas
d'"apprendre Svelte" puis d'"apprendre SvelteKit".

À la place, ce contenu prend le parti de prioriser les besoins plutôt que les moyens. Les notions
techniques sont donc présentées et illustrées au moment où le besoin les rend nécessaires. Comme
mentionné plus haut, tout le contenu est orienté vers la construction d'une application web simple,
du début à la fin. Toutes les mises en pratique se font dans le cadre de cet objectif. Il n'y a pas
d'exercice "isolé", chaque exercice ajoute une brique supplémentaire à l'application que l'on
construit.

Il est important de noter que chaque partie est axée sur Svelte ou sur SvelteKit, en fonction de ce
qui est le plus pertinent à ce moment là. Pour vous aider à vous y retrouver, les parties traitant
de Svelte sont représentées par un badge <Tag scope="svelte" /> et une couleur dominante <span
    class="svelte">orange</span> – celles traitant de SvelteKit sont représentées par un badge <Tag
    scope="kit"/> et une couleur dominante <span class="kit">bleue</span>.

## Qui a écrit ce contenu ?

Je m'appelle [Romain](https://github.com/bleucitron).

Je suis développeur web depuis 2014, et formateur depuis 2017. Je travaille à plein temps sur Svelte
et SvelteKit depuis 2020.

J'ai notamment travaillé pendant 3 ans pour [Radiofrance](https://www.radiofrance.fr/), dont la
plateforme web est écrite en Svelte et SvelteKit.

## Comment puis-je te contacter ?

Je zone de temps à autre sur le serveur [Discord de Svelte](https://discord.gg/fW4Ur4xZ), ainsi que
sur le serveur [Discord Svelte francophone](https://discord.gg/N3UTWGt7).

N'hésitez pas à nous rendre visite et m'y faire un petit coucou !
