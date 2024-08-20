const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(" ");
    }
  }

  const getBoard = () => board;

  const addMarker = (row, column, marker) => {
    board[row][column] = marker;
  };

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(" ");
      }
    }
  };

  return { getBoard, addMarker, resetBoard };
})();

const player = (name, marker) => {
  return { name, marker };
};

const gameController = (() => {
  const player1 = player("player1", "X");
  const player2 = player("player2", "O");
  let activePlayer = player1;
  let isGameOver = false;
  let turnCount = 0;

  const switchPlayers = () => {
    activePlayer = activePlayer === player2 ? player1 : player2;
    return activePlayer;
  };

  const resetGame = () => {
    turnCount = 0;
    isGameOver = false;
    Gameboard.resetBoard();
    return;
  };

  //check if game is not over
  //check if space is available
  const makeMove = (row, column) => {
    if (Gameboard.getBoard()[row][column] === " ") {
      Gameboard.addMarker(row, column, activePlayer.marker);
      turnCount++;
      return true;
    } else {
      console.log("choose another");
      return false;
    }
  };

  const checkWin = () => {
    //Conditions for winning
    for (let i = 0; i < 3; i++) {
      if (
        (Gameboard.getBoard()[i][0] !== " " &&
          Gameboard.getBoard()[i][0] === Gameboard.getBoard()[i][1] &&
          Gameboard.getBoard()[i][0] === Gameboard.getBoard()[i][2]) ||
        (Gameboard.getBoard()[0][i] !== " " &&
          Gameboard.getBoard()[0][i] === Gameboard.getBoard()[1][i] &&
          Gameboard.getBoard()[0][i] === Gameboard.getBoard()[2][i]) ||
        (Gameboard.getBoard()[0][0] !== " " &&
          Gameboard.getBoard()[0][0] === Gameboard.getBoard()[1][1] &&
          Gameboard.getBoard()[0][0] === Gameboard.getBoard()[2][2]) ||
        (Gameboard.getBoard()[0][2] !== " " &&
          Gameboard.getBoard()[0][2] === Gameboard.getBoard()[1][1] &&
          Gameboard.getBoard()[0][2] === Gameboard.getBoard()[2][0])
      ) {
        isGameOver = true;
        return (
          "Game Over " + activePlayer.name + " wins with " + activePlayer.marker
        );
      }
    }

    // //condition for tie
    if (turnCount > 8) {
      isGameOver = true;
      return "Tie";
    }
    switchPlayers();
    return activePlayer;
  };

  return { makeMove, checkWin, switchPlayers, resetGame };
})();

const displayBoard = () => {
  const box = document.getElementsByClassName("box");

  for (let i = 0; i < 3; i++) {
    box[i].textContent = Gameboard.getBoard()[0][i];
  }
  for (let i = 3; i < 6; i++) {
    box[i].textContent = Gameboard.getBoard()[1][i - 3];
  }
  for (let i = 6; i < 9; i++) {
    box[i].textContent = Gameboard.getBoard()[2][i - 6];
  }

  return;
};

const DOM = () => {
  const box = document.getElementsByClassName("box");

  for (let i = 0; i < 3; i++) {
    box[i].addEventListener("click", (e) => {
      if (gameController.makeMove(0, i)) {
        console.log(gameController.checkWin());
      }
      displayBoard();
    });
  }

  for (let i = 3; i < 6; i++) {
    box[i].addEventListener("click", (e) => {
      if (gameController.makeMove(1, i - 3)) {
        console.log(gameController.checkWin());
      }
      displayBoard();
    });
  }
  for (let i = 6; i < 9; i++) {
    box[i].addEventListener("click", (e) => {
      if (gameController.makeMove(2, i - 6)) {
        console.log(gameController.checkWin());
      }
      displayBoard();
    });
  }

  return;
};

DOM();
