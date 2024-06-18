<script>
	import { page } from '$app/stores';
</script>

<h1>Oh noooon !!! Erreur {$page.status}...</h1>

<p>({$page.error?.message})</p>
