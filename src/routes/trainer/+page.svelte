<script lang="ts">
	import { page } from '$app/stores';

	const { form } = $props();

	const name = $derived(form?.inputName);
</script>

{#if form?.success}
	<h1>Bienvenue {form?.trainer?.name}</h1>
{:else}
	<h1>Dresseur</h1>
	<h2>Inscription</h2>

	<form method="POST">
		<label class:error={name === 'name'}>Nom<input name="name" value={form?.name} /></label>
		<label class:error={name === 'password'}
			>Mot de passe<input type="password" name="password" /></label
		>
		<label class:error={name === 'confirmationPassword'}
			>Confirmer mot de passe<input type="password" name="confirmationPassword" /></label
		>
		<button>S'inscrire</button>
	</form>
	{#if $page.status >= 400}
		<p class="error">{form?.message}</p>
	{/if}
{/if}

<style>
	form {
		display: flex;
		flex-flow: column;
	}

	label {
		display: flex;
		flex-flow: column;
		align-items: center;
		margin-block: 0.5rem;
	}

	input {
		width: 15rem;
	}
	button {
		margin-block: 0.5rem;
	}

	.error {
		color: red;
	}
</style>
