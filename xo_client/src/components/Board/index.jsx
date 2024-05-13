import React, { useEffect, useState } from 'react';
import Frame from '../Frame';
import styles from './style.module.scss';
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { useGameStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Board() {
    const { game } = useGameStore();
    const { handleMove, setGame } = useGameStore();

    const [board, setBoard] = useState([]);

    useEffect(() => {
        const newBoard = [];
        for (let i = 0; i < game.difficulty; i++) {
            const line = [];
            for (let j = 0; j < game.difficulty; j++) {
                line.push({ value: "" }); // Initialize the board with empty values
            }
            newBoard.push(line);
        }
        setGame({ ...game, board: newBoard });
        setBoard(newBoard);
        if (game.type == "computer" && game.currentPlayer === game.players[1].sign) {
            handleComputerMove();
        }
    }, [game.difficulty, setGame]);

    const handleSquareClick = (i, j) => {
        handleMove(i, j);
      
        // אם המשחק הוא נגד המחשב וזה תורו של המחשב
        if (game.type === "computer") {
          // קרא לפונקציית המהלך של המחשב
          handleComputerMove();
        }
      };

      const handleComputerMove = () => {
        useGameStore.getState().computerMove();
      };

    return (
        <Frame>
            <div className={styles.board}>
                {board.map((line, i) => (
                    <div key={i} className={styles.board_row}>
                        {line.map((square, j) => (
                            <Frame key={j}>
                                <div
                                    className={styles.square_frame}
                                    onClick={() => handleSquareClick(i, j)}
                                >
                                    {square.value === "X" ? <X_index /> : square.value === "O" ? <O_index /> : ""}
                                </div>
                            </Frame>
                        ))}
                    </div>
                ))}
            </div>
        </Frame>
    );
}
