---
scope: svelte
description: Définition succinte de la réactivité dans le contexte d'un framework de composants
---

# Réactivité

Quand on parle de framework de composants, un mot revient très souvent : _réactivité_.

C'est quoi la réactivité ?

> **Réactivité** (n.f.)
> Aptitude d'une structure vivante à répondre à tout changement physique ou chimique (température,
> oxygénation, etc.) par une réaction, généralement favorable à sa survie et à son développement.
> (Larousse)

Bon, ok, si on adapte cette définition à un contexte web :

> **Réactivité** (n.f.)
> Aptitude d'un élément d'interface à répondre à tout changement de données (internes ou externes)
> par une réaction, généralement se traduisant par une modification visuelle de l'interface.
> (PokéSvelte)

Il s'agit donc de faire évoluer les éléments HTML d'une page en fonction de données.

Ce qui sur le papier peut sembler simple, est en réalité complexe dès lors qu'une application est
suffisamment chargée en données et en éléments visuels les représentant. C'est ce qui a amené au
développement de frameworks de composants comme Angular ou React, qui sont donc bien réactifs si
l'on tient à la définition juste au-dessus, de même que leurs successeurs Vue, Svelte, Solid et
consorts.

## [_React is a terrible name for React_](https://x.com/johnlindquist/status/1109498707475488768)

En réalité, React n'est pas vraiment réactif.

En effet, si on regarde de plus près la définition d'un composant React :

```jsx
function Composant(props) {
	console.log('Name', props.name);
	console.log('Address', props.address);

	return (
		<div>
			<p>{props.name}</p>
			<p>{props.address}</p>
		</div>
	);
}
```

La fonction d'un composant React est rejouée dès qu'elle reçoit des nouvelles props. C'est-à-dire
que si `props.name` change, la fonction `Composant` va être rejouée, le log va s'afficher, et
l'interface (définie par ce qui est après le `return`) va se mettre à jour. Mais ce sera le cas
également si uniquement `props.address` change, toute la fonction `Composant` sera rejouée,
entraînant bien sûr la mise de l'interface, mais également les affichages des logs, même celui de
`props.name`, qui dans ce cas n'aura pas évolué.

De plus, React possède une mécanique appelée "DOM virtuel" permettant de ne modifier le vrai DOM que
si celui-ci nécessite un changement, ce qui permet d'économiser des opérations sur le DOM. Mais
cette mécanique est de facto ré-exécutée à chaque mise à jour des props, [entraînant de nombreux
calculs pour souvent conclure qu'il n'y a rien à changer](https://youtu.be/AdNJ3fydeao?t=248).

> Il y a plusieurs moyens d'optimiser les calculs que fait React, mais la plupart sont _opt-ins_,
> c'est-à-dire qu'il faut être conscient du problème d'optimisation, connaître la solution
> d'optimisation et écrire le code qui la met en oeuvre.

## _Vraie_ réactivité

Une _vraie_ réactivité pourrait se définir ainsi :

> **Réactivité** (n.f.)
> Aptitude d'une expression à répondre à tout changement de valeur des variables dont elle dépend en
> étant recalculée.

Par exemple, considérons le code JavaScript suivant :

```js
let a = 1;
let b = a * 10;

a = 3;
```

Que vaut `b` à la fin du bloc de code ?

`b` vaut toujours `10`, car JavaScript n'est **pas** un langage réactif par nature – comme la
plupart des langages de programmation.

Une _vraie_ réactivité impliquerait que `b` se mette à jour automatiquement lorsque ses dépendances
– ici uniquement `a` – changent. C'est exactement ce que propose l'approche des _signals_.

> Svelte 3 proposait un système de réactivité très proche d'une _vraie_ réactivité – sans l'être
> tout à fait –, en se basant sur un compilateur.

## _Signals_

Le concept de _signals_ est [curieusement plutôt ancien, même dans le monde du
web](https://dev.to/this-is-learning/the-evolution-of-signals-in-javascript-8ob), mais a été remis
sur le devant de la scène en 2021 par le framework [Solid](https://www.solidjs.com/).

Depuis, de nombreux frameworks ont adopté le concept de _signal_. Svelte 5 introduit ce concept sous
le nom de **runes**.

> Nous n'allons pas détailler le concept de signals, mais vous pouvez en apprendre plus dans cet
> article : [_Signals from scratch_](https://dev.to/ratiu5/implementing-signals-from-scratch-3e4c).

> Il est très possible que dans un futur proche, React change sa façon de fonctionner et devienne
> réellement réactif, soit via des signals, soit via d'autres moyens.
