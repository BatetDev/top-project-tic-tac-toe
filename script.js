/* PROJECT TIC TAC TOE */

// Initialize Lucide
lucide.createIcons();

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
          return [a, b, c];
        }
      }
      return null; // No winning combination found
    },

    // Check if the board is full (no empty cells remaining).
    // Returns true if the board is full, otherwise false.
    isFull() {
      return board.every((cell) => cell !== "");
    },
  };
})();

// Player factory moduleccc
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

  // Tracks whether the game is running
  let gameStarted = false;

  // Tracks whether the game is still ongoing or over
  let gameOver = false;

  // Store the winning combination
  let winningCombination = null;

  // Public API
  return {
    // Initialize a new game by resetting the board and setting the starting player
    startNewGame() {
      gameBoard.reset(); // Clear the board
      gameStarted = true; // Set gameStarted to true
      gameOver = false; // Reset gameOver flag
      currentPlayer = players[0]; // Set the starting player
      winningCombination = null; // Reset winning combination
    },

    // Handle a player's turn by placing a marker and checking for win/tie conditions
    playTurn(position) {
      // Check if the game is over
      if (gameOver) {
        return false; // Ignore the move
      }

      // Place the current player's marker at the specified position
      if (gameBoard.placeMarker(position, currentPlayer.marker)) {
        // Get the winning combination
        winningCombination = gameBoard.checkWin(); // Get the winning combination

        // Check for a win
        if (winningCombination !== null) {
          gameOver = true;
          return true; // Valid move, game ends
        }

        // Check for a tie
        if (gameBoard.isFull()) {
          gameOver = true; // Set gameOver to true
          return true; // Valid move, game ends
        }

        // Switch to the other player
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        return true; // Valid move, game continues
      } else {
        return false; // Invalid move
      }
    },
    // Expose currentPlayer
    getCurrentPlayer() {
      return currentPlayer;
    },
    // Expose gameOver
    getGameOver() {
      return gameOver;
    },

    getGameStarted() {
      return gameStarted; // Expose gameStarted flag
    },

    // Expose the winning combination
    getWinningCombination() {
      return winningCombination;
    },
  };
})();

// DisplayController Module
// Handles all DOM interactions and rendering logic
const DisplayController = (function () {
  // Cache DOM elements
  const cells = document.querySelectorAll(".cell");
  const messageArea = document.querySelector(".message-area");
  const startRestartButton = document.querySelector("#start-restart-button");
  const editIcons = document.querySelectorAll(".edit-icon");

  // Private helper function to update button text
  function updateButtonText() {
    if (!GameController.getGameStarted() || GameController.getGameOver()) {
      startRestartButton.textContent = "Start Game";
    } else {
      startRestartButton.textContent = "Restart Game";
    }
  }

  // Initialize event listeners for DOM interactions
  function initializeEventListeners() {
    // Add click event listener to Start/Restart button
    startRestartButton.addEventListener("click", () => {
      GameController.startNewGame(); // Reset the game state
      DisplayController.renderBoard(); // Re-render the board
      updateButtonText(); // Update the button text
    });

    editIcons.forEach((editIcon, index) => {
      editIcon.addEventListener("click", () => {
        const player = index === 0 ? player1 : player2; // Determine which player is being edited
        const newName = prompt(`Enter ${player.name}'s new name:`, player.name); // Show prompt
        if (newName) {
          player.name = newName; // Update player name
          document.querySelector(`#player${index + 1}-name`).textContent =
            newName; // Update DOM
        }
      });
    });

    // Add click event listener to cells
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        // Check if the game is over
        if (GameController.getGameOver()) {
          return; // Do nothing if the game is over
        }

        const index = Number(cell.dataset.index); // Get the clicked cell's index
        const isValidMove = GameController.playTurn(index); // Call playTurn and check if the move was valid

        if (!isValidMove) {
          // Handle invalid move
          messageArea.textContent = "Invalid move! Try again.";
        } else {
          // Re-render the board and update the message area
          DisplayController.renderBoard();
          updateButtonText();
        }
      });
    });
  }

  // Call initializeEventListeners() before returning the public API
  initializeEventListeners();

  // Render initial player names into the DOM
  document.querySelector("#player1-name").textContent = player1.name;
  document.querySelector("#player2-name").textContent = player2.name;

  // Public API
  return {
    // Renders the current state of the game board to the DOM.
    // Updates cell contents and the message area based on the game state.
    renderBoard() {
      // Get the current state of the game board
      const board = GameBoard.getBoard();

      // Get the current player
      const currentPlayer = GameController.getCurrentPlayer();

      // Get game state
      const gameOver = GameController.getGameOver();

      // Get the winning combination
      const winningCombination = GameController.getWinningCombination();

      // Loop through each cell and update its content
      cells.forEach((cell) => {
        const index = Number(cell.dataset.index);
        const marker = board[index];
        cell.textContent = marker;

        // Disable the cells if the game is over
        if (gameOver) {
          cell.classList.add("disabled");
        } else {
          cell.classList.remove("disabled");
        }

        // Highlight the winning cells
        if (winningCombination && winningCombination.includes(index)) {
          cell.classList.add("winning-cell");
        } else {
          cell.classList.remove("winning-cell");
        }
      });

      // Update the message area based on the game state
      if (GameBoard.checkWin()) {
        messageArea.textContent = `${currentPlayer.name} ( ${currentPlayer.marker} ) wins!`;
      } else if (GameBoard.isFull()) {
        messageArea.textContent = "It's a tie!";
      } else {
        messageArea.textContent = `${currentPlayer.name}'s ( ${currentPlayer.marker} ) turn`;
      }
    },
  };
})();
