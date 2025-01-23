/* PROJECT TIC TAC TOE */

// Gameboard Module
const GameBoard = (function () {
  // Create a 3x3 1d board and fill it with ""
  const board = Array(9).fill("");
  // Simulate moves
  board[0] = "O";
  board[4] = "X";

  // Public API
  return {
    // Helper function to visualize board in console
    printBoard() {
      console.log(`
        ${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}
        ---------
        ${board[3] || " "} | ${board[4] || " "} | ${board[5] || " "}
        ---------
        ${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}
        `);
    },
    getBoard() {
      return [...board]; // Return a copy of the board
    },
  };
})();

// Tests
GameBoard.printBoard();
