import React, { useEffect, useState } from 'react'
import Frame from '../Frame'
import styles from './style.module.scss';
import { check } from '../../functions/win';
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { computerMove } from '../../functions/againstComputer';

export default function Board() {
    const [board, setBoard] = useState([]);
    const [squares, setSquares] = useState(3);
    const [turn, setTurn] = useState(true);
    const [win, setWin] = useState(false);
    const [winner, setWinner] = useState("");
    const [gameType, setGameType] = useState( "computer");

    useEffect(() => {
        // Create the board
        const newBoard = [];
        for (let i = 0; i < squares; i++) {
            const line = [];
            for (let j = 0; j < squares; j++) {
                line.push(""); // Initialize the board with empty squares
            }
            newBoard.push(line); // Push the line of squares to the board
        }
        setBoard(newBoard); // Update the board accordingly
    }, [squares]);

    const handleSquare = (i, j, gameType) => {
        if (win) return;
        if (board[i][j] !== "") return;

        const value = turn ? "X" : "O";
        const newBoard = [...board];
        newBoard[i][j] = value;
        setBoard(newBoard);
        // setTurn(!turn);

        const result = check(newBoard, value, i, j);
        if (result) {
            setWin(true);
            setWinner(value);
            console.log("Win: ", value);
        } else {
            if (gameType == "computer") {
                handleComputerMove();
            }
            if (gameType == "friend") {
                handleFriendMove();
            }
        }
    }

    const handleComputerMove = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const newBoard = computerMove(board);
        setBoard(newBoard.board);
        const result = check(board, "O", newBoard.i, newBoard.j);
        if (result) {
            setWin(true);
            setWinner("O");
            console.log("Win: ", "O");
        }
    }

    const handleFriendMove = () => {
        // const newBoard = socket(board);
        // setBoard(newBoard.board);
        // const result = check(board, "O", newBoard.i, newBoard.j);
        // if (result) {
        //     setWin(true);
        //     setWinner("O");
        //     console.log("Win: ", "O");
        // }
        setTurn(!turn);
    
    }

    return (
        <Frame>
            <div className={styles.board}>
                {board.map((line, i) => (
                    <div key={i} className={styles.board_row}>
                        {line.map((square, j) => (
                            <Frame key={j}>
                                <div className={styles.square_frame} onClick={() => handleSquare(i, j, gameType)}>
                                    {square === "X" ? <X_index /> : square === "O" ? <O_index /> : ""}
                                </div>
                            </Frame>
                        ))}
                    </div>
                ))}
            </div>
        </Frame>
    );
}
