# Réactivité des objects et des tableaux

Vous pouvez bien sûr utiliser `$state` pour déclarer un objet (`{...}`) ou un tableau (`[...]`).

## Réactivité profonde

Avec les objets et les tableaux, vous pouvez notamment muter variable déclarée avec `$state` et
quand même bénéficier de la réactivité. C'est ce qu'on appelle la **réactivité profonde**.

Par exemple, vous pouvez utiliser `delete` pour supprimer une clé d'un objet, ou encore `.push()`
(ou autre) pour augmenter un tableau, et les mises à jour se feront normalement, comme attendu :

```svelte
<script>
	let obj = $state({ a: 1, b: 2 });
	let arr = $state([1, 2]);

	function update() {
		delete obj.a;
		arr.push(3);
	}
</script>

<button onclick={update}> Update </button>

{#each Object.keys(obj) as k}
	<!-- la clé 'a' est bien supprimée au clic sur le bouton  -->
	<p>{k}</p>
{/each}

{#each arr as nb}
	<!-- le nombre d'éléments affichés augmente bien au clic sur le bouton `-->
	<p>{nb}</p>
{/each}
```

> En Svelte 4, la réactivité fonctionnait complètement différemment, et nécessitait l'usage d'une
> assignation (`truc = machin`) pour fonctionner. Écrire quelque chose comme `delete obj.a` ou
> `arr.push()` n'aurait eu aucun effet. Ajouter un élément à un tableau nécessitait donc d'écrire
> quelque chose comme `tableau = [...tableau, element]`.

## Réactivité fine

En Svelte 4, il était possible de muter un objet (ou un tableau), à condition d'utiliser une
assignation. Ceci est bien sûr toujours possible avec Svelte 5 :

```svelte
<script>
	let obj = $state({ a: 1, b: 2 });

	function update() {
		obj.a = 2;
	}
</script>

<button onclick={update}> Update </button>

{#each Object.entries(obj) as [key, value]} <p>{key} : {value}</p> {/each}
```

Néanmoins, avec la rune `$state`, la réactivité de Svelte 5 est "fine" (_fine-grained_). Cela
signifie que **lorsqu'on mute une propriété d'un objet, cette propriété uniquement est "invalidée",
et non tout l'objet**. En d'autres termes, uniquement les choses dont dépendent cette propriété
seront mises à jour, et non l'entièreté des dépendances de l'objet.

Cela permet d'optimiser la performance générale de votre application en évitant des calculs
inutiles.

Voici un exemple simple du problème avec la réactivité de Svelte 4 :

```svelte
<!-- Svelte 4 -->
<script>
	let todos = [
		{ done: false, text: 'Dormir' },
		{ done: false, text: 'Manger' }
	];

	function getLength(arr) {
		console.log('Calcul'); // inutilement ré-exécuté lorsqu'on met à jour les textes des tâches
		return arr.length;
	}
</script>

{#each todos as todo}
	<div><input bind:value={todo.text} /> <input type="checkbox" bind:checked={todo.done} /></div>
{/each}

<p>Nombre de tâches : {getLength(todos)}</p>
```

Et son équivalent en Svelte 5 :

```svelte
<!-- Svelte 5 -->
<script>
	let todos = $state([
		{ done: false, text: 'Dormir' },
		{ done: false, text: 'Manger' }
	]);

	function getLength(arr) {
		console.log('Calcul'); // exécuté n'est jamais recalculé si l'on change juste les textes
		return arr.length;
	}
</script>

{#each todos as todo}
	<div><input bind:value={todo.text} /> <input type="checkbox" bind:checked={todo.done} /></div>
{/each}

<p>Nombre de tâches : {getLength(todos)}</p>
```

> Vous trouverez une illustration plus complète de l'importance de cette différence
> [ici](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAAE2VSy27jMAz8FVV7cAIE8t21DfSwf7C3OgdVohOhCmXIdLaF4H9fPewE6N7I0ZAzpBj4aCzMvHkPHOUNeMPfpomfOH1PKZnvYAliPrvFq4S0s_Jmon7AgSwQI6fdzDr2fn6NUATHBRUZh8zDTRo0eDlkzpGF9DyQcjg7C8K6y6HyoKRVi5UUidXxtVA80OKx9BbRIYHPTVjXs5cUCO0QjsICXuiai9Yf6lLrP5F4gDsgPbTNyAoiPuGbvXQdq35j7F4dWdHchhjoMVdJBxJCZOy0A2EPBkpuGjZKO8PpiRJ8UcOKHEl_ARJ3aRfYGWsJzg_N_6nRQFXt87X1c_fYGpwWYg7jINr9xS5sE6-szoTwC6S6bv8j5xxkxVabe18EtyYfBnWT9bqQt5ucb32erHQS3cDVFdTnh_saeKnLOeitMm1ir2zrohTq5CR_UDv14eddrM9Laeupj8d2c9qMBjRvyC-wntd_ggUqOqcCAAA=)
> (Svelte 4) versus
> [là](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAAE2VSy07EMAz8lRCQ2kqovZe2Egf-gBvlEBJ3N9qsUyXuAqr67-TRZSW4xfZ4Zmxn5ZM24Hn7tnIUZ-Atf55n_sjpe46Bv4AhCLG3i5Mx03np9EzDiCMZIEZWWc969uBJEJRv79VTKIXitKAkbZE5OAuNGg9lwlZsjeWRpEVvDdTGHsrCgRRGLkZQABaJI0Ac0OIwa9TBKYFLJKwf2F181MoiVLUBPNAxNW1_1IVSrwFYwgWQfrX1xHKmPsE3u-t7VrxgYC8qljX3IUbK2vPij-XeO1IUbdkkjIfHa47gi1qWOUm4A1B9EWaBXN-qX8L_kLC9oria75rbgrHTOC_ELAaXyn5iv-7jbKxJgPUehDzuRxA-PeIGqFP6MmTBneRDo2qTXr-m1UXHO88NFe_ej1weQZ4-7NfIc1-KQe2dcf5rZ9dkpbWJTtL2u3lY_x59u32DrpmH8KPOVulJg-ItuQW29-0HkdosMowCAAA=).

## À vous !

<section class='task'>

Dans la page d'accueil

- Créer un état `foundSpecies` représenant un tableau des `id` des espèces de Pokémons déjà
  découverts. Initialiser `foundSpecies` à `[]`.

- Afficher quelque part dans la page la taille de ce tableau.

- Au clic sur un des 3 Pokémons de départ, ajouter son `id` à `foundSpecies` si vous ne l'avez
  pas déjà trouvé.

</section>

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/fine-grained-reactivity)
