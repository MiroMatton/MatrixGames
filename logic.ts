export const flashGame = async (game: String) => {
    const fileName = game + ".ino.esp32.bin";
    const path = "./games/" + fileName;

    const cmd = Deno.run({
        cmd: ["esptool.py", "--port", "/dev/ttyUSB0", "--baud", "460800", "write_flash", "--flash_size=detect", "0x10000", path],
        stdout: "piped",

    });

    await cmd.status();
    return new TextDecoder().decode(await cmd.output());
}

export const downloadGame = async (game: String) => {

    const fileName = game + ".ino.esp32.bin";
    const gamePath = "./games/" + fileName;
    const url = "https://gitlab.com/2122-wta-miromatton/matrixgames/-/raw/main/" + game + "/" + fileName;
    const cmd = Deno.run({
        cmd: ["wget", "-O", gamePath, url],
        stdout: "piped",

    });

    await cmd.status();
    console.log("game downloaded");
    return await flashGame(game);
}