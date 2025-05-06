const gamesTableBodyElement = document.getElementById("games-table-body");

async function showGames() {
  const response = await fetch("api/games");
  const responseBody = await response.json();
  const games = responseBody.games;

  while (gamesTableBodyElement.firstChild) {
    gamesTableBodyElement.removeChild(gamesTableBodyElement.firstChild);
  }

  games.forEach((game) => {
    const trElement = document.createElement("tr");

    const appendTdElement = (innerText) => {
      const tdElement = document.createElement("td");
      tdElement.innerText = innerText;
      trElement.appendChild(tdElement);
    };

    appendTdElement(game.darkMoveCount);
    appendTdElement(game.lightMoveCount);
    appendTdElement(game.winnerDisc);
    appendTdElement(game.startedAt);
    appendTdElement(game.endAt);

    gamesTableBodyElement.appendChild(trElement);
  });
}

showGames();
