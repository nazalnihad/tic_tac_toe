const createPlayer = (name, marker) => {
    return { name, marker };
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let win = false;

    const winPatterns = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];
    
    const checkWinner = (marker) => {
        for (const pattern of winPatterns) {
            if (board[pattern[0] - 1] === marker &&
                board[pattern[1] - 1] === marker &&
                board[pattern[2] - 1] === marker) {
                return true;
            }
        }
        return false;
    }

    const isFull = () => { return (board.every((cell) => cell !== "")) };
    const cellState = (position) => { return (board[position - 1] === ""); }

    const play = (position, marker) => {
        if (isFull()) {
            alert("board full");
            return;
        }
        else if(board[position-1] === ""){
            board[position-1] = marker;
        }
    }

    const reset = () => {
        for (let i = 0; i < 9; i++){
            board[i] = "";
        }
    }
    return {board,checkWinner,isFull,play,reset,cellState}
})();

const startPlaying = () => {
    const name1 = document.getElementById("p1");
    const name2 = document.getElementById("p2");
    const cells = document.querySelectorAll(".cell");

    const player1 = createPlayer("p1", "X")
    const player2 = createPlayer("p2", "O")
    let win = false;
    
    let currentPlayer = Math.random() < 0.5 ? player1 : player2;
    gameBoard.checkWinner(currentPlayer.marker);


    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const box = cell.getAttribute("data-value");
        
            if (!gameBoard.isFull() && gameBoard.cellState(box) && win===false) {
                cell.textContent = currentPlayer.marker;
                gameBoard.play(box, currentPlayer.marker);
                console.log(gameBoard.board);
    
                if (gameBoard.checkWinner(currentPlayer.marker)) {
                    win = true;
                    alert(`${currentPlayer.name} wins`);
                    // gameBoard.reset(); // Reset the game board after a win
                } else if (gameBoard.isFull()) {
                    alert("It's a draw");
                    // gameBoard.reset(); // Reset the game board after a draw
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                }
            }
        });
    });
    
};

startPlaying();
