<script lang="ts">
	import { enhance } from '$app/forms';

	const { form, data } = $props();
	const { trainer } = $derived(data);

	const errorFields = $derived(form?.errorFields ?? []);
</script>

<h1>Dresseur</h1>

{#if trainer}
	{@const { name, id } = trainer}
	<h2>Bonjour {name}</h2>
	<p>(#{id})</p>
{:else}
	<div class="forms">
		<div>
			<h2>Inscription</h2>

			<form method="POST" action="?/signup" use:enhance>
				<label class={{ error: errorFields.includes('signup_name') }}>
					Nom
					<input name="signup_name" value={form?.signup_name} />
				</label>
				<label class={{ error: errorFields.includes('signup_password') }}>
					Mot de passe
					<input type="password" name="signup_password" />
				</label>
				<label class={{ error: errorFields.includes('signup_password-confirmation') }}>
					Confirmation du mot de passe
					<input type="password" name="signup_password-confirmation" />
				</label>
				<button>S'incrire</button>
			</form>
		</div>
		<div>
			<h2>Connexion</h2>

			<form method="POST" action="?/login" use:enhance>
				<label class={{ error: errorFields.includes('login_name') }}>
					Nom
					<input name="login_name" value={form?.login_name} />
				</label>
				<label class={{ error: errorFields.includes('login_password') }}>
					Mot de passe
					<input type="password" name="login_password" />
				</label>
				<button>Se connecter</button>
			</form>
		</div>
	</div>
	{#if form?.message}
		<p class={{ error: !form?.success }}>{form.message}</p>
	{/if}
{/if}

<style>
	.forms {
		display: flex;
		gap: 5rem;
	}

	h2 {
		text-align: center;
	}

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
