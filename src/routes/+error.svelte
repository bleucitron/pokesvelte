<script>
	import { page } from '$app/state';
	const { status, error } = $derived(page);
</script>

<h1>Oh noooon !!! Erreur {status}...</h1>

<p>({error?.message})</p>