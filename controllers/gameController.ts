import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const { DATA_API_KEY, APP_ID } = config();

const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/beta/action`
const DATA_SOURCE = "MatrixGames"
const DATABASE = "MatrixGames"
const COLLECTION = "games"

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "api-key": DATA_API_KEY
    },
    body: ""
};

export const getGame = async (ctx: Context) => {
    const { id } = ctx.params;
    try {
        const URI = `${BASE_URI}/findOne`;
        const query = {
            collection: COLLECTION,
            database: DATABASE,
            dataSource: DATA_SOURCE,
            filter: { title: id }
        };
        options.body = JSON.stringify(query);
        const dataResponse = await fetch(URI, options);
        const game = await dataResponse.json();

        if (game) {
            return ctx.json(game, 200);
        } else {
            return ctx.string('no games found', 404);
        }
    } catch (err) {
        console.log(err);
        return ctx.string('something went wrong', 500);
    }
}

export const getGames = async (ctx: Context) => {
    try {
        const URI = `${BASE_URI}/find`;
        const query = {
            collection: COLLECTION,
            database: DATABASE,
            dataSource: DATA_SOURCE,
        };
        options.body = JSON.stringify(query);
        const dataResponse = await fetch(URI, options);
        const games = await dataResponse.json();
        console.log(games);

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