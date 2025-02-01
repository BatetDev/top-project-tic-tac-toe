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
  // Reference to the GameBoard module for board-related operations
  const gameBoard = GameBoard;

  // Array of player objects (Player 1 and Player 2)
  const players = [player1, player2];

  // Tracks the active player (starts with Player 1)
  let currentPlayer = players[0];

  // Public API
  return {
    // Initialize a new game by resetting the board and setting the starting player
    startNewGame() {
      gameBoard.reset(); // Clear the board
      currentPlayer = players[0]; // Set the starting player
      console.log(`New game started! Current player: ${currentPlayer.name}`);
    },

    // Handle a player's turn by placing a marker and checking for win/tie conditions
    playTurn(position) {
      // Place the current player's marker at the specified position
      if (gameBoard.placeMarker(position, currentPlayer.marker)) {
        gameBoard.printBoard(); // Visualize the updated board

        // Check for a win
        const winner = gameBoard.checkWin();
        if (winner !== null) {
          return `Game ends! ${currentPlayer.name} wins!`; // Announce the winner
        }

        // Check for a tie
        if (gameBoard.isFull()) {
          return "Game ends! It's a tie!"; // Announce a tie
        }

        // Switch to the other player
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        return `Next player: ${currentPlayer.name}`; // Announce the next player
      } else {
        console.log("Invalid move! Try again."); // Handle invalid moves
      }
    },
    // Expose currentPlayer
    getCurrentPlayer() {
      return currentPlayer;
    },
  };
})();

// DisplayController Module
// Handles all DOM interactions and rendering logic
const DisplayController = (function () {
  // Cache DOM elements
  const cells = document.querySelectorAll(".cell");
  const messageArea = document.querySelector(".message-area");

  // Public API
  return {
    // Comment placeholder
    renderBoard() {
      // Get the current state of the game board
      const board = GameBoard.getBoard();

      // Loop through each cell and update its content for each cell in cells
      cells.forEach((cell) => {
        // Get the cell's index from its data attribute
        const index = Number(cell.dataset.index);

        // Get the marker from the board array
        const marker = board[index];

        // Update the cell's text content
        cell.textContent = marker;
      });

      // Update the message area
      if (GameBoard.checkWin()) {
        messageArea.textContent = `${currentPlayer.name} wins!`;
      } else if (GameBoard.isFull()) {
        messageArea.textContent = "It's a tie!";
      } else {
        messageArea.textContent = `${currentPlayer.name}'s turn`;
      }
    },
  };
})();

// Tests
GameBoard.printBoard();
