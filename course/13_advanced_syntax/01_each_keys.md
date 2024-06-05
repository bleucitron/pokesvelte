---
scope: svelte
description: Utiliser les clés de boucle pour identifier les instances de composants Svelte
---

# Clés de boucle

Vous remarquez quelque chose de bizarre ?

Les Pokémons n'apparaissent pas vraiment comme prévu, les premier apparus ont tendance à rester très
longtemps affichés...

C'est parce que dans un bloc `{#each}`, Svelte ne supprime pas réellement les éléments correspondant
aux données que nous avons supprimé de notre tableau : il supprime les éléments de la fin du
tableau, et ajuste les valeurs.

Ce comportement par défaut permet de grandement faciliter le travail du navigateur pour mettre à
jour le DOM. Mais pose problème dans certaines situations, où il est important de connaître
précisément la position d'un élément dans le tableau.

Pour corriger cela, **il faut préciser à chaque élément un identifiant unique, une clé (appelée
`key`) qui identifie précisément et de manière unique l'élément pour toute la durée de sa présence
sur la page**. Cet identifiant permet à Svelte de savoir avec précision ce qui a besoin d'être mis à
jour dans le DOM ou non.

```svelte
{#each person as person (person.id)}
	<p>{person.name}</p>
{/each}
```

Notez que c'est différent de la syntaxe pour obtenir la position de l'élément dans le tableau :

```svelte
{#each person as person, position (person.id)}
	<p>{person.name}</p>
{/each}
```

> Les identifiants provenant des bases de données sont souvent utilisés comme clés dans cette
> situation. N'utilisez surtout pas la position de l'élément dans le tableau, car cette information
> peut changer pour un même individu, et ne l'identifie donc pas correctement, ce qui va entraîner
> du travail supplémentaire pour le navigateur.

<fieldset class='task'>
<legend>À vous !</legend>

- Faites en sorte de corriger notre problème d'apparition de Pokémon, en utilisant la bonne valeur
  comme `key`.

</fieldset>

---

[Un autre exemple de ce problème](https://learn.svelte.dev/tutorial/keyed-each-blocks)
