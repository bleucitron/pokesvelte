---
scope: kit
---

# Le problème des stores sur le serveur

Le concept Svelte de _store_ est pratique car il permet de stocker des données réactives accessibles
par tout composant d'une application Svelte.

> Pour rappel, on appelle _store_ un état réactif global, que ce soit un store de Svelte 4, ou un
> état global de Svelte 5, comme [vu dans ce chapitre](../04_state/05_universal_reactivity.md),

Mais cela peut se révéler problématique avec SvelteKit, car SvelteKit permet de travailler sur le
serveur.

Voyons un piège classique lié à l'utilisation d'un store avec SvelteKit : les données de user.

On souhaite pouvoir accéder aux données du user partout dans notre application. Un store `user`
semble donc adapté.

## 1. Je crée un store

Supposons que l'on crée un store `user` contenant les informations d'une personne. Un store est
pertinent car on souhaite afficher ces valeurs à différents endroits de la page.

```ts
// stores.svelte.ts
function createUser() {
	let score = $state();

	function set(u) {
		user = u;
	}

	return {
		get value() {
			return score;
		},
		set
	};
}

export const user = createUser(); // le store `user` est instancié une fois pour toute l'application
```

Ce store est accessible partout, dans tous les composants ainsi que dans tous les fichiers `.ts` ou
`.js`, ce qui est pratique.

Mais si vous utilisez les options par défaut de SvelteKit, vous avez du rendu côté serveur, ce qui
signifie que vos pages sont potentiellement d'abord construites sur le serveur. Et donc que **votre
store sera instancié sur le serveur**, et maintenu tant que le processus Node tourne.

## 2. Je mets à jour mon store sur le client

Ça ne pose probablement pas de problème si ce store n'est jamais vraiment utilisé sur le serveur,
car en général on met à jour ce genre de données sur le client lors d'interactions comme des clics.

```svelte
<script>
	import { user } from '$lib/stores.svelte';
</script>

<!-- ici on est sûr de mettre à jour `user` uniquement sur le client -->
<button onclick={() => user.set({ name: 'romain' })}>Remplir le store</button>
```

La valeur du store instancié sur le serveur reste donc à sa valeur initiale – `undefined` dans notre
cas, ce qui ne pose pas vraiment de problème autre qu'un peu de mémoire inutilement allouée.

## 3. Je récupère des données depuis le serveur

Imaginez que vous récupériez le score de la personne depuis le serveur, par exemple grâce à la
fonction `load` d'un `+layout.server.ts`.

```ts
// +layout.server.ts
export async function load() {
	const user = await getUserData(); // on devrait utiliser les cookies, mais on simplifie ici

	return {
		user
	};
}
```

## 4. Je mets à jour mon store dans le layout

Puis, pour rendre cette valeur accessible et manipulable par tous les composants, vous stockez cette
valeur dans votre store dès que vous la recevez côté client, donc dans le `+layout.svelte`.

```svelte
<!-- +layout.svelte -->
<script>
	import { user } from '$lib/stores.svelte';

	const { data } = $props();

	user.set(data.user);
</script>
```

Tout va bien, vous avez les données de la personne accessible partout côté client. **Mais vous avez
également stocké ces données côté serveur**, car le fichier `+layout.svelte` est exécuté côté
serveur lors de la première requête...

## 5. J'ai perdu

Sans le savoir, **vous avez rendu accessibles des données personnelles à toute personne se connectant
sur votre serveur SvelteKit** et qui tenterait de lire le contenu de ce store.

> Même si le contenu du store sur le serveur est écrasé à chaque nouvelle requête, cela pose un
> problème de sécurité majeur, car une intrusion sur le serveur permettrait d'accéder à la valeur du
> store à tout moment.

## Solutions ?

Il y a plusieurs solutions à ce problème :

### `onMount`

Le problème vient du fait que l'on a mis à jour un store depuis le serveur. Donc si on fait
attention à ne pas mettre à jour le store depuis le serveur, tout va bien.

Pour cela, on peut utiliser `onMount`, qui est une [méthode de cycle de
vie](../05_effects/00_lifecycle.md) uniquement exécutée sur le client.

```svelte
<!-- +layout.svelte -->
<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/stores.svelte';

	const { data } = $props();

	onMount(() => {
		user.set(data.user); // tout va bien, je suis côté client
	});
</script>
```

Néanmoins, cela reste une mauvaise idée :

- la possibilité de mettre à jour ailleurs ce store tout en étant côté serveur reste ouverte
- les éléments nécessitant les données du user ne sont pas rendus côté serveur, nécessitant un
  re-rendu côté client

### Les données de layout sont accessibles partout

On souhaite rendre disponibles nos données de `user` dans toute notre application. Il se trouve que
les données de [layout](../01_sveltekit_basics/07_layout_data_loading.md) sont rendues disponibles
par SvelteKit dans toutes les pages concernées par le layout.

En utilisant cette propriété sur le layout racine – qu'il est impossible d'esquiver –, il est donc
possible de rendre disponibles des données dans toutes les pages de l'application.

```svelte
<!-- +page.svelte -->
<script>
	import { onMount } from 'svelte';

	const { data } = $props(); // `data` contient les données de layout
</script>

<p>{data.user.name}</p>
```

Il faudra tout de même passer ces informations aux composants qui en ont besoin, ou bien utiliser
le [store de page](../01_sveltekit_basics/05_page_store.md) qui contient également les données de
layout, sans présenter de risque de fuites de données.

Bien sûr cette dernière solution ne permet pas telle quelle de mettre à jour nos données dans toute
l'application comme le ferait un store. Néanmoins, on peut supposer que la mise à jour de telles
données – celles de l'utilisateur dans notre cas – vont nécessiter une requête au serveur. En
utilisant les fonctionnalités des fonctions
[`load`](../08_advanced_data_loading/03_load_functions.md), on peut assez facilement mettre à jour
nos données globalement sans utiliser de store.

### Stores et Contexte

La solution ci-dessus, pourtant adaptée, ne vous satisfait pas ? Vous souhaitez tout de même pouvoir
mettre à jour vos données globalement côté client sans nécessiter un appel au serveur ? Bien.

Il existe une technique pour utiliser les stores de manière sécurisée, grâce aux Contextes de
Svelte, comme montré [dans cette vidéo](https://www.youtube.com/watch?v=EyDV5XLfagg). Il s'agit
néanmoins d'une technique avancée que nous ne traiterons pas ici.

## En conclusion

**De manière générale, avec SvelteKit, évitez d'utiliser des stores pour stocker de l'information
sensible.**

Passez plutôt par les données de layout.

---

[Plus de détails sur ce problème](https://github.com/sveltejs/kit/discussions/4339)
