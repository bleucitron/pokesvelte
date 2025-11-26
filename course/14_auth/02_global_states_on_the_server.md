---
scope: kit
---

On a [précédemment](./01_cookies) utilisé les données de layout pour rendre les informations du user
disponibles partout dans n'importe quelle page ou layout.

Mais si l'on souhaite rendre ces données disponibles partout, c'est-à-dire dans n'importe quel
composant et fichier `.ts` ou `.js` (et non juste les pages et layouts), il est naturel de vouloir
utiliser un état global. Mais est-ce bien raisonnable ? (spoiler: non)

# Le problème des états globaux sur le serveur

Les états globaux sont pratiques car ils permettent de stocker des données réactives accessibles
par tout composant d'une application Svelte.

> Par _état global_, on désigne ici un état global `$state` défini dans un fichier `*.svelte.*`
> comme [vu dans ce chapitre](../04_state/05_universal_reactivity),

Mais cela peut se révéler problématique avec SvelteKit, car SvelteKit permet de travailler sur le
serveur. Et l'usage d'états globaux peut causer de gros problèmes de sécurité lorsqu'ils cohabitent
avec un serveur, même si en apparence ils n'interagissent pas.

Voyons un piège classique lié à l'utilisation d'un état global avec SvelteKit : les données de
user, que l'on déjà mentionnées plus haut.

On souhaite pouvoir accéder aux données de l'utilisateur partout dans notre application. Un état
global `user` semble donc adapté.

## 1. Je crée un état global

Supposons que l'on crée un état global `user` contenant les informations d'une personne. Un état
global est pertinent car on souhaite afficher ces valeurs à différents endroits de l'application.

```ts
// stores.svelte.ts
class User() {
	score = $state(0);
	name = $state();
}

export const user = new User(); // l'état `user` est instancié une fois pour toute l'application
```

Ce état global est accessible partout, dans tous les composants ainsi que dans tous les fichiers
`.ts` ou `.js`, ce qui est pratique.

Mais si vous utilisez les options par défaut de SvelteKit, vous avez du rendu côté serveur, ce qui
signifie que vos pages sont potentiellement d'abord construites sur le serveur. Et donc que **votre
état global sera instancié sur le serveur**, et maintenu tant que le processus Node tourne.

## 2. Je mets à jour mon état global sur le client

Ça ne pose probablement pas de problème si ce store n'est jamais vraiment utilisé sur le serveur,
car en général on met à jour ce genre de données sur le client lors d'interactions comme des clics.

```svelte
<script>
	import { user } from '$lib/stores.svelte';
</script>

<!-- ici on est sûr de mettre à jour `user` uniquement sur le client -->
<button
	onclick={() => {
		user.name = 'romain';
	}}>Remplir les données user</button
>
```

La valeur `name` de l'état global instancié sur le serveur reste donc à sa valeur initiale –
`undefined` dans notre cas – ce qui ne pose pas vraiment de problème autre qu'un peu de mémoire
inutilement allouée.

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

## 4. Je mets à jour mon état global dans le layout

Puis, pour rendre cette valeur accessible et manipulable par tous les composants, vous stockez cette
valeur dans votre état global dès que vous la recevez côté client, donc dans le `+layout.svelte`.

```svelte
<!-- +layout.svelte -->
<script>
	import { user } from '$lib/stores.svelte';

	const { data } = $props();

	user.name = data.user.name;
</script>
```

Tout va bien, vous avez les données de la personne accessible partout côté client. **Mais vous avez
également stocké ces données côté serveur**, car le fichier `+layout.svelte` est exécuté côté
serveur lors de la première requête...

> En réalité, cet exemple précis est mauvais car la mise à jour de `user.name` n'est pas réactive.
> Mais l'idée reste valide.

## 5. Oups...

Sans le savoir, **vous avez rendu accessibles des données personnelles à toute personne se
connectant sur votre serveur SvelteKit** et qui tenterait de lire le contenu de ce état global.

> Même si le contenu de l'état global sur le serveur est écrasé à chaque nouvelle requête, cela pose
> un problème de sécurité majeur, car une intrusion sur le serveur permettrait d'accéder à la valeur
> de l'état global à tout moment.

## Solutions ?

Il y a plusieurs solutions à ce problème :

### `onMount`

Le problème vient du fait que l'on a mis à jour un état global depuis le serveur. Donc si on fait
attention à ne pas mettre à jour cet état depuis le serveur, tout va bien.

Pour cela, on peut utiliser `onMount`, qui est une [méthode de cycle de
vie](../05_effects/00_lifecycle) uniquement exécutée sur le client.

```svelte
<!-- +layout.svelte -->
<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/stores.svelte';

	const { data } = $props();

	onMount(() => {
		user.name = data.user.name; // tout va bien, je suis côté client
	});
</script>
```

Néanmoins, cela reste une mauvaise idée :

- la possibilité de mettre à jour ailleurs cet état global tout en étant côté serveur reste ouverte
- les éléments nécessitant les données utilisateur ne sont pas rendus côté serveur, nécessitant un
  re-rendu côté client

### Les données de layout sont accessibles partout

On souhaite rendre disponibles nos données de `user` dans toute notre application. Il se trouve que
les données de [layout](../01_sveltekit_basics/07_layout_data_loading) sont rendues disponibles
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

> C'est cette solution que nous avons utilisé dans le chapitre précédent.

Il faudra tout de même passer ces informations aux composants qui en ont besoin, ou bien utiliser
le [state de page](../01_sveltekit_basics/05_page_state) qui contient également les données de
layout, sans présenter de risque de fuites de données.

Bien sûr cette dernière solution ne permet pas telle quelle de mettre à jour nos données dans toute
l'application comme le ferait un état global. Néanmoins, on peut supposer que la mise à jour de
telles données – celles de l'utilisateur dans notre cas – vont nécessiter une requête au serveur. En
utilisant les fonctionnalités des fonctions
[`load`](../08_advanced_data_loading/03_load_functions), on peut assez facilement mettre à jour
nos données globalement sans utiliser d'état global.

### État global et Contexte

La solution ci-dessus, pourtant adaptée, ne vous satisfait pas ? Vous souhaitez tout de même pouvoir
mettre à jour vos données globalement côté client sans nécessiter un appel au serveur ? Bien.

Il existe une technique pour utiliser les états globaux de manière sécurisée, grâce aux Contextes de
Svelte, comme montré [dans cette vidéo](https://www.youtube.com/watch?v=EyDV5XLfagg). Il s'agit
néanmoins d'une technique avancée que nous ne traiterons pas ici.

## En conclusion

**De manière générale, avec SvelteKit, évitez d'utiliser des états globaux pour stocker de
l'information sensible.**

Passez plutôt par les données de layout.

---

[Plus de détails sur ce problème](https://github.com/sveltejs/kit/discussions/4339)
