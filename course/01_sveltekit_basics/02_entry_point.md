# Le point d'entrée

Le fichier `app.html` est le point d'entrée de votre application SvelteKit.

C'est à partir de ce fichier que toutes les pages (ou presque) de votre application seront construites.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/pika.webp" />
		<link rel="stylesheet" href="/global.css" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>

	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

Le chemin `%sveltekit.assets%` représente l'adresse de votre dossier de fichiers statiques (par défaut `static/`).

Les sections représentées par `%sveltekit.head%` et `%sveltekit.body%` seront remplacées par le contenu spécifique à chaque page.

Ce fichier vous permet d'ajouter des ressources communes à toute votre application, comme des feuilles de style ou des polices de caractères.
