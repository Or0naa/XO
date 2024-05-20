import React, { useEffect, useState } from 'react';
import Frame from '../Frame';
import styles from './style.module.scss';
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { useGameStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Board() {
    const { game, user } = useGameStore();
    const { handleMove, setGame } = useGameStore();
    const nav = useNavigate()


    useEffect(() => {
        if (game.type == "computer" && game.players[0].sign== "O") {
            handleComputerMove();
        }
    }, []);

    useEffect(() => {
        if (game.winner && game.winner != "") {
            nav('/win')
        }
    }, [game.winner])

    const handleSquareClick = (i, j) => {
        useGameStore.getState().handleMove(i, j);

        // אם המשחק הוא נגד המחשב וזה תורו של המחשב
        if (game.type === "computer") {
            // קרא לפונקציית המהלך של המחשב
            handleComputerMove();
        }
        if (game.type == "friend") {
            handleFriendMove();
        }
    };

    const handleFriendMove = () => {
        useGameStore.getState().friendMove();
    };

    const handleComputerMove = () => {
        useGameStore.getState().computerMove();
    };

    return (
        <Frame>
            <div className={styles.board}>
                {game.board.map((line, i) => (
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
