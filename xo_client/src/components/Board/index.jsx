import React, { useEffect, useState } from 'react'
import Frame from '../Frame'
import styles from './style.module.scss';
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { useGameStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Board() {
    const { game } = useGameStore(
        state => ({
            game: state.game,
        })
    );
    const { setGame } = useGameStore(
        state => ({
            setGame: state.setGame,
        })
    );

    const { board, currentPlayer, players } = game;
    const { handleMove, startNewAnonymousGame, computerMove, checkWinner } = useGameStore();


    console.log(game)
    const nav = useNavigate();


    useEffect(() => {
        // Create the board
        const newBoard = [];
        for (let i = 0; i < game.difficulty; i++) {
            const line = [];
            for (let j = 0; j < game.difficulty; j++) {
                line.push({ value: "" }); // Initialize the board with empty game.difficulty
            }
            newBoard.push(line); // Push the line of game.difficulty to the board
        }
        if (game.type === "computer" && game.players[0].sigh === "O") {
            computerMove
        }
        setGame({ board: newBoard }) // Update the board accordingly
    }, []);

    // console.log("currentPlayer", currentPlayer)

    const handleSquare = (i, j) => {

    }


    return (
        <Frame>
            <div className={styles.board}>
                {game.board.board ? game.board.board.map((line, i) => (
                    <div key={i} className={styles.board_row}>
                        {line.map((square, j) => (
                            <Frame key={j}>
                                <div className={styles.square_frame} onClick={handleMove(i, j)}>
                                    {square.value == "X" ? <X_index /> : square.value == "O" ? <O_index /> : ""}
                                </div>
                            </Frame>
                        ))}
                    </div>
                )) : "wating for game to start"}
            </div>
        </Frame>
    );
}