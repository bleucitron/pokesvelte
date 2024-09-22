<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';
	import Menu from '$lib/components/Menu.svelte';

	const { data, children } = $props();
	const current = $derived($page.data.current?.id);

	let showMenu = $derived($page.url.pathname !== '/contents');
</script>

<div class="root">
	<aside>
		<Menu {current} tree={data.tree} {showMenu} />

		<a
			title="Github repository"
			class="button-link"
			href="https://github.com/bleucitron/pokesvelte"
			target="_blank"><Icon name="github" /></a
		>
	</aside>

	<main class="course">
		{@render children()}
	</main>
</div>

<style>
	aside {
		position: fixed;
		left: 0;
		width: 100%;
		height: var(--topbar-height);
		padding: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		z-index: 1;

		@media (max-width: 1024px) {
			border-bottom: 1px solid var(--dark-grey);
		}
	}
	main {
		display: flex;
		height: 100%;
		padding-bottom: 3rem;
		flex-flow: column;
		padding-inline: calc(1rem + var(--aside-width));
		overflow-x: hidden;
		overflow-y: auto;

		@media (max-width: 1024px) {
			padding-inline: 2rem;
		}
	}
</style>
