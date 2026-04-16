<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';

	const { data } = $props();
	const { pokemons, team } = $derived(data);
	const titulaire = $derived(team.filter((membre) => (membre.main === true)));
	const remplacant = $derived(team.filter((membre) => !membre.main));
</script>

<h1>TEAM</h1>
<ul>
	{#each titulaire as member (member.uuid)}
		{@const p = pokemons[member.id - 1]}
		{#if p}
			{@const src = p.sprites.front_default}
			<li>
				<img {src} alt="pokémon img" />
				<p>{member.name}</p>

				<form action="?/rename" method="POST" use:enhance>
					<label for="nomPkm">
						Nom
					</label>
					<input id="nomPkm" name="nomPkm" placeholder="..."/>
					<input name="uuid" type="hidden" value="{member.uuid}"/>
					<button type="submit">Valider</button>
					<button formaction="?/titulaire">{member.main ? 'Mettre au dodo' : 'Mettre au boulot' }</button>
				</form>
				<button
					onclick={async () => {
						// team.removeMember(member.uuid);
								await fetch("/team/"+ member.uuid, {method:"DELETE"})
								invalidate("team:update");
					}}>Free</button
				>
			</li>
		{/if}
	{/each}
</ul>

<h2>BANC</h2>
<ul>
	{#each remplacant as member (member.uuid)}
		{@const p = pokemons[member.id - 1]}
		{#if p}
			{@const src = p.sprites.front_default}
			<li>
				<img {src} alt="pokémon img" />
				<p>{member.name}</p>

				<form action="?/rename" method="POST" use:enhance>
					<label for="nomPkm">
						Nom
					</label>
					<input id="nomPkm" name="nomPkm" placeholder="..."/>
					<input name="uuid" type="hidden" value="{member.uuid}"/>
					<button type="submit">Valider</button>
					<button formaction="?/titulaire">{member.main ? 'Mettre au dodo' : 'Mettre au boulot' }</button>
				</form>

				<button
					onclick={async () => {
						// team.removeMember(member.uuid);
								await fetch("/team/"+ member.uuid, {method:"DELETE"})
								invalidate("team:update");
					}}>Free</button
				>
			</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin-block: 1rem;
		gap: 1rem;
	}
</style>

