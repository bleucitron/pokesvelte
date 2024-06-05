# Validation de formulaire

La plupart du temps, les données envoyées par des formulaires ont besoin d'être validées par le serveur avant d'être utilisées.

SvelteKit permet de renvoyer des données depuis les `action`s, de cette manière :

## Données de formulaire

```ts
// +page.server.ts
export const actions = {
	default: () => {
		return { a: 1 };
	}
};
```

Ces données de retour d'`action` seront fournies à la page (donc dans le fichier `+page.svelte` correspondant) dans la prop `form` lors du rechargement le page suite à l'envoi et au traitement du formulaire.

```svelte
<!-- +page.svelte -->
<script>
	const { data, form } = $props(); // form ne sera remplie qu'après un envoi de formulaire
</script>
```

> La prop `form`, comme la prop `data`, est une prop fournie par SvelteKit à toutes les composants de page. Ces props n'ont pas de sens particulier dans Svelte.

Vous pouvez donc, en fonction des données fournies dans `form`, afficher des informations sur la validité du formulaire :

```ts
// +page.server.ts
export const actions = {
	default: () => {
		return { success: true };
	}
};
```

```svelte
<!-- +page.svelte -->
<script>
	const { data, form } = $props(); // form ne sera remplie qu'après un envoi de formulaire
</script>

{#if form?.success}
	<p>Formulaire envoyé avec succès !</p>
{/if}
```

## Erreurs de formulaire

Lorsque tout se passe bien, votre soumission de formulaire vous renvoie une réponse avec un code `200`.

Mais si les données de formulaire ne sont pas conformes, il est d'usage de renvoyer une réponse avec un code `400` ou `422`, code signifiant que les données de requête sont invalides (ou un autre code HTTP si vous préférez). Vous pouvez faire cela en utilisant l'utilitaire `fail` de `@sveltejs/kit` :

> Si besoin, vous pouvez accéder au code d'erreur via le store de page, avec `$page.status`.

```ts
// +page.server.ts
import { fail } from '@sveltejs/kit';

export const actions = {
	default: ({ request }) => {
		const data = await request.formData();
		const age = data.get('age');

		if (age < 18) {
			return fail(400, { age, allowed: false, message: "Vous n'avez pas le droit d'être ici." }); // il peut être pertinent de renvoyer la donnée fournie, ici `age`
		}

		return { success: true };
	}
};
```

```svelte
<!-- +page.svelte -->
<script>
	const { data, form } = $props(); // form ne sera remplie qu'après un envoi de formulaire
</script>

{#if form?.success}
	<p>Formulaire envoyé avec succès !</p>
{:else if !form?.allowed}
	<p>{form?.message}</p>
{/if}
```

N'oubliez pas que le comportement par défaut du navigateur est de recharger la page après une soumission de formulaire. Donc la page sera remise dans son état initial, et les éventuelles valeurs d'`<input>` seront perdues si vous ne prévoyez rien. Une bonne façon d'éviter ça et de renvoyer les valeurs de formulaire soumises lorsqu'une erreur de formulaire se produit.

> Évitez de renvoyer les mots de passe, qui sont des données sensibles.

> Il est également possible de procéder à une validation côté client pour s'éviter un A/R sur le serveur. Il n'y a rien de prévu de particulier pour cela dans Svelte ou SvelteKit, il "suffit" d'implémenter de la logique d'état en Svelte. Néanmoins, une validation côté serveur devrait toujours être nécessaire.

## À vous !

<section class='task'>

Dans la page `/trainer`

- Ajouter un champ "Confirmation de mot de passe".

Valider les différents champs du formulaire, et envoyer une erreur si :

- si le nom est manquant
- si le mot de passe est manquant
- si le mot de passe est trop court
- si les mots de passe sont différents
- si le nom est disponible avec `db.trainer.get(idOrName)` de `$lib/db`

- Renvoyer `{ success: true }` si tout va bien

- Donner une classe `error` aux champs du formulaire s'ils ont un problème

- Afficher un message si quelque chose ne va pas dans le formulaire, et un autre si tout se passe bien.
</section>

[Plus d'infos sur ce chapitre](https://kit.svelte.dev/docs/form-actions#anatomy-of-an-action)
