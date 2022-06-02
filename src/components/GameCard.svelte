<script lang="ts">
  export let title;
  export let url;
  export let description;

  const playGame = () => {
    fetch("http://localhost:8000/flash/" + title)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };
</script>

<div on:click={() => playGame()}>
  <img src={url} alt={title} />
  <h2>{title}</h2>
  <p>{description}</p>
</div>

<style lang="scss">
  @use "../styles/color";
  div {
    background: color.$backgroundGray;
    padding: 1em;
    margin: 1em;
    color: color.$gray;

    &:hover {
      opacity: 0.9;
      cursor: pointer;
      transform: scale(1.02);
    }
  }
  img {
    width: 10rem;
  }
</style>
