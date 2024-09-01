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
        return 1;
      }
    }

    //condition for tie
    if (turnCount > 8) {
      isGameOver = true;
      return 0;
    }
    return -1;
  };

  const endGame = (n) => {
    // alert("The game is over, do you want to play again?");
    const message = document.querySelector("#message");
    if (n === 1) {
      message.textContent = `GAME IS OVER.  ${activePlayer.name} WON with the ${activePlayer.marker}`;
    } else if (n === 0) {
      message.textContent = `GAME IS OVER. TIE `;
    }
    const btn = document.createElement("button");
    btn.textContent = "Reset";
    message.appendChild(btn);
    btn.addEventListener("click", () => {
      turnCount = 0;
      isGameOver = false;
      gameController.switchPlayers();
      Gameboard.resetBoard();
      screenController.displayBoard();
      message.textContent = "";
      btn.remove();
      removeElementsByClass("X-container");
    });
  };

  return { makeMove, checkWin, switchPlayers, resetGame, endGame };
})();

const screenController = (() => {
  const box = document.getElementsByClassName("box");

  const displayBoard = () => {
    for (let i = 0; i < 3; i++) {
      if (Gameboard.getBoard()[0][i] === "X") {
        const X = document.createElement("div");
        const X1 = document.createElement("div");
        const X2 = document.createElement("div");
        X.classList.add("X-container");
        X1.classList.add("X1");
        X2.classList.add("X2");
        X.appendChild(X1);
        X.appendChild(X2);
        box[i].appendChild(X);
      } else if (Gameboard.getBoard()[0][i] === "O") {
        const O = document.createElement("div");
        O.classList.add("O-container");
        box[i].appendChild(O);
      }
    }
    for (let i = 3; i < 6; i++) {
      if (Gameboard.getBoard()[1][i - 3] === "X") {
        const X = document.createElement("div");
        const X1 = document.createElement("div");
        const X2 = document.createElement("div");
        X.classList.add("X-container");
        X1.classList.add("X1");
        X2.classList.add("X2");
        X.appendChild(X1);
        X.appendChild(X2);
        box[i].appendChild(X);
      } else if (Gameboard.getBoard()[1][i - 3] === "O") {
        const O = document.createElement("div");
        O.classList.add("O-container");
        box[i].appendChild(O);
      }
    }
    for (let i = 6; i < 9; i++) {
      if (Gameboard.getBoard()[2][i - 6] === "X") {
        const X = document.createElement("div");
        const X1 = document.createElement("div");
        const X2 = document.createElement("div");
        X.classList.add("X-container");
        X1.classList.add("X1");
        X2.classList.add("X2");
        X.appendChild(X1);
        X.appendChild(X2);
        box[i].appendChild(X);
      } else if (Gameboard.getBoard()[2][i - 6] === "O") {
        const O = document.createElement("div");
        O.classList.add("O-container");
        box[i].appendChild(O);
      }
    }

    return;
  };

  const clickHandler = () => {
    for (let i = 0; i < 3; i++) {
      box[i].addEventListener("click", (e) => {
        if (gameController.checkWin() === -1) {
          playRound(0, i);
        }
      });
    }

    for (let i = 3; i < 6; i++) {
      box[i].addEventListener("click", (e) => {
        if (gameController.checkWin() === -1) {
          playRound(1, i - 3);
        }
      });
    }
    for (let i = 6; i < 9; i++) {
      box[i].addEventListener("click", (e) => {
        if (gameController.checkWin() === -1) {
          playRound(2, i - 6);
        }
      });
    }

    return;
  };

  return { displayBoard, clickHandler };
})();

screenController.clickHandler();

const playRound = (row, index) => {
  if (gameController.makeMove(row, index)) {
    screenController.displayBoard();
    if (gameController.checkWin() === 1) {
      gameController.endGame(1);
    } else if (gameController.checkWin() === 0) {
      gameController.endGame(0);
    } else {
      gameController.switchPlayers();
    }
  } else {
    return;
  }
};
