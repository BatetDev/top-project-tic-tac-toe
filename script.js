/* PROJECT TIC TAC TOE */

// Gameboard Module
const GameBoard = (function () {
  // Create a 3x3 1d board and fill it with ""
  let board = Array(9).fill("");

  // Winning combinations
  const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

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
      // Validate the position is within bounds (0-8) and the cell is empty
      if (
        position >= 0 &&
        position <= board.length - 1 &&
        board[position] === ""
      ) {
        // Place the marker on the board
        board[position] = marker;
        return true; // Successfully placed the marker
      } else {
        return false; // Invalid move (out of bounds or cell occupied)
      }
    },
    // Reset board
    reset() {
      board = Array(9).fill("");
    },
  };
})();

// Tests
GameBoard.placeMarker(4, "X");
GameBoard.printBoard();

/* TODO

Day 3: Build checkWin (focus on 1-2 winning combinations first).

Day 4: Finish checkWin logic and test all 8 cases.

Day 5: Create Player factory. 
*/
