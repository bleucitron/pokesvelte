<script lang="ts">
	interface Props {
		name: string;
	}
	const { name }: Props = $props();
</script>

<img class="Icon" src="/svgs/{name}.svg" alt="An icon of {name}" />

<style>
	.Icon {
		width: 1.3rem;
	}
</style>
