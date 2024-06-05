---
scope: svelte
subtitle: Flop
description: Animer les éléments qui ne transitionnent pas avec Svelte
---

# Animation FLIP

Jusque là nous n'avons vu que des transitions, c'est-à-dire des éléments qui entrent ou sortent du
DOM avec un effet spécial.

Mais si vous remarquez bien, quand nous supprimons un membre de notre équipe par exemple, les
membres restants ajustent leur place instantanément une fois que l'élément supprimé est complètement
disparu, créant un effet bizarre et peu intuitif.

Pour améliorer ça, Svelte utilise le concept d'[animation
FLIP](https://aerotwist.com/blog/flip-your-animations).

Pour s'en servir, il suffit d'ajouter `animate:flip` en attribut aux éléments que vous souhaitez
animer, en ayant importé `flip` depuis `svelte/animate` :

```svelte
<script>
	import { flip } from 'svelte/animate';
</script>

{#each items as item (item.id)}
	<li animate:flip>{item.name}</li>
{/each}
```

> Il est nécessaire de se trouver directement dans un bloc `{#each}` avec clé pour pouvoir utiliser
> `animate:flip`.

## Personnaliser FLIP

Comme pour les transitions, vous pouvez personnaliser votre animation FLIP de diverses manières :

```svelte
{#each items as item (item.id)}
	<li animate:flip={{ duration: 200, delay: 1000 }}>{item.name}</li>
{/each}
```

<fieldset class='task'>
<legend>À vous !</legend>

Dans la page `/team`

- Utilisez l'animation `flip` pour fluidifier l'ajout ou la suppression des membres de l'équipe.

- Faites en sorte d'avoir la même `duration` pour `flip` que pour les transitions affectant les
  éléments concernés.

</fieldset>

---

[En savoir plus sur ce chapitre](https://svelte.dev/docs/svelte-animate#flip)
