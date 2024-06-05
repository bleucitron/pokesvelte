---
scope: svelte
subtitle: L'ADN d'un composant
description: Définition et utilisation de la rune $props dans un composant Svelte 5
---

# Props

Pour l'instant, notre composant n'est pas très intéressant. En effet, si on l'instancie plusieurs
fois, il affichera toujours la même chose, car la donnée que nous avons utilisé est toujours la
même.

On souhaite donc fournir des données différentes à nos instances de composants. Pour cela, nous
avons besoin de **props**.

**Les props sont la donnée "ADN" d'une instance**. Elles viennent du parent, et ne peuvent pas être
modifiées depuis l'intérieur du composant. Elles peuvent changer si le parent fournit de nouvelles
valeurs.

## Fournir des props

De la même manière que nous fournissons des attributs aux éléments HTML, nous pouvons fournir des
props aux instances de composants.

```svelte
<!-- ici on fournit href en props au composant standard a -->
<a href='https://www.github.com/bleucitron' />Mon profil Github</a>

<!-- ici on fournit name et age en props au composant Person -->
<Person name='Romain' age={38} />
```

> Vous pouvez bien sûr utiliser des variables pour fournir des props.

Si vous avez des données dans un objet, vous pouvez passer en props tous les champs de cet objet
facilement grâce à la syntaxe de _spread_ :

```svelte
<script>
	import Person from './Person.svelte';

	const me = {
		name: 'Romain',
		age: 38
	};
</script>

<!-- ici name et age sont fournies en props -->
<Profile {...me} />
```

## Utiliser les props : la rune `$props`

Pour pouvoir vous servir des props fournies à un composant, il faut les récupérer dans le composant
à l'aide de **la rune `$props`**.

> Les runes sont le fondement de la réactivité de Svelte. Il en existe différents types. Nous en
> reparlerons plus tard.

```svelte
<!-- Person.svelte -->
<script>
	const { name, age } = $props();
</script>

<p>Nom : {name}</p>

<p>Âge : {age}</p>
```

Vous pouvez si vous le souhaitez définir des valeurs par défaut à certaines props, les rendant ainsi
optionnelles.

```svelte
<!-- Person.svelte -->
<script>
	const { name, age = 10 } = $props();
	// age est optionnel, si non fourni, il vaudra 10 par défaut
</script>
```

> Si vous ne fournissez pas de valeur par défaut, la prop est à l'inverse considérée comme requise.
> Un warning sera alors affiché par le compilateur.

## TypeScript

Si vous utilisez TypeScript, vous pouvez définir les types de vos props de cette manière :

```svelte
<script lang="ts">
	type PersonProps = {
		name: string;
		age?: number;
	};
	const { name, age = 10 }: PersonProps = $props();
</script>
```

> Le choix du nom `PersonProps` est arbitraire. Vous pouvez le nommer comme vous voulez.

<fieldset class='task'>
<legend>À vous !</legend>

Nous pouvons donc maintenant créer plein de Pokémons différents à l'aide du composant `Pokemon`.
Actuellement ce composant n'attend pas de props. Corrigeons cela.

- Sur la page `pokedex/[id]`, remplacez le markup déjà présent par une instance de `Pokemon`

Vous devriez constater que toutes les pages `pokedex/[id]` affichent maintenant les mêmes données,
c'est normal car notre composant `Pokemon` n'est pas encore paramétrable avec des props.

- Adapter le composant `Pokemon` pour qu'il attende en props les données `id`, `name`, `src`

- Sur la page `/pokedex/[id]` adaptez votre instance de `Pokemon` avec les données du Pokémon
  correspondant

- N'oubliez pas de mettre à jour l'instance de `Pokemon` qui est sur la page d'accueil

</fieldset>

---

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/load#donn-es-de-page)
