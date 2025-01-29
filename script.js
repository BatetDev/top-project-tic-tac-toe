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
    // Check for winner
    checkWin() {
      for (let combination of winningCombinations) {
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        const marker1 = board[a];
        const marker2 = board[b];
        const marker3 = board[c];

        // Check for 3 equal markers
        if (marker1 === marker2 && marker2 === marker3 && marker1 !== "") {
          return marker1; // Return winning marker
        }
      }
      return null; // No winner found after checking all combinations
    },
    isFull() {
      return board.every((cell) => cell !== "");
    },
  };
})();

// Tests
GameBoard.printBoard();

/* TODO

1Create Player Factory:
Generate player objects with names and markers (X or O).

2Build GameController: Manage turns, switch players, and handle win/tie conditions.

3Integrate checkWin and isFull:

*/
