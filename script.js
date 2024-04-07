// game board factory function
const Gameboard = (() => {

    const gameBoard = [["", "", ""],["", "", ""],["", "", ""]];

    // resetting the same board grid
    const resetGameboard = () =>{

        gameBoard.length = 0;

    };

})();


// player creation factory function
const Player = (name, sign) => {

    return {
        name, sign,
    }

};


// game flow controller factory function
const GameController = () => {

}