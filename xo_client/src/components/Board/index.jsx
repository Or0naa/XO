import React, { useEffect, useState } from 'react'
import Frame from '../Frame'
import styles from './style.module.scss';
import { check } from '../../functions/win';
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { computerMove } from '../../functions/againstComputer';
import { useGameStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Board() {
    const { game, setGame } = useGameStore(
        state => ({
            game: state.game,
            setGame: state.setGame
        })
    );

    const nav = useNavigate();

    const [squares, setSquares] = useState(game.squares);
    const [turn, setTurn] = useState(game.currentPlayer == "X" ? true : false);
    const [win, setWin] = useState(game.win);
    const [winner, setWinner] = useState(game.winner);
    const [gameType, setGameType] = useState(game.gameType);
    const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer);
    const [count, setCoung] = useState(squares * squares);



    useEffect(() => {
        // Create the board
        const newBoard = [];
        for (let i = 0; i < squares; i++) {
            const line = [];
            for (let j = 0; j < squares; j++) {
                line.push({value:""}); // Initialize the board with empty squares
            }
            newBoard.push(line); // Push the line of squares to the board
        }
        if (gameType === "computer" && currentPlayer === "O") {
            handleComputerMove(newBoard);
            setCoung(count - 1);
        }
        setGame({ board: newBoard }) // Update the board accordingly
    }, []);

    

    const handleSquare = (i, j) => {
        if (win) return;
        if (!turn) return; // אם התור אינו שייך לשחקן אנושי, תחזיר מיידית
        if (game.board[i][j].value !== "") return;
 
        if (count == 1) {
            const newBoard = [...game.board];
            setGame({ win: true, winner: "Draw", board: newBoard });
            nav('/win')
            console.log("Draw");
            return;
        }

        const currentValue = currentPlayer;
        const newBoard = [...game.board];
        newBoard[i][j].value = currentValue;
        setGame({ board: newBoard });
        setTurn(!turn);
        setCoung(count - 1);

        const result = check(newBoard, currentValue, i, j);
        console.log(result)
        if (result=="row"|| result=="colomn"||result=="diagonaldown"||result=="diagonalup") {
            const newBoard = [...game.board];
            setGame({ win: true, winner: currentValue, board: newBoard });
            console.log("Win: ", currentValue);
            nav('/win')
        } else {
            if (gameType === "computer") {
                handleComputerMove(game.board);
            }
            if (gameType === "friend") {
                handleFriendMove();
            }
        }
    }
console.log(game.board)
    const handleComputerMove = async (currentBoard) => {
        if (win) return; // אם המשחק כבר נגמר, אל תמשיך לבצע מהלך נוסף של המחשב
        await new Promise(resolve => setTimeout(resolve, 400));
        const newBoard = computerMove(currentBoard); // השתמש בלוח הנוכחי שהועבר כארגומנט

        const oponnentValue = currentPlayer === "X" ? "O" : "X";

        const result = check(newBoard.board, oponnentValue, newBoard.i, newBoard.j);
        
        if (result=="row"|| result=="colomn"|| result=="diagonaldown"|| result=="diagonalup") {
            const newBoard = [...game.board];
            setGame({ win: true, winner: oponnentValue, board: newBoard.board });
            console.log("Win: ", oponnentValue);
            nav('/win')
        }
        setGame({ board: newBoard.board });
        setTurn(true); // כאן אנחנו מגדירים שהתור של המחשב הוא השחקן הנוכחי
        setCoung(count - 2);
    }


    const handleFriendMove = () => {
        setTurn(!turn); // בכל לחיצה על ריבוע, אנחנו מחליפים את התור של השחקן
    }


    return (
        <Frame>
            <div className={styles.board}>
                {game.board.map((line, i) => (
                    <div key={i} className={styles.board_row}>
                        {line.map((square, j) => (
                            <Frame key={j}>
                                <div className={styles.square_frame} onClick={() => handleSquare(i, j, gameType)}>
                                {square.value=="X"? <X_index />: square.value=="O"? <O_index  />: ""}
                                </div>
                            </Frame>
                        ))}
                    </div>
                ))}
            </div>
        </Frame>
    );
}