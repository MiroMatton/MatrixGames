# MatrixGames server

Gemakelijkere manier om verschillende esp32-I2S games te spelen om uw 64x32 matrix bord

> gemaakt met svelte, deno en mongodb
> ![screenshot of the D3 dashboard index page](https://res.cloudinary.com/dt3xaog16/image/upload/v1655142319/MatrixGames/snake_wexwgq.jpg)

- Git repro voor MatrixGames deno server.
- draai lokaal en host of te wel lokaal of gebruik online site (url: https://2022-wta-matrixgames.vercel). 

## Clonen git repo

- Clone de repo, door in je terminal dit commando uit tevoeren.

```shell
git clone https://gitlab.com/2122-wta-miromatton/matrixgames-server.git
```

# requirements

- deno globaal geinstaleerd
- .env aanmaken met apiKey + apiId (aanvragen aan mij)

# run

```shell
deno run --allow-net --allow-run --allow-read  app.ts
```
