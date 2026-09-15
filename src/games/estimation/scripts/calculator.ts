interface Player {
    name: string;
    score: number;
}

let currentRound = 0;
let roundCount = 0;
let playerCount = 3;
let players: Player[] = [];

const SYMBOLE_ORDER = ['♦', '♠', '♥', '♣']

const playerCountInput = document.getElementById("player_count") as HTMLInputElement;
const validatePlayerCountBtn = document.getElementById("validate_player_count") as HTMLButtonElement;
const table = document.getElementById("table") as HTMLTableElement;
const divPlayerCount = document.getElementById("div_player_count") as HTMLDivElement;

const validatePlayerNameBtn = document.getElementById("validate_player_name") as HTMLButtonElement;

const validateGuessedTrickCount = document.getElementById("validate_guessed_trick_count") as HTMLButtonElement;
const validateTrickCount = document.getElementById("validate_trick_count") as HTMLButtonElement;

const errorDiv = document.getElementById("error") as HTMLDivElement;

const reset = document.getElementById("reset") as HTMLButtonElement;
const result = document.getElementById("result") as HTMLDivElement;

playerCountInput.addEventListener("change", () => {
    const playerCount = Number(playerCountInput.value);

    if (playerCount > 8) {
        playerCountInput.value = '8';
    } else if (playerCount < 3) {
        playerCountInput.value = '3';
    }
})

