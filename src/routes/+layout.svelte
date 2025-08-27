<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Todo App</title>
</svelte:head>

{@render children?.()}
