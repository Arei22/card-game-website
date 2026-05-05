import { GameModule, games } from "../games/games";

const params = new URLSearchParams(window.location.search);

const gameSlug = params.get("game");

const game = getGame(gameSlug);

const body = document.querySelector("body")!;

document.title = game.title;

if (game.rules) {
    const link = document.createElement("a");
    link.textContent = "Règles";
    link.href = "/games/" + game.slug + "/rules.html";
    const flex = document.createElement("div");
    flex.classList.add("flex");
    flex.appendChild(link);
    body.appendChild(flex);
}

if (game.calculator) {
    const link = document.createElement("a");
    link.textContent = "Calculateur";
    link.href = "/games/" + game.slug + "/calculator.html";
    const flex = document.createElement("div");
    flex.classList.add("flex");
    flex.appendChild(link);
    body.appendChild(flex);
}

function getGame(gameSlug: string | null): GameModule {
    const game = games.find((g) => g.slug === gameSlug);

    if (!game) {
        window.location.href = "/";
        throw new Error("Game not found");
    }

    return game;
}