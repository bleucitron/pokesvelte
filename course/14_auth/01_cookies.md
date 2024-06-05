---
scope: kit
subtitle: aux pépites de chocolat
description: Utiliser les cookies avec SvelteKit
---

# Utiliser les cookies

SvelteKit vous permet de lire, d'écrire et de supprimer les cookies de votre application.

Les fonctions de SvelteKit s'exécutant sur le serveur, comme `load`, les `actions` ou les endpoints
– et d'autres que nous n'avons pas encore vues – ont accès à un argument `cookies`.

```ts
// +page.server.ts
export function load({ cookies }) {}

export const actions = { default: ({ cookies }) => {} };
```

```ts
// +server.ts
export const GET = ({ cookies }) => {};
export const POST = ({ cookies }) => {};
```

Cet objet `cookies` possède plusieurs méthodes, dont `.get()`, `.set()`, `.delete()`.

> `cookies` permet d'ajouter des headers de réponse à destination de votre navigateur.

```ts
// +page.server.ts
export function load({ cookies }) {
	cookies.get('my-cookie');
	cookies.set('my-cookie', 'my-cookie-value', options);
	cookies.delete('my-cookie');
}
```

Vous pouvez préciser un certain nombre d'[options de
cookies](https://github.com/jshttp/cookie#cookieserializename-value-options), comme `maxAge`,
`expires`, `sameSite`, etc. La plupart de ces options ont des [valeurs par
défaut](https://kit.svelte.dev/docs/types#public-types-cookies), mais vous devrez tout de même
préciser l'option `path` – en général la valeur `/` est pertinente.

```ts
// +page.server.ts
export function load({ cookies }) {
	cookies.set('my-cookie', 'my-cookie-value', { path: '/' });
}
```

<fieldset class='task'>
<legend>À vous !</legend>

Lors de l'inscription et de la connexion

- Créer un `cookie` en utilisant `db.cookies.register()` du module `$lib/server/db`.
- Sauvegarder ce `cookie` en tant que cookie `session`.
- Vérifier que votre cookie est bien présent dans vos outils navivgateur (onglet "Application").

Dans le layout principal

- Lire le `cookie` dans la fonction `load`, récupérer l'`id` du trainer correspond avec
  `db.cookies.check()` du module `$lib/server/db`.
- Récupérer les infos du `user` avec `db.trainer.get()` du module `$lib/server/db`, et les
  renvoyer en tant que props globales avec les autres données.

Ailleurs dans le site

- servez-vous des infos du `user` maintenant accessibles partout pour afficher les infos du
  trainer dans le header, et dans la page `/trainer`, lorsque l'utilisateur est connecté.

</fieldset>

---

[En savoir plus sur ce chapitre](https://kit.svelte.dev/docs/load#cookies)
