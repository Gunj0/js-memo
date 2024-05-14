const EMPTY = 0;
const DARK = 1;
const LIGHT = 2;

const boardElement = document.getElementById("board");
const nextDiscMessageElement = document.getElementById("next-disc-message");

async function showBoard(turnCount) {
  const response = await fetch(`/api/games/latest/turns/${turnCount}`);
  const responseBody = await response.json();
  const board = responseBody.board;
  const nextDisc = responseBody.nextDisc;

  showNextDiscMessage(nextDisc);

  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }

  board.forEach((line, y) => {
    line.forEach((square, x) => {
      const squareElement = document.createElement("div");
      squareElement.className = "square";

      if (square !== EMPTY) {
        const stoneElement = document.createElement("div");
        const color = square === DARK ? "dark" : "light";
        stoneElement.className = `stone ${color}`;
        squareElement.appendChild(stoneElement);
      } else {
        squareElement.addEventListener("click", async () => {
          const nextTurnCount = turnCount + 1;
          const registerTurnResponse = await registerTurn(
            nextTurnCount,
            nextDisc,
            x,
            y
          );
          if (registerTurnResponse.ok) {
            await showBoard(nextTurnCount);
          }
        });
      }

      boardElement.appendChild(squareElement);
    });
  });
}

function showNextDiscMessage(nextDisc) {
  if (nextDisc) {
    const color = nextDisc === DARK ? "黒⚫️" : "白⚪️";
    nextDiscMessageElement.innerText = `次は${color}の番です`;
  } else {
    nextDiscMessageElement.innerHTML = "";
  }
}

async function registerGame() {
  await fetch("/api/games", {
    method: "POST",
  });
}

async function registerTurn(turnCount, disc, x, y) {
  const requestBody = {
    turnCount,
    move: {
      disc,
      x,
      y,
    },
  };

  return await fetch("/api/games/latest/turns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
}

async function main() {
  await registerGame();
  await showBoard(0);
}

main();
