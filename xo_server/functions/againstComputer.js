//make the next move on tic tac toe
import { check } from "./win";
// import { useGameStore, useUserStore, useOponentStore } from '../store';



const jeneralboard = useGameStore.getState().game.board

export function computerMove(board, ai, human) {

    if (board.length == 0) {
        board = jeneralboard
    };
    let newBoard = {}
    let computerMove = computerWins(board, newBoard, ai, human);
    if (computerMove) return computerMove
    let computerBlock = computerBestMove(board, newBoard, ai, human);
    if (computerBlock) return computerBlock
    let computerRandom = randomMove(board, newBoard, ai, human);
    return computerRandom;
}

function computerWins(board, newBoard, ai, human) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j].value === '') {
            board[i][j].value = ai;
            if (check(board, ai, i, j)) {
                newBoard.board = board;
                newBoard.i = i;
                newBoard.j = j;
                foundMove = true;
            }
            if (!foundMove) {
                board[i][j].value = ''
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

function computerBestMove(board, newBoard, ai, human) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j].value === '') {
            board[i][j].value = human;
            if (!check(board, human, i, j)) {
                board[i][j].value = '';
            } else {
                board[i][j].value = ai;
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

function randomMove(board, newBoard, ai, human) {
    let random = Math.floor(Math.random() * board.length*board.length);
    let i = Math.floor(random / board.length);
    let j = random % board.length;
    if (board[i][j].value === '') {
        board[i][j].value = ai;
        newBoard.board = board;
        newBoard.i = i;
        newBoard.j = j;
        return newBoard;
    }
    return randomMove(board, newBoard);
}


