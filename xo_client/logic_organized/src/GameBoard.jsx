import { useGameStore } from './store';
import { socket } from './socket';

const GameBoard = () => {
    const { game, handleLastMove, startNewAnonymousGame, generateUniqueId } = useGameStore();
    const { board, currentTurn, isGameOver, winner } = game.board;

    console.log(game);



    const handleCellClick = (i, j) => {
        if (!isGameOver && board[i][j] === '') {
            handleLastMove(i, j);
        }
    };

    const renderCell = (i, j) => {
        return (
            <div
                key={`${i}-${j}`}
                className="cell"
                onClick={() => handleCellClick(i, j)}
            >
                {board[i][j]}
            </div>
        );
    };

    const renderBoard = () => {
        return board.map((row, i) => (
            <div key={i} className="row">
                {row.map((cell, j) => renderCell(i, j))}
            </div>
        ));
    };

    const handleAnonymousGameStart = () => {
        startNewAnonymousGame();
    };

    const handleAnonymousGameJoin = (roomNum) => {
        useGameStore.getState().joinAnonymousGame(roomNum);
    };

    return (
        <div className="game-board">
            <div className="player-info">
                <p>Player 1: {game.players[0] ? game.players[0].sign :
                 <button onClick={handleAnonymousGameStart}>Start New Game</button>
                }</p>
                <p>Player 2: {game.players[1] ? game.players[1].sign : 'Waiting...'}</p>
                <p>Current Turn: {currentTurn}</p>
            </div>
            <button onClick={() => handleAnonymousGameJoin(roomNum)}>Join Game</button>
            {renderBoard()}
            {isGameOver && (
                <div className="game-over">
                    <p>{winner === 'draw' ? 'It\'s a draw!' : `Winner: ${winner}`}</p>
                </div>
            )}
        </div>
    );
};

export default GameBoard; 