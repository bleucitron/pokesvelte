<script lang="ts">
	const { form } = $props();

	const errorFields = $derived(form?.errorFields ?? []);
	const trainer = $derived(form?.trainer);
</script>

<h1>Dresseur</h1>

<h2>Inscription</h2>

<form method="POST">
	<label class={{ error: errorFields.includes('name') }}>
		Nom
		<input name="name" value={form?.values?.name} />
	</label>
	<label class={{ error: errorFields.includes('password') }}>
		Mot de passe
		<input type="password" name="password" />
	</label>
	<label class={{ error: errorFields.includes('password-confirmation') }}>
		Confirmation du mot de passe
		<input type="password" name="password-confirmation" />
	</label>
	<button>S'incrire</button>
</form>

{#if form?.message}
	<p class="error">{form.message}</p>
{:else if form?.success}
	<p>Utilisateur {trainer?.name} ({trainer?.id}) créé avec succès !</p>
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

		input {
			outline: 2px solid red;
		}
	}
</style>
