<script lang="ts">
  import { onMount } from "svelte";
  import GameCard from "./GameCard.svelte";
  import Loader from "./LoaderPage.svelte";

  export let isgameSelected;
  export let gameSelected;

  let games;

  onMount(async () => {
    fetch("http://localhost:8000/games")
      .then((response) => response.json())
      .then((data) => {
        games = data.documents;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  });
</script>

<section id="Library">
  <h1>Games</h1>

  {#if games}
    <div class="grid">
      {#each games as game}
        <GameCard
          title={game.title}
          url={game.img}
          description={game.description}
          bind:gameSelected
          bind:isgameSelected
        />
      {/each}
    </div>
  {:else}
    <Loader />
  {/if}
</section>

<style lang="scss">
  @use "../styles/color";

  h1 {
    color: color.$white;
    font-size: 3em;
    font-weight: 100;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.5em;
  }
</style>
