---
subtitle: P'tite piqûre de rappel ?
description: Rappels JavaScript utiles pour suivre ce tutoriel
---

# Rappels JavaScript

Voici quelques notions JavaScript dont on va se servir. N'hésitez pas à vous renseigner sur ces
syntaxes et concepts si besoin.

## `const` et `let`

```ts
const a = 1;

a = 2; // Erreur

let b = 1;

b = 2; // Tout va bien
```

> Ne pas utiliser `var`.

## Déstructurer

```js
const o = { a: 1, b: 2, c: 3 };

const { a, b, c } = o;
const { a, ...leReste } = o;

const l = [4, 5, 6];

const [x, y, z] = l;
const [x, ...leReste] = l;
```

## Copier les objets et tableaux

```js
const copie = { ...o };
const copieAugmentée = { ...o, d: 4 };

const copie = [...o];
const copieAugmentée = [...o, 4];
```

## Fonctions

```js
function nom(arg1, arg2) {
	return arg1 + arg1;
}
```

```js
function nom({ a, b }) {
	// ici on déstructure a et b à partir du premier argument
	return a + b;
}

// est équivalent à
function nom(arg1) {
	const { a, b } = arg1;
	return a + b;
}
```

### Arrow functions

```js
(x, y) => x + y;

(x) => {
	console.log('COUCOU');
	return x + 102;
};
```

## Tableaux

Il est souvent plus facile d'utiliser les méthodes fonctionnelles des tableaux pour les manipuler.

```js
const tableau = [1, 2, 3];

// boucle sur le tableau
tableau.forEach((e) => {
	console.log('Valeur', e);
});

// crée un nouveau tableau
const nouveauTableau = tableau.map((e) => {
	return e + 10;
}); // [11, 12, 13]

// crée un nouveau tableau filtré
const nouveauTableauFiltre = tableau.filter((e) => {
	return e >= 2;
}); // [2, 3]

// trouve l'élément qui correspond et le renvoie
const element = tableau.find((e) => {
	return e === 2;
}); // 2
```

## Asynchrone

Les Promesses permettent d'avoir une API simple et complète pour utiliser les comportement
asynchrones de Javascript.

```js
const p = fetch(...)
  .then(result => console.log(result))
  .catch(e => console.log(e));

const allPs = Promise.all([...]).then(...);
```

On peut aussi utiliser la syntaxe `async`/`await` pour consommer des promesses.

```js
async function getData() {
  const myData = await fetch(...);
  return myData;
}
```

## Modules

```js
import monDefaut, { a, b } from 'mon-module';

export default function () {}
```

## TypeScript

```ts
type Person = { name: string; age: number; nickname?: string };

const jim: Person = { name: 'Jim Morrison', age: 27, nickname: "Mr. Mojo Risin'" };
const jimi: Person = { name: 'Jimi Hendrix', age: 27 };
```
