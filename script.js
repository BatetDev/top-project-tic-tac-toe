/* PROJECT TIC TAC TOE */

// Gameboard Module
const GameBoard = (function () {
  // Create a 3x3 1d board and fill it with ""
  const board = Array(9).fill("");

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
    placeMarker(position, marker) {
      if (
        position >= 0 &&
        position <= board.length - 1 &&
        board[position] === ""
      ) {
        board[position] = marker;
        return true;
      } else {
        return false;
      }
    },
  };
})();

// Tests
GameBoard.placeMarker(4, "X");
GameBoard.printBoard();
