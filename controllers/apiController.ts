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

export const fetchGame = async (id: String) => {
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

        if (game.document !== null) {
            return game
        } else {
            return
        }
    } catch (err) {
        return;
    }
}

export const fetchGames = async () => {
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

        if (games.documents !== null) {
            return games
        } else {
            return
        }
    } catch (err) {
        return
    }
}