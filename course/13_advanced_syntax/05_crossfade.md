---
subtilte: La meilleure transition de la Terre !
scope: svelte
---

# Crossfade

Il existe une transition plus cool que toutes les autres : `crossfade`.

Cette transition permet de "déplacer" des éléments d'un endroits vers un autre. Plutôt que de décrire l'effet que ça rend, allez plutôt voir [ici](https://svelte.dev/examples/deferred-transitions) pour mieux vous rendre compte.

Pour créer cette transition :

- vous devez d'abord créer `send` et `receive` en exécutant `crossfade` avec quelques paramètres, comme `duration`
- puis, il faut ajouter des transitions `in` et `out` correspondant à `send` et `receive` sur chacun des éléments que vous souhaitez voir échanger leur place
- enfin, il est nécessaire d'identifier précisement les éléments en train de transitioner en utilisant une clé `key` (un `id` par exemple)

```svelte
<script>
	import { crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: 500
	});
</script>

{#if condition}
	<h1 in:send={{ key }} out:receive={{ key }}>BIG ELEM</h1>
{:else}
	<small in:send={{ key }} out:receive={{ key }}>small elem</small>
{/if}
```

> Cette transition n'est pas une animation, même si elle en l'air. En effet, les éléments qui transitionnent simultanément ne font qu'échanger leur place tout en apparaissant / disparaissant, créant l'illusion d'un déplacement.

## À vous !

<section class='task'>

Dans la page `/team`, on souhaite voir les membres se "déplacer" pour passer des titulaires aux remplaçants et vice-versa.

- Créer une transition `crossfade`, et en extraire `send` et `receive`.

- Utiliser `send` et `receive` couplés à `in` et `out` pour simuler le déplacement des membres. Si besoin, supprimer une précédente transition, ou bien rajouter une `<div>` autour des éléments concernés.

</section>

[En savoir plus sur ce chapitre](https://svelte.dev/docs/svelte-transition#crossfade)
