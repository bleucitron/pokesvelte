---
scope: kit
---

# Options de page

Vous pouvez configurer la stratégie de rendu de votre application page par page. Il vous suffit de
préciser des options de page dans le fichier `+page.server.ts` correpondant, et ces options
s'appliqueront uniquement pour cette page.

```ts
// profile/+page.server.ts

export const myPageOption = 'some-value';
```

Si vous définissez des options de page dans un `+layout.server.ts`, celles-ci seront appliquées pour
toutes les pages concernées par ce layout.

## `prerender`

L'option `prerender` (`false` par défaut) vous permet de générer une page statique au moment du
build. SvelteKit pourra alors se contenter de servir la page telle quelle sans avoir à la générer à
chaque requête.

```ts
export const prerender = true; // ou false
```

> Pour constater que `prerender` est bien actif, il faut lancer un build de votre application. En
> mode développement, `prerender` n'a pas d'impact.

Le prérendu de page est intéressant lorsqu'une page affiche toujours le même contenu, quelque soit
la personne qui le visite.

> Dès qu'une page affiche du contenu personnalisé, celle-ci ne peut pas être prérendue par principe.

## `ssr`

L'option `ssr` (`true` par défaut) vous permet de générer votre page sur le serveur à chaque requête
(Server Side Rendering) – plutôt que d'envoyer une page "vide" qui serait construite uniquement sur
le client, comme pour une SPA.

```ts
export const ssr = false; // ou true
```

Si vous désactivez `ssr`, votre page sera servie vide de contenu. Dans ce cas, l'affichage sur le
client sera entièrement dépendant de JavaScript et du processus d'hydratation.

## `csr`

L'option `csr` (`true` par défaut) vous permet d'activer le rendu côté client (Client-Side
Rendering), et donc d'hydrater votre page grâce à JavaScript. Une page avec `csr` est donc
potentiellement interactive.

```ts
export const ssr = false; // ou true
```

Si vous désactivez `csr`, aucun JavaScript ne sera envoyé au client, allégeant ainsi le coût de
chargement de la page. Néanmoins vous perdrez tous les bénéfices d'une application web modernes.

> Si vous désactivez à la fois `ssr` et `csr` sur une même page, cela revient à refuser tous les
> rendus. Celle-ci sera donc affichée entièrement vide.

> Il existe d'autres options de page.

---

## À vous !

- Essayer de désactiver `csr` sur la page `/pokedex`. Vous constaterez que la page s'affiche, mais
  que le filtre par nom ne fonctionne plus.

---

[En savoir plus sur ce chapitre](https://kit.svelte.dev/docs/page-options)
