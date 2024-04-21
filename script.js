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

    // game starter
    const startRestartBtn = document.querySelector(".restart");

    let playersRegistered = false;

    startRestartBtn.addEventListener('click', () => {

        if (playersRegistered) {

            Gameboard.resetGameboard();

        } else if (!playersRegistered) {

            registerOverlay.style.visibility = 'visible';

        }

    })


    // Register players
    const registerOverlay = document.querySelector(".overlay-cont");
    const registerForm = document.querySelector(".register-players-form");

    registerForm.addEventListener('submit', (event) => {

        event.preventDefault();
        playersRegistered = true;
        Gameboard.resetGameboard();

        register();

        registerOverlay.style.visibility = "hidden";
        // registerForm.reset();
    })

    registerOverlay.addEventListener('click', function(e) {

        if (e.target === registerOverlay) {

            registerOverlay.style.visibility = "hidden";

        }

    });


// Register

    let teamPlayers;
    let currentPlayerIndex = 0;

    const player1 = document.querySelector(".player1-name");
    const player2 = document.querySelector(".player2-name");

    const register = () => {

        const player1name = document.querySelector("#player1-name").value;
        const player2name = document.querySelector("#player2-name").value;

        player1.textContent = player1name;
        player2.textContent = player2name;

        teamPlayers = [Player(player1name, "O"), Player(player2name, "X")];

    }


    // handles click event for each play
    const play = (e) => {

        let index = e.target.id;
        Gameboard.update(index, teamPlayers[currentPlayerIndex].sign);
        switchTurns();

    }

    // function to change turns of players
    const switchTurns = () => {

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    }

    const announceText = document.querySelector(".anouncement");
    const announceWinner = () => {

        announceText.innerHTML = `<span class="blue-span">&lt;</span> Your Winner is ${teamPlayers[currentPlayerIndex].name} <span class="blue-span">/&gt;</span>`;

    };

    const announceTie = () => {

        announceText.innerHTML = `<span class="blue-span">&lt;</span> Chei! It's a Tie! <span class="blue-span">/&gt;</span>`;

    };

    const resetCurrentPlayer = () => {

        currentPlayerIndex = 0;

    }

    const resetAnouncement = () => {

        announceText.innerHTML = "";

    }

    return {
        play, switchTurns, announceWinner, announceTie, resetCurrentPlayer, resetAnouncement, register,
    }

})();