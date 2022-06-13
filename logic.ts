import { stdOutStream } from "https://deno.land/x/stdoutstream@1.0/mod.ts";

export const flashGame = async (game: String) => {
  const fileName = game + ".ino.esp32.bin";
  const path = "./games/" + fileName;

  const cmd = Deno.run({
    cmd: [
      "esptool.py",
      "--port",
      "/dev/ttyUSB0",
      "--baud",
      "460800",
      "write_flash",
      "--flash_size=detect",
      "0x10000",
      path,
    ],
    stdout: "piped",
  });

  await cmd.status();
  return new TextDecoder().decode(await cmd.output());
};

export const downloadGame = async (game: string, ws: any) => {
  const fileName = game + ".ino.esp32.bin";
  const gamePath = "./games/" + fileName;
  const url = "https://gitlab.com/2122-wta-miromatton/matrixgames/-/raw/main/" +
    game + "/" + fileName;

  ws.send("[gitlab🦊] fetching game..." as string);
  const process = new stdOutStream();

  await process.on("stdout", (stdout) => {
    console.log("[gitlab🦊] " + stdout);
    const reply = "[gitlab🦊] " + stdout;
    ws.send(reply as string);
  })
    .on("stderr", (stderr) => {
      console.log("[gitlab🦊] " + stderr);
      const reply = "[gitlab🦊] " + stderr;
      ws.send(reply as string);
    })
    .run("wget", "-O", gamePath, url);

  await flashGameLogging(game, ws);
};

export const flashGameLogging = async (game: string, ws: any) => {
  const fileName = game + ".ino.esp32.bin";
  const path = "./games/" + fileName;

  const process = new stdOutStream();

  await process.on("stdout", (stdout) => {
    console.log("[deno🦕] " + stdout);
    const reply = "[deno🦕] " + stdout;
    ws.send(reply as string);
  })
    .on("stderr", (stderr) => {
      console.log("[error❌] " + stderr);
      const reply = "[error❌] " + stderr;
      ws.send(reply as string);
    })
    .run(
      "esptool.py",
      "--port",
      "/dev/ttyUSB0",
      "--baud",
      "460800",
      "write_flash",
      "--flash_size=detect",
      "0x10000",
      path,
    );
  ws.close();
};
