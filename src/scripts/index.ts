import { games } from "../games/games";

const list = document.querySelector("div")!;

games.forEach((game) => {
    const link = document.createElement("a");
    link.href = `/choices.html?game=${game.slug}`;
    link.textContent = game.title;
    const div = document.createElement("div");
    div.appendChild(link)
    div.classList.add("cell");
    list.appendChild(div);
})