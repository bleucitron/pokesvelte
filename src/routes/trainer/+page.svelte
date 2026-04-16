<script>
	const { form } = $props();
</script>

<h1>Dresseur</h1>

{#if form?.success}
	<p>Formulaire envoyé avec succès !</p>
{:else}
	<p>{form?.message}</p>
{/if}
<h2>Inscription</h2>
<form action="?/inscription" method="POST">
	<label for="nom">
		Nom
	</label>
	<input id="nom" name="nom" placeholder="..."  class={{error: form?.champ === "nom"}} value={form?.nom}/>
	<label for="password">
		Mot de passe
	</label>
	<input id="password" name="password" placeholder="******" type="password" class={{error: form?.champ === "password"}}/>
	<label for="passwordConf">
		Confirmation du mot de passe
	</label>
	<input id="passwordConf" name="passwordConf" placeholder="******" type="password" class={{error: form?.champ === "passwordConf"}}/>
	<button type="submit">Valider</button>
</form>

<h2>Connexion</h2>
<form action="?/connexion" method="POST">
	<label for="nomCnx">
		Nom
	</label>
	<input id="nomCnx" name="nom" placeholder="..."  class={{error: form?.champ === "nomCnx"}} value={form?.nomCnx}/>
	<label for="passwordCnx">
		Mot de passe
	</label>
	<input id="passwordCnx" name="password" placeholder="******" type="password" class={{error: form?.champ === "passwordCnx"}}/>
	<button type="submit">Connexion</button>
</form>

<style>
	input.error {
			border-color:red;
	}
</style>