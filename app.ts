import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { abcCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { serve } from "https://deno.land/std@0.143.0/http/mod.ts";

import {
  getGame,
  getGames,
  testFlasher,
} from "./controllers/gameController.ts";
import { reqHandler } from "./controllers/flashController.ts";

const app = new Application();
const port = 8000;

app.get("/games", getGames)
  .get("/games/:id", getGame)
  .get("test", testFlasher);

app.use(abcCors());
app.start({ hostname: "0.0.0.0", port: port });
console.log("http://localhost:" + port);

// websocket server voor live logging systeem
console.log("Waiting for client ...");
serve(reqHandler, { hostname: "0.0.0.0", port: 5300 });
