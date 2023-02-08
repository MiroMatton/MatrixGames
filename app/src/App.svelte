<script lang="ts">
  import Library from "./components/Library.svelte";
  import GamePage from "./components/GamePage.svelte";

  let gameSelected: string;
  let isgameSelected = false;
</script>

<main>
  {#if gameSelected}
    <GamePage bind:gameSelected bind:isgameSelected />
  {:else}
    <Library bind:gameSelected bind:isgameSelected />
  {/if}
</main>

<style lang="scss">
  @use "./styles/color";

  main {
    text-align: center;
  }
</style>
