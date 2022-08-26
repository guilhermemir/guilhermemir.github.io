const player1 = 1
const player2 = 2

let currentPlayer = player1
let playmat = []
let winner = false
let gameOver = false

// Who won the game?
const whoWon = () => {
  // lines
  if (playmat[0] === playmat[1] && playmat[1] === playmat[2] && playmat[0] !== 0) {
    return playmat[0];
  }
  if (playmat[3] === playmat[4] && playmat[4] === playmat[5] && playmat[3] !== 0) {
    return playmat[3];
  }
  if (playmat[6] === playmat[7] && playmat[7] === playmat[8] && playmat[6] !== 0) {
    return playmat[6];
  }
  // columns
  if (playmat[0] === playmat[3] && playmat[3] === playmat[6] && playmat[0] !== 0) {
    return playmat[0];
  }
  if (playmat[1] === playmat[4] && playmat[4] === playmat[7] && playmat[1] !== 0) {
    return playmat[1];
  }
  if (playmat[2] === playmat[5] && playmat[5] === playmat[8] && playmat[2] !== 0) {
    return playmat[2];
  }
  // diagonals
  if (playmat[0] === playmat[4] && playmat[4] === playmat[8] && playmat[0] !== 0) {
    return playmat[0];
  }
  if (playmat[2] === playmat[4] && playmat[4] === playmat[6] && playmat[2] !== 0) {
    return playmat[2];
  }

  return false;
}

// Play the current player's value on a cell, returns true if the cell was played on, false otherwise
const play = (position) => {
  if (!gameOver && playmat[position] === 0) {
    playmat[position] = currentPlayer; 
    return true
  }
  return false
}

const checkWinner = () => {
  winner = whoWon()
  if (winner) {
    gameOver = true
    document.getElementById("game-results").innerHTML = `Winner was ${playerName(winner)}`
  } else {
    document.getElementById("game-results").innerHTML = ``
  }
}

// Starts (or restarts) the game, setting all default new variables
const startGame = () => {
  gameOver = false
  playmat = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  currentPlayer = player1
  document.querySelectorAll('.game-cell').forEach((cell) => {
    cell.value = ""
  })
  updateTextMessages()
}

// Handles a player clicking on a cell to play on it
const handleCellClick = (event) => {
  const cellElement = event.target
  const cellIndex = parseInt(cellElement.getAttribute('data-cell-index'))

  if (play(cellIndex)) {
    cellElement.value = printCell(playmat[cellIndex])
    changePlayer()
    updateTextMessages()
  }
}

const updateTextMessages = () => {
  checkWinner()
  showCurrentPlayer()
}

// Change the player that is playing on this turn
const changePlayer = () => {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

// Show which player is the current turn
const showCurrentPlayer = () => {
  document.getElementById("game-turn").innerHTML = gameOver ? "" : `${playerName(currentPlayer)}'s turn`
}

// Returns the name of the given player
const playerName = (player) => {
  let name = document.getElementById(`player${player}-name`).value
  if (name === "") {
    name = `Player ${player}`
  }
  return name
}

// Returns "X" or "O" depending on the current player, to print on the button
const printCell = (value) => {
  if (value === 0) {
    return "";
  }
  return value === player1 ? "X" : "O";
}

window.addEventListener('DOMContentLoaded', (event) => {
  startGame()

  document.querySelectorAll('.game-cell').forEach(cell => { cell.addEventListener('click', handleCellClick) })
  document.querySelectorAll('.game-player-name').forEach(cell => { cell.addEventListener('input', updateTextMessages) })
  document.getElementById('game-restart').addEventListener('click', startGame)
})