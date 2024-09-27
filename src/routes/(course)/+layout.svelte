<script lang="ts">
	import { page } from '$app/stores';
	import Menu from '$lib/components/Menu.svelte';

	const { data, children } = $props();
	const current = $derived($page.data.current?.id);

	let withMenu = $derived($page.url.pathname !== '/contents');
</script>

<div class="root">
	<Menu {current} tree={data.tree} {withMenu} />

	<main class="course">
		<article>
			{@render children()}
		</article>
	</main>
</div>

<style>
	main {
		display: flex;
		height: 100%;
		margin-inline: auto;
		padding-bottom: 3rem;
		flex-flow: column;
		padding-inline: calc(1rem + var(--aside-width));
		overflow-x: hidden;
		overflow-y: auto;

		@media (max-width: 1024px) {
			padding-inline: 2rem;
		}
	}
	article {
		flex: 1;
		margin-bottom: 3rem;
		margin-inline: auto;
		width: min(70ch, 100%);
	}
</style>
