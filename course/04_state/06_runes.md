# Runes

Nous avons vu plusieurs fonctions spéciales de Svelte : `$props`, `$state`, `$derived`, `$inspect`, `$effect`.

Ces fonctions spéciales sont appelées des **runes**. Elles sont le fondement de la réactivité de Svelte 5, et implémentent en arrière plan la philosophie des signaux.

> Il en existe plusieurs autres, qui ont des rôles plus techniques, nous ne les verrons pas durant cette formation. Vous pouvez toutes les retrouver [ici](https://svelte-5-preview.vercel.app/docs/runes).

Les runes nous sont fournies par le compilateur de Svelte et n'ont pas besoin d'être importées.

Puisque les runes nous sont fournies par le compilateur Svelte, vous pouvez les utiliser uniquement dans des fichiers `*.svelte.`, que ce soit `*.svelte`, `*.svelte.js` ou `*.svelte.ts`.
