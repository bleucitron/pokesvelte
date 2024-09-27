<script lang="ts">
	import { inject } from '@vercel/analytics';
	const { children } = $props();

	inject();
</script>

{@render children()}
