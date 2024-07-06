<script lang="ts">
	import { page } from '$app/stores';

	const { form } = $props();

	const name = $derived(form?.inputName);
</script>

{#if form?.success}
	<h1>Bienvenue {form?.trainer?.name}</h1>
{:else}
	<h1>Dresseur</h1>
	<div class="forms">
		<div>
			<h2>Inscription</h2>

			<form action="?/signup" method="POST">
				<label class:error={name === 'name'}>Nom<input name="name" value={form?.name} /></label>
				<label class:error={name === 'password'}
					>Mot de passe<input type="password" name="password" /></label
				>
				<label class:error={name === 'confirmationPassword'}
					>Confirmer mot de passe<input type="password" name="confirmationPassword" /></label
				>
				<button>S'inscrire</button>
			</form>
		</div>
		<div>
			<h2>Connexion</h2>

			<form action="?/login" method="POST">
				<label class:error={name === 'login'}>Nom<input name="login" value={form?.login} /></label>
				<label class:error={name === 'pass'}
					>Mot de passe<input type="password" name="pass" /></label
				>
				<button>Se connecter</button>
			</form>
		</div>
	</div>
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

	h2 {
		text-align: center;
	}

	.forms {
		display: flex;
		gap: 10rem;
	}

	.error {
		color: red;
	}
</style>
