# Types d'applications et stratégies de rendu

Il existe plusieurs stratégies de rendu pour une page d'une application web, selon les besoins.

## Types d'application

### Multi Page Apps

Il s'agit de générer sur le serveur chaque page à chaque requête.

Cela permet de construire entièrement la page sur le serveur avec les données personnalisées de la
personne ayant fait la requête.

De plus le routing est géré par le serveur, ce qui impose au navigateur de reconstruire
chaque page entièrement à chaque navigation.

Souvent utilisé pour les applications nécessitant une authentification.

#### Cool

- Personnalisation
- S'adapte au changement de contenus
- Compatible avec un bon référencement

#### Pas cool

- Lourd pour le serveur
- Absurde lorsque les pages sont tout le temps les mêmes pour tout le monde
- "Flashs" à chaque changement de page
- Interactivité à l'ancienne (sans composants)

### Single Page Apps

Il s'agit de faire le rendu complet d'une application dans le navigateur. Le HTML initialement reçu
par le navigateur est presque vide.

Cela permet de créer des pages hautement interactives, et de gérer le routing au niveau du client,
au prix d'un coût élevé en Javascript.

Souvent utilisé pour les visualisations de données ou les application de musique ou de vidéo.

#### Cool

- Personnalisation
- S'adapte au changement de contenus
- Interactivité
- Routing Client

#### Pas cool

- Tout le Javascript à charger
- Lourd pour le client
- Très mauvais pour le référencement

### Static Site Generation (SSG)

Un site SSG est entièrement généré au moment du build.

Souvent utilisé pour les blogs.

#### Cool

- Très léger pour le serveur
- Bon pour le référencement

#### Pas cool

- Les mises à jour de contenu nécessitent une recompilation
- Pas de personnalisation

> Les différents types d'application que l'on vient de voir sont globalement supportés par les
> frameworks d'application modernes comme SvelteKit, Next ou d'autres.

## Stratégies de rendu

Ces types d'application reposent chacun sur une stratégie de rendu bien spécifique.

### Server-Side Rendering (SSR)

Permet de générer sur le serveur chaque page à chaque requête. C'est la stratégie sous-jacente aux
MPA.

### Client-Side Rendering (CSR)

Permet de générer côté client les éléments d'une page en utilisant Javascript. C'est la stratégie
sous-jacente aux SPA.

### Pre-rendering

Il s'agit de générer tout le contenu d'une page au moment du build. C'est la stratégie sous-jacente
au SSG.

### Stratégies mixtes

Les dénominations SPA, MPA et SSG supposent que toute l'application soit gérée avec la même
stratégie.

Or avec les frameworks modernes comme SvelteKit, il est possible d'utiliser ces stratégies de manière
plus chirurgicale, selon les besoins de chaque page, voire même d'utiliser plusieurs stratégies pour
une même page.

Ainsi, il est possible au sein d'une même application d'utiliser du SSR, du CSR ou du pre-rendering
selon les pages. Mais également d'utiliser au sein d'une même page SSR et CSR, ou bien pre-rendering
et CSR.

<!-- TODO: schema -->

> Utiliser pre-rendering et SSR au sein d'une même page s'appelle du
> [pré-rendu partiel](https://nextjs.org/docs/app/api-reference/next-config-js/ppr), ce qui est
> encore relativement expérimental et peu répandu. SvelteKit n'en propose pas.

---

[Plus d'infos sur ces notions ici](https://kit.svelte.dev/docs/glossary)

[Un excellent talk sur le fait de mélanger ces stratégies](https://www.youtube.com/watch?v=860d8usGC0o)
