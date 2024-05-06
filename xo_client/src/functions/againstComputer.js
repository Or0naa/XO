//make the next move on tic tac toe
import { check } from "./win";

const ai = "O"; // סימון של המחשב
const human = "X"; // סימון של השחקן



export function computerMove(board) {
    let newBoard = {}
    let computerMove = computerWins(board, newBoard);
    if (computerMove) return computerMove
    let computerBlock = computerBestMove(board, newBoard);
    if (computerBlock) return computerBlock
    let computerRandom = randomMove(board, newBoard);
    return computerRandom;
}

function computerWins(board, newBoard) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j] === '') {
            board[i][j] = ai;
            if (check(board, ai, i, j)) {
                newBoard.board = board;
                newBoard.i = i;
                newBoard.j = j;
                foundMove = true;
            }
            if (!foundMove) {
                board[i][j] = ''
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    return foundMove ? newBoard : null;
}

function computerBestMove(board, newBoard) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j] === '') {
            board[i][j] = human;
            if (!check(board, human, i, j)) {
                board[i][j] = '';
            } else {
                board[i][j] = ai;
                newBoard.board = board;
                newBoard.i = i;
                newBoard.j = j;
                foundMove = true;
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    if (foundMove) return newBoard;
    return null;
}

function randomMove(board, newBoard) {
    let random = Math.floor(Math.random() * 9);
    let i = Math.floor(random / 3);
    let j = random % 3;
    if (board[i][j] === '') {
        board[i][j] = ai;
        newBoard.board = board;
        newBoard.i = i;
        newBoard.j = j;
        return newBoard;
    }
    return randomMove(board, newBoard);
}


