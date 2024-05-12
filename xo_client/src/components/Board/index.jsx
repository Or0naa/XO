import React, { useEffect, useState } from 'react'
import Frame from '../Frame'
import styles from './style.module.scss';
import { check } from '../../functions/win';
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { computerMove } from '../../functions/againstComputer';
import { useGameStore, useUserStore, useOponentStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Board() {
    const { game, setGame } = useGameStore(
        state => ({
            game: state.game,
            setGame: state.setGame
        })
    );

    const { user, setUser } = useUserStore(
        state => ({
            user: state.user,
            setUser: state.setUser
        })
    );
    const { opponent, setOpponent } = useOponentStore(
        state => ({
            opponent: state.opponent,
            setOpponent: state.setOpponent
        })
    );

    // console.log(user, opponent)
    const nav = useNavigate();

    const [squares, setSquares] = useState(game.squares);
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
                line.push({ value: "" }); // Initialize the board with empty squares
            }
            newBoard.push(line); // Push the line of squares to the board
        }
        if (gameType === "computer" && user.sigh === "O") {
            handleComputerMove(newBoard);
            setCoung(count - 1);
        }
        setGame({ board: newBoard }) // Update the board accordingly
    }, []);

    // console.log("currentPlayer", currentPlayer)

    const handleSquare = (i, j) => {
        if (game.win) return;
        if (game.board[i][j].value !== "") return;
        if (currentPlayer != user.sigh && gameType != "computer") return;

        if (count <= 1) {
            const newBoard = [...game.board];
            newBoard[i][j].value = user.sigh;
            setGame({ win: true, winner: "Draw", board: newBoard });
            nav('/win')
            console.log("Draw");
            return;
        }

        const newBoard = [...game.board];
        newBoard[i][j].value = user.sigh;
        setGame({ board: newBoard });
        setCoung(count - 1);

        const result = check(newBoard, user.sigh, i, j);
        console.log(result)
        if (result == "row" || result == "colomn" || result == "diagonaldown" || result == "diagonalup") {
            const newBoard = [...game.board];
            setGame({ win: true, winner: user.sigh, board: newBoard });
            setUser({...user,  wins: Number(user.wins) + 1 } );
            console.log("Win: ", user.sigh);
            nav('/win')
        } else {
            if (gameType === "computer") {
                handleComputerMove(game.board);

            }
            if (gameType === "friend") {
                setGame({ currentPlayer: (currentPlayer == opponent.sigh) });
            }
        }
    }
    // console.log(game.board)
    const handleComputerMove = async (currentBoard) => {

        if (win) return; // אם המשחק כבר נגמר, אל תמשיך לבצע מהלך נוסף של המחשב
        await new Promise(resolve => setTimeout(resolve, 400));
        const computerSign = opponent.sigh;
        console.log({ computerSign })

        const newBoard = computerMove(currentBoard, computerSign, user.sigh); // השתמש בלוח הנוכחי שהועבר כארגומנט
        console.log("newBoard", newBoard)

        const result = check(newBoard.board, computerSign, newBoard.i, newBoard.j);
        if (result == "row" || result == "colomn" || result == "diagonaldown" || result == "diagonalup") {
            const updatedBoard = [...newBoard.board];
            setOpponent({ ...opponent, wins: Number(opponent.wins) + 1 });

            setGame({ win: true, winner: computerSign, board: updatedBoard });
            nav('/win')
        }
        setGame({ board: newBoard.board });
        setCoung(count - 2);
    }
    console.log("game: ", game);



    const handleFriendMove = () => {
        console.log("תחברו אותי כבר לסוקט")
    }


    return (
        <Frame>
            <div className={styles.board}>
                {game.board.map((line, i) => (
                    <div key={i} className={styles.board_row}>
                        {line.map((square, j) => (
                            <Frame key={j}>
                                <div className={styles.square_frame} onClick={() => handleSquare(i, j, gameType)}>
                                    {square.value == "X" ? <X_index /> : square.value == "O" ? <O_index /> :
                                        square.value == undefined && opponent.sigh == "O" ? <O_index /> :
                                            square.value == undefined && opponent.sigh == "X" ? <X_index /> : ""}
                                </div>
                            </Frame>
                        ))}
                    </div>
                ))}
            </div>
        </Frame>
    );
}