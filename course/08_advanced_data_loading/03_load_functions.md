---
scope: kit
description: Mieux comprendre les fonctions load de SvelteKit
---

# Fonctions `load`

Ok, notre application est capable de fournir des données au serveur, ainsi que les récupérer du
serveur. Mais le fonctionnement actuel de notre application semble cassé : si on attrape un Pokémon,
les informations du layout ne se mettent pas à jour... sauf en rechargeant manuellement la page. De
même si vous essayez de supprimer un Pokémon :/

Pour comprendre et corriger ce problème, il faut commencer par comprendre plus précisément le rôle
des fonctions `load`.

## C'est quoi une fonction `load` ?

Nous avons vu [ici](../01_sveltekit_basics/09_navigation_philosophy.md) le fonctionnement général de
la navigation dans SvelteKit.

Pour rappel, à chaque navigation vers une URL gérée par SvelteKit, on charge les ressources de la
page :

- le code HTML de la page (uniquement au premier chargement)
- les ressources statiques (CSS, images, ...)
- les scripts (notamment des composants)
- les données de page (fichiers `.json`)

Ces ressources ne sont chargées que si vous ne les avez pas déjà... sauf pour une : les données. Si
vous observez bien l'onglet "Réseau" de vos outils de développement navigateur, vous verrez que même
en faisant des aller-retours entre les pages, vous avez toujours un fichier `.json` chargé pour
chaque navigation.

> Nous parlons ici du comportement par défaut de SvelteKit. On verra qu'il est possible de changer
> ce comportement selon les besoins.

Ce fichier `.json` contient les données de votre page, autrement dit ce fichier contient ce que
renvoie la fonction `load` de la page en question.

Ce qui signifie que la fonction `load` est jouée à chaque navigation vers la page. On peut donc
considérer que **la fonction `load` est le endpoint de la page**.

De la même manière, les fonctions `load` sont un peu comme des endpoints de layout.

Mais ici, la fonction `load` de layout ne se recharge pas, ce qui cause notre bug. C'est parce que
SvelteKit ne recharge que les fonctions `load` qu'il considère nécessaires – c'est-à-dire celles
dont les dépendances n'ont pas changé. Ce qui est le cas de notre `load` de layout.

## Dépendances des fonctions `load`

Quelque soit la fonction `load` (de page ou de layout), vous pouvez récupérer des infos d'URL pour
déterminer les données que vous allez renvoyer. Par exemple :

```ts
export function load({ params, url }) {
	const id = params.id;
	const pathname = url.pathname;
	const a = url.searchParams.get('a');

	return { ... }
}
```

> Les informations auxquelles vous avez accès dans une fonction `load` sont similaires à celles des
> fonctions de endpoint qu'on a vues [ici](./01_building_an_api.md).

Pour chaque page ou layout, SvelteKit est conscient des données `params` ou `url` dont vous avez
besoin, et va les considérer comme dépendances de la fonction `load` en question.

**SvelteKit ne rejoue les fonctions `load` que si ses dépendances ont changé**, ou si la page ou le
layout est reconstruit.

```ts
export function load({ url }) {
	const nom = url.searchParams.get('nom');
	// cette fonction est rejouée si on passe de "?nom=Monica" à "?nom=Janice"
	// cette fonction n'est pas rejouée si on passe de "?nom=Romain&age=38" à "?nom=Romain&age=13"

	return { ... }
}
```

> Les conditions de ré-exécution d'une fonction sont plus complexes en réalité. Vous avez le détail
> [ici](https://kit.svelte.dev/docs/load#rerunning-load-functions-when-do-load-functions-rerun).

Donc, si une fonction `load` n'a pas de dépendances, (ou si ses dépendances n'ont pas changé lors
d'une navigation), alors elle ne sera pas ré-exécutée.

> C'est le cas de notre layout, sa fonction `load` n'a pas de dépendances, et donc n'est jamais
> ré-exécutée.

## Forcer la ré-exécution

Il y a des situations où des données ont besoin d'être mises à jour via une fonction `load`, mais
celle-ci n'est pas ré-exécutée car SvelteKit de détecte pas de raison de le faire. La fonction
`load` a alors une (ou plusieurs) **dépendance implicite**.

Dans ce cas, vous pouvez forcer la ré-exécution des fonctions `load` en utilisant l'utilitaire
[`invalidateAll()`](https://kit.svelte.dev/docs/modules#$app-navigation-invalidateall) du module
`$app/navigation`. Cette fonction permet de rejouter toutes les fonctions `load` dont dépend la page
actuelle – celle de la page ainsi que celles de ses layouts éventuels.

```ts
import { invalidateAll } from `$app/navigation`;

function doSomeStuff() {
	someStuff();
	invalidateAll();
}
```

Toutefois, utiliser `invalidateAll` est un peu violent, car cela amène à ré-exécuter des fonctions
`load` qui n'en ont pas forcément besoin. Pour plus de granularité, il vaut mieux utiliser
[`invalidate()`](https://kit.svelte.dev/docs/modules#$app-navigation-invalidate) du module
`$app/navigation`.

```ts
import { invalidate } from `$app/navigation`;

function doSomeStuff() {
	someStuff();
	invalidate("some:url");
}
```

`invalidate` prend un identifiant en argument de la forme `"some:url"`. Toutes les fonctions `load`
ayant `"some:url"` en dépendance seront alors ré-exécutées, les autres non.

Pour déclarer la dépendance d'une fonction `load` à cet identificant, il faut utiliser `depends`
dans la fonction `load` :

```ts
// +page.server.ts
export function load({ depends }) {
	depends("some:url");

	return {
		...
	}
}
```

Nous avons ainsi déclaré explicitement une dépendance implicite.

> En réalité, `invalidate` prend une URL en argument, et il se trouve que le format `"some:url"` est
> une URL valide.

<fieldset class='task'>
<legend>À vous !</legend>

- Utiliser `depends` pour déclarer une dépendance dans les fonctions `load` du layout et de la page
  `/team`. Choisir l'identifiant que vous voulez.

- Invalider l'identifiant que vous avez choisi lorsque vous attrapez un Pokémon et lorsque vous
  libérez un Pokémon.

</fieldset>

---

Plus de détails sur ce chapitre :

- [Infos d'url](https://kit.svelte.dev/docs/load#using-url-data)
- [Rejouer les fonctions `load`](https://kit.svelte.dev/docs/load#rerunning-load-functions)
- [`invalidate`](https://kit.svelte.dev/docs/modules#$app-navigation-invalidate)
