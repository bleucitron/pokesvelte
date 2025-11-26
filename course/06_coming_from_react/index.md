---
scope: svelte
description: Quelques conseils pour utiliser Svelte lorsqu'on est habitué à React
---

# Passer de React à Svelte

> Cette section est surtout destinée aux personnes venant de l'univers de React.

On l'a déjà mentionné, Svelte et React ont des similarités et des différences. Les unes et les
autres sont trop nombreuses pour qu'il soit réellement pertinent de les lister ici.

Néanmoins il y a quelques différences – déjà mentionnées dans les chapitres précédents – qu'il est
bon de rappeler si vous avez des habitudes avec React.

## Le code JavaScript d'un composant Svelte n'est joué qu'une seule fois

(lors de l'initialisation de l'instance)

La mécanique par défaut de React impose que la fonction d'un composant soit ré-exécutée à chaque
mise à jour de ses props ou de son state – c'est la boucle de rendu de React. En revanche, la
réactivité de Svelte est "ciblée", c'est-à-dire que Svelte ne rejoue que les morceaux de `<script>`
qui sont déclarés comme réactifs (avec des runes donc), et uniquement lorsque nécessaire.

```svelte
<!-- Svelte -->
<script>
	let count = $state(0);

	const double = count * 2; // ne sera calculé qu'une seule fois, à l'instanciation du composant
</script>

<!-- sera bien mis à jour quand count change car le markup est toujours réactif -->
<button onclick={() => count + 1}>{count}</button>
<!-- ne sera jamais remis à jour car double n'est pas réactif -->
<p>{double}</p>
```

```jsx
// React
function Counter() {
	const [count, setCount] = useState(0);

	const double = count * 2; // sera recalculé à chaque mise à jour du composant

	return (
		<>
			<button onClick={() => setCount(count + 1)}>{count}</button>
			<p>{double}</p>
		</>
	);
}
```

> Pour rendre `double` réactif dans l'exemple Svelte précédent, il faut bien sûr utiliser
> [`$derived`](../04_state/04_derived_state).

## Vous ne pouvez définir qu'un seul composant par `.svelte`

Alors que dans un fichier React, vous pouvez définir autant de composants que vous le souhaitez – il
vous suffit de définir plusieurs fonctions –, en Svelte chaque fichier que vous créez correspond à
un seul composant.

```svelte
<!-- Count.svelte -->
<script>
	let count = $state(0);
</script>

<button onclick={() => count + 1}>{count}</button>

<!-- Person.svelte -->
<script>
	let name = $state('Romain');
</script>

<button onclick={() => name = 'Jeanne'}>{name}</button>
```

```jsx
// React
function Counter() {
	const [count, setCount] = useState(0);

	return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

function Person() {
	const [name, setName] = useState('Romain');

	return <button onClick={() => setName('Jeanne')}>{name}</button>;
}
```

> Il existe néanmoins une manière de définir des morceaux de markup réutilisables au sein d'un même
> composant, [nous en reparlerons bientôt](../13_advanced_syntax/02_snippets).
