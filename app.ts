import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";
import { serve } from "https://deno.land/std/http/mod.ts";

import {
  getGame,
  getGames,
  playGame,
  testFlasher
} from './controllers/gameController.ts';
import { flashGameAndLog } from "./logic.ts";

const app = new Application();
const port = 8000;

app.get("/games", getGames)
  .get("/games/:id", getGame)
  .get("/play/:game", playGame)
  .get("test", testFlasher)

app.use(abcCors());
app.start({ hostname: "0.0.0.0", port: port })
console.log("http://localhost:" + port);

const reqHandler = (req: Request) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  ws.onopen = () => console.log("connected to client ...");
  ws.onmessage = (m) => handleMessage(m.data, ws);
  ws.onclose = () => console.log("Disconnected from client ...");
  return response;
}

console.log("Waiting for client ...");
serve(reqHandler, { hostname: "0.0.0.0", port: 5300 });

const handleMessage = (data: String, ws: any) => {
  flashGameAndLog(data, ws);
};