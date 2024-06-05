---
scope: svelte
subtitle: Libérée, dérivée...
description: Définir et utiliser des états dérivés avec la rune $derived dans un composant Svelte 5
---

# États dérivés

Nous savons donc créer un état et le manipuler. Mais il est parfois nécessaire de créer des
variables qui dépendent d'un état pour, par exemple, afficher des informations complémentaires.

## La rune `$derived`

**Pour créer une variable réactive dérivant d'une autre variable réactive, il faut utiliser la rune
`$derived`**, en lui fournissant une expression dépendant d'une autre variable.

La nouvelle variable ainsi créée fonctionne de la même manière qu'un état, mais ne peut pas être
modifiée autrement qu'en modifiant la variable dont elle dépend.

```svelte
<script>
	let money = $state(100);
	const moneyInYens = $derived(money * 171);
</script>

<button onclick={() => money++}> Gagner de l'argent </button>

<p>{money} € ({moneyInYens} ¥)</p>
```

Il est aussi possible de dériver de plusieurs variables à la fois.

```svelte
<script>
	let checking = $state(100);
	let savings = $state(100);

	const total = $derived(checking + savings);
</script>

<button onclick={() => checking++}>Travailler</button>
<button onclick={() => savings++}>Économiser</button>

<p>Compte courant : {checking} €</p>
<p>Économies : {savings} €</p>
<p>Total : {total} €</p>
```

> Vous pouvez dériver de variables réactives dérivées.

> L'expression utilisée dans `$derived` ne doit pas contenir d'effets de bord.

## Déstructurer

L'usage de `$derived` permet notamment d'extraire les champs d'un objet.

```svelte
<script>
	const name = $derived(data.name);
	const familyName = $derived(data.familyName);
	const address = $derived(data.address);
</script>
```

Toutefois, un usage dérivé :p de la rune `$derived` permet de déstructurer simplement les variables
réactives pour simplifier l'écriture du code.

```svelte
<script>
	const { name, familName, address } = $derived(data);
</script>
```

> Dans le cas où le calcul dérivé est trop complexe (par exemple s'il nécessite plusieurs étapes),
> vous pouvez utiliser la rune
> [`$derived.by`](https://svelte-5-preview.vercel.app/docs/runes#$derived-by), qui prend une
> fonction en argument.

<fieldset class='task'>
<legend>À vous !</legend>

- Utiliser `$derived` pour simplifier l'écriture de votre code lorsque vous estimez que c'est
  nécessaire.

Sur la page d'accueil

- Remplacer l'état `started` par un état dérivé de `foundSpecies` : si on n'a pas choisi un premier
  Pokémon, on n'a pas encore commencé le jeu.

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/runes#$derived)
