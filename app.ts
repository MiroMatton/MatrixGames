import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";
import {
  getGame,
  getGames,
  playGame,
  testFlasher
} from './controllers/gameController.ts';

const app = new Application();
const port = 8000;

app.get("/games", getGames)
  .get("/games/:id", getGame)
  .get("/play/:game", playGame)
  .get("test", testFlasher)

app.use(abcCors());
app.start({ hostname: "0.0.0.0", port: port })
console.log("http://localhost:" + port);