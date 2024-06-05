---
scope: kit
subtitle: API hours
description: Construire une API simple avec SvelteKit
---

# Construire une API

Notre application s'enrichit, et commence à ressembler à quelque chose.

Mais plusieurs problèmes commencent également à apparaître. Notamment, nous ne gardons rien en
mémoire : si vous recharger votre page, les données de Pokédex (`pokedex`) et de votre équipe
(`team`) reviennent à leur état d'origine. C'est le cas car nous n'avons rien écrite pour
enregistrer ces données durablement.

Une solution pour sauvegarder ces données peut être de les stocker dans le `localStorage`, qui est
un morceau de mémoire disponible dans tout navigateur, mais cette solution n'est pas idéale.

Le mieux est de stocker ces données sur un serveur, afin qu'elles soient disponibles peu importe le
navigateur que vous utilisez. Mais pour cela, il faut être capable d'envoyer des données depuis le
navigateur vers le serveur SvelteKit, pour que celui-ci les stocke. Puis il faut éventuellement
pouvoir requêter ces données.

En fait, ce dont nous avons besoin est une API. Heureusement, SvelteKit permet de créer des APIs
relativement simplement.

## `+server.ts`

Nous avons déjà vu que nous pouvions créer des fichiers `+page.server.ts` et `+layout.server.ts`
dans le dossier `src/routes`, permettant de charger les données d'une page ou d'un layout.

Il existe également la possibilité de créer des fichiers `+server.ts` dans ce dossier `src/routes`.
Ces fichiers permettent de définir des endpoints d'API à l'endroit où ils se trouvent.

L'example suivant permet de créer des endpoints sur les routes `/coucou` et `/toi` :

```
my-project/
└ src/
  └ routes/
    ├ coucou/
    │ └ +server.ts
    └ toi/
      └ +server.ts
```

> Si vous utilisez Javascript, le fichier en question sera `+server.js`.

> Le routing dynamique qui consiste à définir des routes dynamiques en leur donnant un nom comme
> `[id]` fonctionne également pour les fichiers `+server.ts`.

## Endpoints

Dans chaque fichier `+server.ts` vous pouvez créer un endpoint pour chaque verbe HTTP si vous le
souhaitez, en exportant une fonction portant le nom du verbe HTTP en question.

```ts
export function GET() {}

export function POST() {}

export function DELETE() {}

export function UPDATE() {}

// pareil pour les autres verbes HTTP...
```

Il suffit ensuite de faire une requête HTTP classique vers le endpoint qui vous intéresse, comme
vous le faites probablement dans d'autres contextes. Les fonctions alors définies seront exécutées
pour traiter les requêtes correspondantes et renvoyer la réponse.

## Données d'entrée

Pour traiter correctement une requête, il faut pouvoir récupérer les données associées. Elles sont
en général de 4 types :

- données de requête
- données d'url
- données de route
- cookies

Les fonctions de endpoint prennent en argument un objet de type `RequestEvent` contenant plein
d'informations, dont celles mentionnées juste au-dessus.

> Les exemples ci-dessous utilisent `POST`, mais ils sont valides pour tout verbe HTTP.

### Données de requête

Vous pouvez récupérer le champ `request` et en extraire les `headers` ou la payload :

```ts
export async function POST({ request }) {
	const headers = request.headers;

	const payload = await request.json();
}
```

> `request.json()` renvoie une promesse, il est donc nécessaire d'utiliser `async`/`await` pour
> consommer son contenu.

### Données d'url

L'url requêtée peut contenir des informations importantes, notamment les `searchParams` (ce qui se
trouve après le `?` dans une URL) :

```ts
export async function POST({ url }) {
	const from = url.searchParams.get('from'); // ou autre
	const to = url.searchParams.get('to');
}
```

> Attention, les données fournies par les `searchParams` sont toujours des `string`. Il est souvent
> nécessaire de les traiter avant de s'en servir.

On pourrait également extraire les paramètres de route de l'URL, mais cette information est
directement fournie par SvelteKit en tant que paramètre de route.

### Données de route

Si votre route contient un étage dont le nom est `[id]`, vous pouvez le récupérer dans le champ
`params` :

```ts
export async function POST({ params }) {
	const id = params.id;
}
```

### Cookies

Vous pouvez également extraire les cookies :

```ts
export async function POST({ cookies }) {
	const cookieId = cookies.get('cookieId');
}
```

> Vous pouvez bien sûr extraire plusieurs types données de l'objet `Request` en même temps.

## Réponses

Comme tout endpoint qui se respecte, les fonctions `GET`, `POST`, etc. doivent renvoyer une réponse
HTTP. Vous pouvez faire cela grâce à l'utilitaire `Response`, mais le plus souvent vous voudrez
renvoyer des réponses sous format JSON ou texte.

Vous pouvez utilisez les utilitaires `json` ou `text` importés depuis `@sveltejs/kit`, permettant de
construire correctement la réponse HTTP en fonction du format attendu.

```ts
import { json, text } from '@sveltejs/kit';

export async function POST() {
	return json({ name: 'Romain' });
}

export async function DELETE() {
	return text('deleted');
}
```

> Si quelque chose plante lors de l'exécution de votre fonction, votre endpoint renverra une erreur
> 500, avec les infos concernant l'erreur.

<fieldset class='task'>
<legend>À vous !</legend>

- Créer un endpoint POST `/team` permettant d'attraper un Pokémon. Vous pouvez utiliser l'utilitaire
  `db.team.addMember()` de `$lib/db`. Vous devrez fournir uniquement l'`id` du Pokémon en `payload`,
  `addToTeam` fera le reste (notamment mettre à jour les données de Pokédex).

- Créer un endpoint DELETE `/team/[uuid]` permettant de libérer un Pokémon en fonction de son
  `uuid`. Vous pouvez utiliser l'utilitaire `db.team.removeMember()` de `$lib/db`.

- Créer un endpoint GET `/team/[uuid]` permettant de récupérer les infos des Pokémons de l'équipe.
  Si `uuid` vaut `'all'`, renvoyer toute l'équipe, sinon renvoyer le Pokémon correspondant à `uuid`.
  Vous pouvez utiliser l'utilitaire `db.team.get()` de `$lib/db`. Tester ce endpoint dans votre
  navigateur.

Sur la page d'accueil

- Appeler le endpoint POST `/team` pour attraper un Pokémon, plutôt que d'utiliser `team.recruit`.
  Pensez à `JSON.stringify()` votre payload.

- Appeler le endpoint DELETE `/team/[id]` pour libérer un Pokémon, plutôt que d'utiliser
  `team.release`.

</fieldset>

---

[Plus de détails sur ce chapitre](https://kit.svelte.dev/docs/routing#server)
