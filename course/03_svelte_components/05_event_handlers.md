# Gérer les évènements

L'interactivité d'une page web passe par la gestion d'évènements, souvent des clics, mais pas que.

En HTML, pour écouter un évènement sur un élément et y réagir, il faut utiliser l'attribut `on...`, par exemple `onclick`, `onmousemove`, etc.

```html
<button onclick="console.log('coucou')">Dire coucou</button>
```

Vous pouvez faire la même chose avec Svelte, mais en passant une fonction à l'attribut de gestion d'évènement :

```svelte
<button onclick={() => console.log('coucou')}>Dire coucou</button>
```

## Évènements de composant

Une instance de composant Svelte n'est pas un élément HTML. Cela signifie que vous ne pouvez pas simplement écrire la chose suivante :

```svelte
<Paiement onclick={() => console.log('Vous avez payé')} />
```

En effet, par défaut, si vous ne faites rien de spécial, rien n'est prévu pour gérer un clic, ou tout autre évènement HTML, sur une instance de composant, comme `<Paiement />` par exemple.

En revanche, vous pouvez très bien décider que `onclick` est une props de votre composant, en le déclarant explicitement, puis en l'utilisant comme gestionnaire d'évènement sur un élément HTML :

```svelte
<!-- Paiement.svelte -->
<script>
	const { onclick } = $props();
</script>

<button {onclick}>Payer</button>
```

Parfois, il peut être pratique d'expliciter les noms de ces props de gestion d'évènement. Par exemple, ici, `onclick` n'est pas très parlant. Si vous avez envie, vous pouvez très bien décider de renommer cette props.

```svelte
<!-- Panier.svelte -->
<Paiement checkout={() => console.log('Vous avez payé')} />
```

```svelte
<!-- Paiement.svelte -->
<script>
	const { checkout } = $props();
</script>

<button onclick={checkout}>Payer</button>
```

> Les props de gestion d'évènement sont des props comme les autres, elles n'ont rien de spécial, si ce n'est qu'on les assigne à des fonctions.

## À vous !

<section class='task'>

- Créer un composant `Wild` affichant uniquement l'image d'un Pokémon. Ce composant représente les Pokémons sauvages.

Sur la page d'accueil

- Fournir la liste des pokemons en `data` à notre page d'accueil, afin d'avoir accès aux données d'image des Pokémons, que vous devrez fournir aux instances de `Wild`.

- À la place du `Pokemon`, instanciez `Wild` pour les Pokémons ayant pour `id`: 1, 4, 7

- Donner une fonction `catchPokemon` en prop à `Wild`. Cette fonction doit afficher dans la console l'`id` et le `name` du Pokémon sauvage lorsqu'on lui clique dessus
</section>

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/event-handlers)
