import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";

import { fetchGame, fetchGames } from "./apiController.ts";
import { flashGame } from "../logic.ts";

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

export const testFlasher = async (ctx: Context) => {
    const tester = "esp32Blinking";
    await flashGame(tester);

    return ctx.string('test installed', 200)
}