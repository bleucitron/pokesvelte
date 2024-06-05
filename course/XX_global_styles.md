# Styles globaux

On a vu que les styles définis au sein d'un fichier `.svelte` ne s'appliquent qu'aux éléments définis dans ce même fichier.

Cela fonctionne car Svelte applique une classe générée automatiquement (`svelte-xyz123` par exemple) à tous les éléments du même fichier.

Vous pouvez désactiver l'ajout automatique de classe en entourant le sélecteur CSS par `global()` :

```svelte
<p>Coucou</p>

<style>
	p {
		color: red;
	}

	:global(p) {
		color: blue;
	}
</style>
```

Dans le cas d'un style global, Svelte n'ajoute pas de classe générée automatiquement à l'élément.

Cette technique peut être pratique pour appliquer un style à un élément enfant de notre composant non défini dans le même fichier. Mais il faut avoir conscience que dans ce cas, le style va s'appliquer partout sur tous les éléments de l'application concernés par le sélecteur, comme c'est le cas habituellement en CSS. Pour éviter cela, il faut être très précis sur les sélecteurs CSS utilisés en global.

> De manière générale, les styles globaux sont plutôt déconseillés, et ne devraient être utilisés que lorsqu'absolument nécessaire.

[Plus de détails sur ce chapitre](https://svelte.dev/docs/svelte-components#style)
