<h1>Dresseur</h1>

<h2>Inscription</h2>

<form method="POST">
	<label>Nom<input name="name" /></label>
	<label>Mot de passe<input type="password" name="password" /></label>
	<button>S'incrire</button>
</form>

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
</style>
