<script lang="ts">
  import LoadingBar from "./LoadingBar.svelte";
  import FaPlay from "svelte-icons/fa/FaPlay.svelte";
  import IoIosArrowBack from "svelte-icons/io/IoIosArrowBack.svelte";
  import Loader from "./LoaderPage.svelte";

  export let isgameSelected;
  export let gameSelected;

  let game;
  let isLoading = false;
  let logs: Array<String> = [];

  const goBack = () => {
    console.log("go back");
    isgameSelected = false;
    gameSelected = null;
  };

  const playGame = () => {
    isLoading = true;
    logs = [];
    console.log("Connecting to server ...");
    try {
      const ws = new WebSocket("ws://localhost:5300");

      ws.onopen = () => handleConnected(ws);
      ws.onmessage = (m) => handleMessage(m.data);
      ws.onclose = () => (isLoading = false);
    } catch (err) {
      console.log("Failed to connect to server ... exiting");
    }
  };

  const url = "http://localhost:8000/games/" + gameSelected;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      game = data.document;
    })
    .catch((error) => {
      console.log(error);
    });

  const handleConnected = (ws) => {
    console.log("Connected to server ...");
    ws.send(game.game);
  };

  const handleMessage = (data) => {
    logs = [...logs, data];
  };
</script>

<section id="GamePage">
  {#if game}
    <nav>
      <div id="backButton" on:click={() => goBack()}>
        <div class="icon">
          <IoIosArrowBack />
        </div>
        <p>library</p>
      </div>
    </nav>
    <div class="header">
      <img src={game.img} alt={game.title} />
      <div class="gameInfo">
        <h1>{game.title}</h1>
        {#if isLoading}
          <LoadingBar />
        {:else}
          <div class="play" on:click={() => playGame()}>
            <div class="icon">
              <FaPlay />
            </div>
            <p>play</p>
          </div>
        {/if}
      </div>
    </div>
    <div class="log">
      <h2>Log</h2>
      {#if logs}
        {#each logs as log, i}
          <p>{log}</p>
        {/each}
      {/if}
    </div>
  {:else}
    <Loader />
  {/if}
</section>

<style lang="scss">
  @use "../styles/color";

  h1 {
    color: color.$white;
    margin-bottom: 1rem;
  }

  nav {
    background-color: color.$backgroundGray;
    color: color.$white;
    padding: 0 2rem;

    #backButton {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .icon {
        width: 2rem;
        padding-top: 0.45rem;
      }

      p {
        padding-left: 0.25em;
      }

      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: color.$background;

    img {
      width: 10rem;
    }

    .gameInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      margin-left: 1rem;
    }

    .play {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 5rem;
      color: color.$white;
      background: color.$green;
      margin: 1rem 0;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;

      .icon {
        width: 1.2rem;
        padding-top: 0.45rem;
      }

      p {
        padding-bottom: 0;
        margin: 0;
      }

      &:hover {
        opacity: 0.9;
        cursor: pointer;
        transform: scale(1.02);
      }
    }
  }

  .log {
    text-align: left;
    color: color.$white;
    overflow-y: scroll;
    height: calc(70vh);
    min-height: 100%;
    background-color: color.$black;
  }

  div::-webkit-scrollbar-track {
    background-color: color.$black;
  }

  div::-webkit-scrollbar {
    width: 12px;
    background-color: color.$background;
  }

  div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: color.$backgroundGray;
  }

  .header,
  .log {
    padding: 1rem 2rem;
  }
</style>
