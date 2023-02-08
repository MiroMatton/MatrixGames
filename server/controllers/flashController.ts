import { downloadGame, flashGameLogging } from "../logic.ts";

export const reqHandler = (req: Request) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  ws.onopen = () => console.log("connected to client ...");
  ws.onmessage = (m) => handleMessage(m.data, ws);
  ws.onclose = () => console.log("Disconnected from client ...");
  return response;
};

const handleMessage = async (game: string, ws: any) => {
  const path = "./games/" + game + ".ino.esp32.bin";

  try {
    const gameExist = await Deno.open(path);
    if (gameExist) {
      await flashGameLogging(game, ws);
    }
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      await downloadGame(game, ws);
    }
  }
};
