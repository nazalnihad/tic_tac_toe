const createPlayer = (name, marker) => {
    return { name, marker };
}

const gameBoard = (() => {
    let board = ["","","","","","","","",""];

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
    
    let currentPlayer = Math.random() < 0.5 ? player1 : player2;


    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const box = cell.getAttribute("data-value"); // Corrected from "box" to "data-value"
    
            if (!gameBoard.isFull() && gameBoard.cellState(box)) {
                cell.textContent = currentPlayer.marker;
                gameBoard.play(box, currentPlayer);
                console.log(gameBoard.board);
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
            if (gameBoard.checkWinner(currentPlayer.marker)) {
                alert(`${currentPlayer.name} wins`)
            }
            else if (gameBoard.isFull()) {
                alert("Its a draw");
            }
        });
    });
    
};

startPlaying();
