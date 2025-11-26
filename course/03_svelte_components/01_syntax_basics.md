---
scope: svelte
subtitle: Tu vois le HTML ? Bah c'est (presque) pareil
description: Bases de la syntaxe Svelte
---

# Syntaxe de base

Un composant Svelte est par nature un fichier `.svelte`.

La syntaxe Svelte est conçue pour être une extension de la syntaxe HTML, du **HTML avec des supers
pouvoirs**. Ce qui signifie que vous pouvez renommer un fichier `.html` valide en `.svelte`, et vous
aurez un composant Svelte fonctionnel.

> Le code à l'intérieur d'un fichier Svelte sera transformé lors de la compilation en du JavaScript
> et CSS équivalents permettant d'être utilisés par un navigateur.

Il est important de noter que **vous ne pouvez définir qu'un seul composant dans un fichier
`.svelte`**. Après compilation du fichier `.svelte`, le module compilé possède un export par défaut,
qui est le composant en lui-même.

> Nous avons déjà écrit quelques composants ensemble. Une page ou un layout SvelteKit sont des
> composants à part entière.

## Script, markup, style

Une page web moderne est généralement constituée de trois choses : du markup (HTML), du script
(JavaScript) et du style (CSS). Svelte se base sur ce principe et nous permet d'écrire les trois
dans un fichier `.svelte`.

```svelte
<script>
	console.log('Youpiii, je suis le script !!!');
</script>

<h1>Bonjour.</h1>
<p>Je suis le markup.</p>

<style>
	h1 {
		font-size: 1.5rem;
		color: red;
	}
</style>
```

> Les avis sont partagés sur le fait d'écrire dans un même fichier du HTML, du JavaScript, et du
> CSS. Mais en soi, les trois fonctionnent la plupart du temps ensemble, il y a donc beaucoup de
> sens à les regrouper.

> Le script, le markup et le style de votre composant sont souvent positionnés dans cet ordre là
> dans les fichiers `.svelte`, mais il n'y a pas de règle particulière. Vous pouvez néanmoins
> utiliser [Prettier pour automatiser un ordre de votre
> choix](https://github.com/sveltejs/prettier-plugin-svelte?tab=readme-ov-file#svelte-sort-order).

## Script

Vous pouvez écrire du JavaScript au sein de la balise `<script>` comme vous le feriez normalement.
Ce script sera exécuté **une et une seule fois** pour chaque instance du composant (au moment de
l'instanciation).

```svelte
<script>
	console.log('Youpiii, je suis le script !!!'); // Ce log ne s'affichera qu'une fois par instance
</script>
```

> Si vous êtes habitué•e à React, vous risquez d'avoir des surprises.

> Comme on l'a déjà vu, il est possible d'utiliser TypeScript dans une balise `<script lang='ts'>`,
> si vous avez choisi l'option TypeScript lors de l'installation de votre projet.

## Markup

La syntaxe Svelte est basée sur la syntaxe HTML, mais elle va plus loin, permettant de faire des
choses qui seraient impossibles en HTML normal.

Vous pouvez notamment insérer des données dynamiques dans votre markup en les entourant de `{}`.
Toutes les variables définies dans le `<script>` peuvent être utilisées de cette manière dans le
markup. Vous pouvez même faire des calculs !

> Le "markup" est le code HTML que l'on écrit.

```svelte
<script>
	const name = 'Louison';
	const a = 1;
	const b = 2;
</script>

<h1>Je m'appelle {name}.</h1>

<p>Je sais compter jusqu'à {a + b}.</p>
```

Vous pouvez aussi définir des attributs HTML en fonction de variables.

```svelte
<script>
	const address = 'https://www.github.com/bleucitron';
</script>

<a href={address}>Mon profil Github</a>
```

Si vous choisissez le même nom de variable que l'attribut ciblé, vous avez accès à une syntaxe
raccourcie.

```svelte
<script>
	const href = 'https://www.github.com/bleucitron';
</script>

<a {href}>Mon profil Github</a>
```

## Style

Vous pouvez définir du style dans la balise `<style>` de votre fichier `.svelte`.

**Le style défini dans un fichier `.svelte` ne s'appliquera que sur les éléments HTML définis
directement dans ce même fichier**. C'est ce qu'on appelle le "scoping" du style. Vous n'avez donc
pas à vous soucier d'impacter des styles ailleurs dans votre application lorsque vous travaillez sur
un composant particulier.

Vous pouvez tout de même rendre certains styles globaux, avec
[`:global`](https://svelte.dev/docs/svelte/global-styles). Cela est toutefois plutôt déconseillé.

Ce scoping par défaut rend l'usage de [Tailwind CSS](https://tailwindcss.com/) ou des [CSS
Modules](https://github.com/css-modules/css-modules) moins utiles dans un projet Svelte.

> Il est possible d'utiliser SASS ou PostCSS dans une balise `<style lang='sass'>` ou `<style
lang='postcss'>`, si vous [configurez correctement votre
> projet](https://svelte.dev/docs/kit/integrations).

## Instanciation

Une fois que votre composant est prêt, vous pouvez l'utiliser dans un autre composant. Pour cela, il
suffit :

- d'importer l'export par défaut du module JavaScript correspondant (le fichier `.svelte`)
- d'instancier votre composant où bon vous semble dans votre markup

```svelte
<script>
	import Person from './Person.svelte';
</script>

<!-- une instance de Person -->
<Person />
<!-- une autre instance de Person -->
<Person />
```

> Pour rappel, `Person` désigne le composant, `<Person />` désigne l'instance.

<fieldset class='task'>
<legend>À vous !</legend>

- Créer un composant Pokémon affichant un nom, un numéro d'identifiant, et une image (par exemple,
  vous pouvez utiliser cette image:
  [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)).

- Instancier ce composant sur la page d'accueil

- Modifier le style de nos pages si vous le souhaitez
</fieldset>

---

[En savoir plus sur ce chapitre](https://svelte.dev/docs/svelte/basic-markup)
