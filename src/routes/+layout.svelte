<script lang="ts">
	import { onMount } from "svelte";
	import "../app.css";

	let { children } = $props();
	let theme = $state<"dark" | "light">("dark");

	function toggleTheme() {
		theme = theme === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}

	onMount(() => {
		const savedTheme = localStorage.getItem("theme") as
			| "dark"
			| "light"
			| null;
		if (savedTheme) {
			theme = savedTheme;
		}
		document.documentElement.setAttribute("data-theme", theme);
	});
</script>

<div class="app-shell" data-theme={theme}>
	<nav class="top-nav">
		<div class="nav-brand">OHNISHJ</div>
		<button class="theme-switch" onclick={toggleTheme}>
			{theme === "dark" ? "Light Mode" : "Dark Mode"}
		</button>
	</nav>

	<main class="content-container">
		{@render children()}
	</main>

	<footer class="site-footer">
		<div class="footer-grid"></div>
	</footer>
</div>

<style>
	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 0 5%;
	}

	.top-nav {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-border);
		margin-bottom: 4rem;
	}

	.nav-brand {
		font-family: var(--font-sans);
		font-weight: bold;
		letter-spacing: 0.1em;
		font-size: 0.8rem;
	}

	.theme-switch {
		background: none;
		border: none;
		color: var(--color-text);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: underline;
		padding: 0;
	}

	.theme-switch:hover {
		color: var(--color-muted);
	}

	.content-container {
		flex: 1;
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
	}

	.site-footer {
		padding: 4rem 0 2rem;
		border-top: 1px solid var(--color-border);
		margin-top: 4rem;
		font-family: var(--font-sans);
		font-size: 0.7rem;
		color: var(--color-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.footer-grid {
		display: flex;
		justify-content: space-between;
	}

	@media (max-width: 600px) {
		.app-shell {
			padding: 0 1rem;
		}
	}
</style>
