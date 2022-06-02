<script lang="ts">
  import { onMount } from "svelte";
  let games;

  onMount(async () => {
    fetch("http://localhost:8000/games")
      .then((response) => response.json())
      .then((data) => {
        games = data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  });
</script>

<main>
  <h1>Games</h1>
  <ul>
    {#if games}
      {#each games as game}
        <li>{game.description}</li>
      {/each}
    {/if}
  </ul>
</main>

<style lang="scss">
  @use "./styles/color";
  main {
    text-align: center;
    padding: 1em;
    background-color: color.$background;
    color: color.$gray;

    h1 {
      color: color.$white;
      font-size: 3em;
      font-weight: 100;
    }
  }
</style>
