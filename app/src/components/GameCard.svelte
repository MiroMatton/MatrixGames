<script lang="ts">
  export let title;
  export let url;
  export let description;
  export let isgameSelected;
  export let gameSelected;

  const goToGamePage = () => {
    isgameSelected = true;
    gameSelected = title;
  };
</script>

<div on:click={() => goToGamePage()}>
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
