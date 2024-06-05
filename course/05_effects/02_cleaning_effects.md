# Nettoyer les effets

L'utilisation d'effets est souvent risquée : elle est souvent source de bugs.

C'est le cas pour notre application ! Essayer de changer de page, et observez la console... Le `console.log` d'apparition des Pokémons continue d'apparaître toutes les 2 secondes ! Pire, faites des A/R entre la page d'accueil et n'importe quelle autre page... l'affichage des log devient chaotique !... T_T

> Rechargez la page pour revenir à la normale.

Nous avons sans nous en rendre compte créé une fuite de mémoire. C'est-à dire du code qui peut cumuler des exécutions de fonction à l'infini.

## Fuite de mémoire

Plus concrètement, notre problème dans ce cas particulier est le `setInterval`. On démarre un intervalle de 2 secondes uniquement lorsque `started` de la page d'accueil passe à `true`... mais on ne l'arrête jamais. Un intervalle n'est pas intrinsèquement lié à un composant, c'est du code qui s'exécute en dehors. Il ne va donc pas s'arrêter tout seul au démontage du composant.

> Ce type de problème n'est pas limité au `setInterval`. Beaucoup d'autres situations peuvent aboutir à ce problème.

De plus, lorsque l'on revient sur la page d'accueil, on réinstancie le composant de page. Et comme les effets se jouent également lors de l'instanciation, si `started` vaut `true`, l'effet de lancement d'intervalle est rejoué, lançant alors un deuxième intervalle similaire, mais indépendant. Et en continuant à répéter l'opération, on cumule de plus en plus d'intervalles.

> Dans notre exemple, le problème n'est pas trop grave, mais imaginez que l'intervalle envoie des requêtes au réseau.

## Nettoyage

Ce type de problème se résout en "nettoyant" les effets. C'est-à-dire en arrêtant les processus qui ne sont plus pertinents lorsque le composant disparaît, ou juste avant que l'effet soit rejoué.

**La rune `$effect` permet de nettoyer les effets en utilisant un callback de retour**. Si vous renvoyez une fonction dans votre effet, cette fonction sera exécutée :

- juste avant que l'effet en question soit rejoué
- juste avant que le composant soit démonté

```svelte
<script>
	$effect(() => {
		doSomething();

		return undoSomething; // `undoSomething` est une fonction annulant ce qui a été fait dans `doSomething`
	});
</script>
```

On peut imaginer un cas d'abonnement à une liste de messages (sur Slack par exemple).

```svelte
<script>
	let channelId = 'general';

	$effect(() => {
		subscribeTo(channelId);

		return () => unsubscribeTo(channelId); // callback utilisant une fonction fléchée
	});
</script>
```

> Dans le cas où l'on souhaite uniquement nettoyer quelque chose au démontage, vous pouvez faire la même chose en utilisant `onMount`. Vous pouvez également utiliser `onDestroy` importé depuis `svelte`.

## Les effets ne sont pas vos amis

De manière générale, il est plutôt rare d'utiliser des effets. Ils ne servent que pour des cas marginaux où la réactivité normale atteint ses limites. Les cas classiques sont en général :

- manipulation du temps
- requêtes réseau
- manipulation directe du DOM

En dehors de ces quelques cas, vous n'avez probablement pas besoin d'effets.

## À vous !

<section class='task'>

Dans la page d'accueil

- nettoyer l'effet déclenchant un `setInterval` en utilisant [`clearInterval`](https://developer.mozilla.org/fr/docs/Web/API/clearInterval).

</section>

Plus de détails sur ce chapitre [ici](https://svelte-5-preview.vercel.app/docs/runes#$effect) et [là](https://svelte-5-preview.vercel.app/docs/runes#$effect-when-not-to-use-$effect)
