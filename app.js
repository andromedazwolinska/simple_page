const PLAYER1 = "fa-circle-o";
const PLAYER2 = "fa-times";
let round = 1;
const initialBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxes = [...document.querySelectorAll(".box")];
boxes.forEach((box) => box.addEventListener("click", pick));

function pick(event) {
  const { row, column } = event.target.dataset;
  const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
  if (board[row][column] !== "") return;
  event.target.classList.add(turn);
  board[row][column] = turn;
  round++;
  const winner = check();
  if (winner !== null) {
   win(winner);
  }
}

function check() {
  const result = board.reduce((total, row) => total.concat(row));
  let winner = null;
  let moves = {
    "fa-times": [],
    "fa-circle-o": [],
  };
  result.forEach((field, index) =>
    moves[field] ? moves[field].push(index) : null
  );
  combinations.forEach((combination) => {
    if (combination.every((index) => moves[PLAYER1].indexOf(index) > -1)) {
      winner = "Wygrał gracz 1 !!!";
    }
    if (combination.every((index) => moves[PLAYER2].indexOf(index) > -1)) {
      winner = "Wygrał gracz 2 !!!";
    }
  });

  return winner;
}

function win(winner) {
  alert(winner);
  boxes.forEach((box) => {
    if (box.classList.contains(PLAYER1))  box.classList.remove(PLAYER1);
    if (box.classList.contains(PLAYER2))  box.classList.remove(PLAYER2);
  });
  board = initialBoard;
  round = 1;
}
