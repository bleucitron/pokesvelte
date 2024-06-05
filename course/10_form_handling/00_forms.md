# Formulaires

Avec la démocratisation de JavaScript, une idée s'est ancrée profondément dans le cerveau des devs web : pour envoyer des données depuis un navigateur vers un serveur, il faut absolument faire une requête `fetch`.

Il y a 2 problèmes à cela :

- si JavaScript n'est pas disponible dans le navigateur peu importe la raison, il sera alors impossible d'envoyer des données au serveur
- c'est faux

**En effet, les navigateurs ont toujours été capables d'envoyer des données à un serveur, via des formulaires**. C'est un comportement natif, qui fonctionne que JavaScript soit disponible ou non.

Dans la mesure du possible, il faut donc perdre cette mauvaise habitude de faire des `fetch` là où un simple formulaire suffit.

## Rappels HTML

Pour définir un formulaire HTML, un élément `<form>` est nécessaire, contenant autant d'éléments `<input>` (ou autres `<select>`, `<textarea>` et compagnie) que vous le souhaitez.

> Pour simplifier, nous allons nous contenter de cas simples, en utilisant principalement des `<input>`. Mais le principe s'applique de la même manière pour les autres éléments de formulaire que vous connaissez.

```html
<form>
	<label>
		Nom
		<input name="familyName" />
	</label>
	<label>
		Prénom
		<input name="firstName" />
	</label>
	<button>Envoyer</button>
</form>
```

> N'oubliez pas d'accompagner vos `<input>` de `<label>` pour améliorer l'accessibilité de votre formulaire.

Deux attributs sont importants (mais non obligatoires) sur un élément `<form>` :

- `method`, qui peut être `"GET"` ou `"POST"`, et qui vaut `"GET"` si non fourni
- `action`, qui précise l'URL vers laquelle envoyer les données de formulaire, et qui sera l'URL actuelle si non fourni

> En général, les formulaires sont définis avec la méthode `"POST"`, car ils ont pour objectif d'écrire des données sur le serveur. Utiliser `"GET"` sert dans quelques situations particulières ne nécessitant pas d'écriture, comme les formulaires de recherche par exemple.

De plus, les attributs `name` des `<input>` vont permettre d'identifier les données une fois arrivées sur le serveur.

Enfin, l'élément `<button>` vous permet de soumettre le formulaire, même s'il n'est pas strictement obligatoire. Peu importe la manière de soumettre un formulaire, **le navigateur va recharger automatiquement la page une fois les données envoyées**.
