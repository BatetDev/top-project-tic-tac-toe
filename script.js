/* PROJECT TIC TAC TOE */

// Gameboard Module
// Manages the state of the Tic Tac Toe board and provides methods
// to interact with it (e.g., placing markers, checking for wins, etc.).
const GameBoard = (function () {
  // Create a 3x3 1d board and fill it with ""
  let board = Array(9).fill("");

  // All possible winning combinations (rows, columns, diagonals)
  // Each sub-array contains the indices of the board array that form a winning line.
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

    // Return a copy of the board
    getBoard() {
      return [...board];
    },

    // Place a marker (X or O) at the specified position if it's valid.
    // Returns true if the marker was successfully placed, false otherwise.
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

    // Reset the board to its initial state (all cells empty).
    reset() {
      board = Array(9).fill("");
    },

    // Check if there's a winning combination on the board.
    // Returns the winning marker (X or O) if found, otherwise null.
    checkWin() {
      for (let combination of winningCombinations) {
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        const marker1 = board[a];
        const marker2 = board[b];
        const marker3 = board[c];

        if (marker1 === marker2 && marker2 === marker3 && marker1 !== "") {
          return marker1;
        }
      }
      return null;
    },

    // Check if the board is full (no empty cells remaining).
    // Returns true if the board is full, otherwise false.
    isFull() {
      return board.every((cell) => cell !== "");
    },
  };
})();

// Player factory module
// Creates and returns a player object with a name and marker.
const Player = (name, marker) => ({ name, marker });

// Create two players: Player 1 (X) and Player 2 (O)
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

// GameController module
// Manages the flow of the game, including player turns, win/tie detection
// and interactions with the GameBoard and Player objects.
const GameController = (function () {
  const gameBoard = GameBoard; // Reference to the GameBoard module

  const players = [player1, player2]; // Array of player objects
  let currentPlayer = player1; // Tracks the active player

  // Public API
  return {
    // Temporary method for testing
    logVariables() {
      console.log("GameBoard:", gameBoard);
      console.log("Players:", players);
      console.log("Current Player:", currentPlayer);
    },
  };
})();

// Tests
GameBoard.printBoard();
GameController.logVariables();

/* TODO

1Create Player Factory:
Generate player objects with names and markers (X or O).

2Build GameController: Manage turns, switch players, and handle win/tie conditions.

3Integrate checkWin and isFull:

*/
