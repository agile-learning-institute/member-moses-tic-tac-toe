// game board factory function
const Gameboard = (() => {

    let gameBoard = ["", "", "", "", "", "", "", "", ""];


    // resetting the same board grid
    const resetGameboard = () =>{

        GameController.resetCurrentPlayer();
        GameController.resetAnouncement();
        gameBoard = ["", "", "", "", "", "", "", "", ""];

        boardCells.forEach((cell) => {
                cell.classList.remove('clicked');
            });

        renderBoard();
    };

    // Add event listeners to board cells
    const boardCells = document.querySelectorAll(".board-cell");

    boardCells.forEach((cell) => {

        cell.addEventListener('click', (e) => {

            GameController.play(e);
            cell.classList.add('clicked');

        });

    })



    // updates gameboard after each play or click
    const update = (index, value) => {

        gameBoard[index] = value;

        renderBoard();

        checkWin();

    }

    // displays board on UI
    const renderBoard = () => {

        boardCells.forEach((cell, index) => {

            cell.textContent = gameBoard[index];

        });

    };

    // checks for wins (not working yet)
    const checkWin = () => {

        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

        for (let i = 0; i <= 7; i++) {

            let a = gameBoard[winCombinations[i][0]];
            let b = gameBoard[winCombinations[i][1]];
            let c = gameBoard[winCombinations[i][2]];
            

            if (a === b && b === c && a !== "") {
                
                GameController.announceWinner();

                boardCells.forEach((cell) => {
                        cell.classList.add('clicked');
                }) 

                return;
              } 
              
              if (!gameBoard.includes("")) {

                GameController.announceTie();

            }

          }

    };


    return {
        resetGameboard, update, renderBoard, checkWin,
    }

})();


// player creation factory function
const Player = (name, sign) => {

    return {
        name, sign,
    }

};


// game flow controller factory function
const GameController =(() => {


})();