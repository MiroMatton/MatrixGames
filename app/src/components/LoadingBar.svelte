<div class="loadingBar">
  <div class="loader" />
</div>

<style lang="scss">
  @use "../styles/color";
  .loadingBar {
    position: relative;
    width: 100%;
    height: 1rem;
    border-radius: 2rem;
    overflow: hidden;
    background-color: color.$black;
  }

  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 2rem;
    background-color: color.$backgroundGray;
    left: -100%;
    animation: load 3s linear infinite;

    @keyframes load {
      0% {
        left: -100%;
      }

      100% {
        left: 100%;
      }
    }
  }
</style>