validatePlayerCountBtn.addEventListener("click", () => {
    playerCount = Number(playerCountInput.value);
    roundCount = Math.floor(52 / playerCount);

    const head = document.createElement("thead");
    head.appendChild(document.createElement("th"));

    for (let i = 0; i < playerCount; i++) {
        const th = document.createElement("th");
        th.id = `p-${i + 1}`;
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = `Joueur ${i + 1}`
        textInput.classList.add("player_name")
        th.appendChild(textInput);
        head.appendChild(th);
    }

    table.appendChild(head)

    for (let i = 0; i < roundCount; i++) {
        const tr = document.createElement("tr");
        tr.id = `r-${i + 1}`;

        const th = document.createElement("th");
        const cardCount = roundCount - i;
        th.textContent = `${cardCount} ${SYMBOLE_ORDER[i % 4]}`;
        tr.appendChild(th);
        for (let j = 0; j < playerCount; j++) {
            const td = document.createElement("td");

            const div = document.createElement("div") as HTMLDivElement;
            div.classList.add("cell");
            div.id = `c-${i + 1}-${j + 1}`;

            const guessedTrick = document.createElement("div") as HTMLDivElement;
            guessedTrick.id = "guessed_trick";
            const trickInput1 = document.createElement("input") as HTMLInputElement;
            trickInput1.type = "number";
            trickInput1.min = "0";
            trickInput1.max = cardCount.toString();
            trickInput1.value = "0";
            trickInput1.classList.add("hidden", "trick_input1");
            trickInput1.addEventListener("change", () => {
                const trickCount = Number(trickInput1.value);

                if (trickCount > cardCount) {
                    trickInput1.value = cardCount.toString();
                } else if (trickCount < 0) {
                    trickInput1.value = '0';
                }
            })
            guessedTrick.appendChild(trickInput1);
            div.appendChild(guessedTrick);

            const trick = document.createElement("div") as HTMLDivElement;
            trick.id = "trick";
            const trickInput2 = document.createElement("input") as HTMLInputElement;
            trickInput2.type = "number";
            trickInput2.min = "0";
            trickInput2.max = cardCount.toString();
            trickInput2.value = "0";
            trickInput2.classList.add("hidden", "trick_input2");
            trickInput2.addEventListener("change", () => {
                const trickCount = Number(trickInput2.value);

                if (trickCount > cardCount) {
                    trickInput2.value = cardCount.toString();
                } else if (trickCount < 0) {
                    trickInput2.value = '0';
                }
            })
            trick.appendChild(trickInput2);
            div.appendChild(trick);

            const points = document.createElement("div") as HTMLDivElement;
            points.id = "points";
            div.appendChild(points);

            td.appendChild(div);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    divPlayerCount.classList.add("hidden");
    validatePlayerNameBtn.classList.remove("hidden");

    const inputs = document.querySelectorAll("input") as NodeListOf<HTMLInputElement>;

    inputs.forEach(e => {
        if (!e.classList.contains("player_name")) {
            return;
        }
        e.addEventListener("change", () => {
            e.style.width = e.value.length + 1 + 'ch';
        })
    })
});

validatePlayerNameBtn.addEventListener("click", () => {
    for (let i = 1; i < playerCount + 1; i++) {
        const playerCell = document.getElementById(`p-${i}`) as HTMLInputElement;
        const textInput = playerCell.querySelector("input") as HTMLInputElement;
        playerCell.textContent = textInput.value;
        players.push({
            name: textInput.value,
            score: 0
        })
        textInput.classList.add("hidden");
    }

    validatePlayerNameBtn.classList.add("hidden");
    currentRound++;
    const currentRow = table.querySelector(`#r-${currentRound}`) as HTMLTableRowElement;
    const trickInputs = currentRow.getElementsByClassName("trick_input1");
    const count = trickInputs.length;
    for (let i = 0; i < count; i++) {
        const trickInput = trickInputs[i] as HTMLInputElement;
        trickInput.classList.remove("hidden");
    }

    validateGuessedTrickCount.classList.remove("hidden");
    result.classList.remove("hidden");
    showResult();
})

validateGuessedTrickCount.addEventListener("click", () => {
    let count = 0;
    for (let i = 1; i < playerCount + 1; i++) {
        const Cell = document.getElementById(`c-${currentRound}-${i}`) as HTMLTableCellElement;
        const trickInput1 = Cell.querySelector(".trick_input1") as HTMLInputElement;
        count += parseInt(trickInput1.value, 10);
    }

    if (count == roundCount - currentRound + 1) {
        errorDiv.classList.remove("hidden");
        errorDiv.innerText = "Le total de plis estimés ne doit pas être égal au nombre de plis du tour."
        return;
    }

    errorDiv.classList.add("hidden");

    for (let i = 1; i < playerCount + 1; i++) {
        const Cell = document.getElementById(`c-${currentRound}-${i}`) as HTMLTableCellElement;
        const trickInput1 = Cell.querySelector(".trick_input1") as HTMLInputElement;
        Cell.children[0].textContent = trickInput1.value;

        const trickInput2 = Cell.querySelector(".trick_input2") as HTMLInputElement;
        trickInput2.classList.remove("hidden");
    }

    validateGuessedTrickCount.classList.add("hidden");
    validateTrickCount.classList.remove("hidden");
})

validateTrickCount.addEventListener("click", () => {
    let count = 0;
    for (let i = 1; i < playerCount + 1; i++) {
        const Cell = document.getElementById(`c-${currentRound}-${i}`) as HTMLTableCellElement;
        const trickInput1 = Cell.querySelector(".trick_input2") as HTMLInputElement;
        count += parseInt(trickInput1.value, 10);
    }

    if (count != roundCount - currentRound + 1) {
        errorDiv.classList.remove("hidden");
        errorDiv.innerText = "Le total de plis doit être égal au nombre de plis du tour."
        return;
    }

    validateTrickCount.classList.add("hidden");
    for (let i = 1; i < playerCount + 1; i++) {
        const Cell = document.getElementById(`c-${currentRound}-${i}`) as HTMLTableCellElement;

        const trickInput2 = Cell.querySelector(".trick_input2") as HTMLInputElement;
        const trickCount = Number(trickInput2.value);
        Cell.children[1].textContent = trickInput2.value;

        if (trickCount == Number(Cell.children[0].textContent)) {
            players[i - 1].score += trickCount + 10;
            Cell.children[2].textContent = `${trickCount + 10}`;
        } else {
            players[i - 1].score += trickCount;
            Cell.children[2].textContent = trickCount.toString();
        }
    }
    if (currentRound != roundCount) {
        currentRound++;
        for (let i = 1; i < playerCount + 1; i++) {
            const Cell = document.getElementById(`c-${currentRound}-${i}`) as HTMLTableCellElement;

            const trickInput = Cell.querySelector(".trick_input1") as HTMLInputElement;
            trickInput.classList.remove("hidden");
        }
        validateGuessedTrickCount.classList.remove("hidden");
    } else {
        reset.classList.remove("hidden");
    }
    showResult();
})

reset.addEventListener("click", () => {
    table.innerHTML = "";
    reset.classList.add("hidden");
    result.classList.add("hidden");
    divPlayerCount.classList.remove("hidden");
    currentRound = 0;
    players = [];
})

function showResult(): void {
    result.innerHTML = "";
    let players2 = players;
    players2.sort((a, b) => {
        return b.score - a.score;
    })
    for (let i = 0; i < players2.length; i++) {
        const p = document.createElement("p") as HTMLParagraphElement;
        p.textContent = `${i + 1} - ${players2[i].name} | ${players2[i].score}`
        result.appendChild(p);
    }
}