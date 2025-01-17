"use strict";

/* PROJECT TIC TAC TOE */

const gameboard = {
  board: ["", "", "", "", "", "", "", "", ""],
};

const player = (name, mark) => {
  return { name, mark };
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

const game = {
  currentPlayer: player1,
  changePlayer() {
    this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
  },
};
