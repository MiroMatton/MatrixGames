import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";

import { fetchGame, fetchGames } from "./apiController.ts";
import { flashGame, downloadGame } from "../logic.ts";

export const getGame = async (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const game = await fetchGame(id);
        if (game) {
            return ctx.json(game, 200);
        } else {
            return ctx.string('no game found', 404);
        }
    } catch (err) {
        console.log(err);
        return ctx.string('something went wrong', 500);
    }
}

export const getGames = async (ctx: Context) => {
    try {
        const games = await fetchGames();
        if (games) {
            return ctx.json(games, 200);
        } else {
            return ctx.string('no games found', 404);
        }
    } catch (err) {
        console.log(err);
        return ctx.string('something went wrong', 500);
    }
};

export const playGame = async (ctx: Context) => {
    const { game } = ctx.params;
    const path = "./games/" + game + ".ino.esp32.bin";

    /*
    try {
        const gameExist = await Deno.open(path);
        if (gameExist) {
            await flashGame(game);
            return ctx.string("installed", 200);
        }

    } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
            await downloadGame(game);
            return ctx.string("downloaded", 200);
        }
    }
    */
}

export const testFlasher = async () => {
    const tester = "esp32Blinking";
    const path = "./games/" + tester + ".ino.esp32.bin";

    let log = await flashGame(tester);
    console.log("tester: ", log);
}