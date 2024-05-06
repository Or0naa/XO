//make the next move on tic tac toe


export function computerMove(board) {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}


// הגדרת משתנים
const ai = "O"; // סימון של המחשב
const human = "X"; // סימון של השחקן

// פונקציה לחישוב המהלך הטוב ביותר עבור המחשב באמצעות Minimax
function minimax(board, depth, isMaximizing) {
    // פונקציה להערכת המצב הנוכחי של הלוח
    function evaluate(board) {
        // כאן יש להוסיף את הלוגיקה שלך להערכת המצב הנוכחי של הלוח
    }

    // פונקציה להחזרת הערך המינימלי בין שני ערכים
    function min(a, b) {
        return a < b ? a : b;
    }

    // פונקציה להחזרת הערך המקסימלי בין שני ערכים
    function max(a, b) {
        return a > b ? a : b;
    }

    // בדיקת תנאי סיום - אם המשחק הסתיים או הגיע לעומק המקסימלי
    let result = evaluate(board);
    if (result !== null || depth === 0) {
        return result;
    }

    // בדיקת מצב התור
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth - 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    board[i][j] = human;
                    let score = minimax(board, depth - 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
