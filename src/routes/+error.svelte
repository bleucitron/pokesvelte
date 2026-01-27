<script>
	import { page } from '$app/state';
</script>

<h1>Oh noooon !!! Erreur {page.status}...</h1>

<p>({page.error?.message})</p>