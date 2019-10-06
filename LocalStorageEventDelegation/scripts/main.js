// form for adding games
const addGameForm = document.querySelector(".add-items");

// Container for list of games
const gameList = document.querySelector(".list");

// List of saved games
const games = JSON.parse(localStorage.getItem("games")) || [];

addGameForm.addEventListener("submit", addGame);
gameList.addEventListener("click", toggleGameComplete);

function addGame(e) {
  e.preventDefault();
  const newGame = {
    name: this.querySelector("[name=game]").value,
    complete: false
  };
  games.push(newGame);
  this.reset();
  populateList(games, gameList);
  localStorage.setItem("games", JSON.stringify(games));
}

function populateList(games = [], gameList) {
  gameList.innerHTML = games
    .map((game, i) => {
      return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${
        game.complete ? "checked" : ""
      }>
                <label for="item${i}">${game.name}</label>
            </li>
            `;
    })
    .join("");
}

function toggleGameComplete(e) {
  if (e.target.matches("input")) {
    games[e.target.dataset.index].complete = !games[e.target.dataset.index]
      .complete;
    localStorage.setItem("games", JSON.stringify(games));
  }
}

window.onload = () => {
  populateList(games, gameList);
};
