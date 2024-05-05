import React, { useEffect, useState } from 'react'
import Frame from '../Frame'
import styles from './style.module.scss';
import { check } from '../../functions/win';
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';

export default function Board() {
    const [board, setBoard] = useState([]);
    const [squares, setSquares] = useState(3);
    const [turn, setTurn] = useState(true);
    const [win, setWin] = useState(false);
    const [winner, setWinner] = useState("");
    const [winningSquares, setWinningSquares] = useState([]);

    useEffect(() => {
        // יצירת לוח הריבועים
        const newBoard = [];
        for (let i = 0; i < squares; i++) {
            const line = [];
            for (let j = 0; j < squares; j++) {
                line.push(""); // מקדם את הלוח בשורות ריקות
            }
            newBoard.push(line); // מקדם את הלוח בשורות שמכילות את הריבועים הריקים
        }
        setBoard(newBoard); // עדכון הלוח בהתאם
    }, [squares]);

    const handleSquare = (i, j) => {
        // console.log(board, i, j);
        if (board[i][j] === "") {
            const value = turn ? "X" : "O";
            const newBoard = [...board];
            newBoard[i][j] = value;
            setBoard(newBoard);
    
            const result = check(newBoard, turn ? "X" : "O" , i, j);
            if (result == true) {
                alert(`ניצחון בתור ${value}`);
                setWin(true);
                setWinner(value);
            } else {
                setTurn(!turn);
            }
        }
    }

    return (
        <div className={styles.board}>
            <Frame >
                {board.map((line, i) => (
                    <div key={i} className={styles.board_row}>
                        {line.map((square, j) => (

                            <Frame >
                                <div key={j} className={styles.square_frame} onClick={() => handleSquare(i, j)}>
                                    {square == "X" ? <X_index /> : square == "O" ? <O_index /> : ""} </div>
                            </Frame>

                        ))}
                    </div>
                ))}
            </Frame></div>
    )
}
