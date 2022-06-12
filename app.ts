import { Application, Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";
import {
  getGame,
  getGames
} from './controllers/gameController.ts';

const apiKey = "7QDqXUaBOjZEBQHNYf5Nb6xadEwY8FvWJdMILqs82EyU5X4ChZ4VqdVCzkfQy6vP";
const app = new Application();

app.get("/games", getGames)
  .get("/games/:id", getGame)

app.use(abcCors());
app.start({ port: 8080 })
console.log("http://localhost:8080/");