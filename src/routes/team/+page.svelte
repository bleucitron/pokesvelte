<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { recent } from '$lib/states/recent.svelte';
	import type { TeamMember } from '$lib/server/db/team';
	import { scale } from 'svelte/transition';

	const { data } = $props();
	const { pokemons, team } = $derived(data);

	const main = $derived(team.filter((m) => m.main));
	const bench = $derived(team.filter((m) => !m.main));

	async function release(uuid: string) {
		await fetch(`/team/${uuid}`, { method: 'DELETE' });

		invalidate('team:update');
	}
</script>

<h1>Équipe</h1>

<h2>Titulaires</h2>

<ul>
	{#each main as member (member.uuid)}
		{@render Member(member)}
	{:else}
		<p>Aucun membre</p>
	{/each}
</ul>

<h2>Banc</h2>
<ul>
	{#each bench as member (member.uuid)}
		{@render Member(member)}
	{:else}
		<p>Aucun membre</p>
	{/each}
</ul>

{#snippet Member({ id, uuid, name, main }: TeamMember)}
	{@const pokemon = pokemons[id - 1]}
	{@const isRecent = recent.members.includes(uuid)}

	{#if pokemon}
		{@const { sprites } = pokemon}
		{@const src = sprites.front_default}
		<li>
			<img
				{src}
				width="96"
				height="96"
				loading="lazy"
				alt={name}
				onmouseenter={() => recent.remove(uuid)}
			/>
			<form method="POST" action="?/rename" use:enhance>
				<input name="name" value={name} />
				<input type="hidden" name="uuid" value={uuid} />
				<button>Renommer</button>
				<button formaction="?/toggle">{!main ? 'Titulariser' : 'Sur le banc'}</button>
			</form>
			<button onclick={() => release(uuid)}>x</button>{#if isRecent}
				<div class="new" out:scale={{ duration: 300 }}>new</div>
			{/if}
		</li>
	{/if}
{/snippet}

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin-block: 1rem;
		gap: 1rem;
	}

	li {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		flex-basis: 12rem;
	}
	li > button {
		position: absolute;
		top: 0;
		right: 0;
	}
	li input {
		width: 100%;
	}
	li .new {
		position: absolute;
		content: 'new';
		top: 0;
		left: 0;
		background: orange;
		border-radius: 8px;
		padding: 0.2rem;
		padding-top: 0.4rem;
		font-size: 0.7rem;
		border: 2px solid #888;
		line-height: 0.8rem;
	}

	form button {
		width: 100%;
		text-align: center;
	}
</style>
