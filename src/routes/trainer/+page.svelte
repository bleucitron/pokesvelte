<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();
	$inspect(form);
</script>

<h1>Trainer</h1>

<form method="POST" action="?/signup" use:enhance>
	<label class:error={form?.inputName === 'name'}>
		Nom
		<input value={form?.name} name="name" />
	</label>
	<label class:error={form?.inputName === 'password'}>
		Mot de passe
		<input value={form?.password} type="password" name="password" />
	</label>
	<label class:error={form?.inputName === 'confirmPassword'}>
		Confirmer
		<input value={form?.confirmPassword} type="password" name="confirmPassword" />
	</label>
	<button>Inscription</button>
</form>

<form method="POST" action="?/login" use:enhance>
	<label class:error={form?.inputName === 'name'}>
		Nom
		<input value={form?.login} name="login" />
	</label>
	<label class:error={form?.inputName === 'password'}>
		Mot de passe
		<input value={form?.pass} type="password" name="pass" />
	</label>
	<button>Connexion</button>
</form>
{#if form?.success}
	<p>Formulaire envoyé</p>
{:else if form?.message}
	<p>{form?.message}</p>
{/if}

<style>
	.error {
		color: red;
	}
	label {
		display: flex;
		flex-flow: column;
	}
	input {
		width: 15rem;
	}
	form {
		margin-block: 2rem;
	}
</style>
