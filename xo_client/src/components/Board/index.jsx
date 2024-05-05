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
        // אם הריבוע ריק
        if (board[i][j] === "") {
            // הערך שהוכנס על ידי המשתמש (תור X או O)
            const value = turn ? "X" : "O";
            // יצירת לוח חדש עם הערך שהוכנס במקום המתאים
            const newBoard = [...board];
            newBoard[i][j] = value;
            // עדכון הלוח בהתאם
            setBoard(newBoard);

            // שליחת הלוח המלא והערך שהוכנס לפונקציה check
            if (check(newBoard, value)) {
                // אם הפונקציה check מחזירה true, יש ניצחון
                alert(`ניצחון בתור ${value}`);
                setWin(true);
                setWinner(value); // עדכון הנצחון בהתאם לערך המנצח
                // כאן תוכלי להגדיר כל פעולות נוספות שתרצי לבצע כאשר יש ניצחון
            } else {
                // עדכון התור לשחקן השני
                console.log(turn);
                setTurn(!turn);
                // כאן תוכלי להגדיר כל פעולות נוספות שתרצי לבצע לאחר כל תור
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
