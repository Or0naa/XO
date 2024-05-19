import { create } from 'zustand';
import { socket } from './socket'


export const useGameStore = create((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    game: {
        roomNumber: "",
        players: [],
        difficulty: 3,
        type: "",
        currentPlayer: '', // השחקן הנוכחי בתור
        board: [],
        currentTurn: "X",
        count: 9,
        winner: "",
        startGame: false,
        lastMove: { i: null, j: null },
        user: ""

    },

    setGame: (game) => {
        set(state => ({
            game: { ...state.game, ...game }
        }));
    },
    setGameType: (type) => {
        const game = get().game;
        if (type == "computer") {
            const newBoard = [];
            for (let i = 0; i < game.difficulty; i++) {
                const line = [];
                for (let j = 0; j < game.difficulty; j++) {
                    line.push({ value: "" }); // Initialize the board with empty values
                }
                newBoard.push(line);
            }
            set(state => ({
                game: {
                    ...state.game,
                    players: [
                        {
                            name: "your name",
                            avatar: "/female.png",
                            wins: "0",
                            sign: "X",
                        },
                        {
                            name: "Computer",
                            avatar: "/robot.png",
                            wins: "0",
                            sign: "O",
                        }
                    ],
                    board: newBoard,
                }
            }));
        }
        set(state => ({
            game: {
                ...state.game,
                type: type,
            }
        }));
    },
    createRoom: () => {
        const game = get().game;
        const setUser = get().setUser;
        socket.emit('game:join-room', null, game);
        socket.on('roomNumber', (roomNum) => {
            console.log('roomNumber', roomNum);
            set(state => ({
                game: {
                    ...state.game,
                    roomNumber: roomNum,
                }
            }));

        });
        socket.on('game:join-success', (room) => {
            console.log('game:join-success', room);
            set(state => ({
                game: {
                    ...state.game,
                    players: room.players,
                    currentPlayer: room.players[0].sign,
                    board: room.board,
                    startGame: true,
                }
            })
            );
            const currentUser = room.players.find(player => player.socketId === socket.id);
            if (currentUser) {
                setUser(currentUser.socketId);
            }
        })
    },
    joinToRoom: (roomId) => {
        const game = get().game;
        set(state => ({
            game: {
                ...state.game,
            }
        }));
    },
    joinToRoom: (roomId) => {
        const game = get().game;
        const setUser = get().setUser;
        socket.emit('game:join-room', roomId, game);
        socket.on('roomFull', () => {
            console.log('roomFull');
        });
        console.log('joinToRoom', roomId);
        socket.on('game:join-success', (room) => {
            console.log('game:join-success', room);
            set(state => ({
                game: {
                    ...state.game,
                    players: room.players,
                    currentPlayer: room.players[0].sign,
                    board: room.board,
                    startGame: true,
                    roomNumber: roomId,
                }
            }))
            const currentUser = room.players.find(player => player.socketId === socket.id);
            if (currentUser) {
                setUser(currentUser.socketId);
            }

            console.log('setGame', get().game);


        });

    },
    handleGameUpdate: (data) => {
        const game = get().game;
        console.log('handleGameUpdate', data);
        set(state => ({
            game: {
                ...state.game,
                ...data
            }
        }));
        socket.emit('move', game.roomNumber, data);
        console.log(game.roomNumber);
        socket.on('gameUpdate', (data) => {
            console.log('gameUpdate', data);
            set(state => ({
                game: {
                    ...state.game,
                    ...data
                }
            }));
        });
    },
    // מהלך של המחשב
    handleMove: (i, j) => {
        const { game, user, handleGameUpdate } = get();
        let playerTurn = game.players[0]
        if (game.type == "friend") {
            playerTurn = game.players.find((p) => p.socketId === user);
        } 
        console.log("playerTurn", playerTurn);
            
        // בדיקה אם התא כבר תפוס
        if (game.board[i][j].value !== "") return;
    
        // בדיקה אם המשתמש הנוכחי הוא השחקן שבתוֹר
        if (game.type== "friend" && game.currentTurn !== playerTurn.sign) return;
    
        // עדכון הלוח עם המהלך הנוכחי
        const newBoard = game.board.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
                rowIndex === i && colIndex === j ? { value: playerTurn.sign } : cell
            )
        );
    
        // בדיקה אם יש מנצח
        const winner = check(newBoard, playerTurn.sign, i, j);
    
        // עדכון המידע של המשחק
        handleGameUpdate({
            board: newBoard,
            currentPlayer: game.currentPlayer === 'X' ? 'O' : 'X',
            winner: winner ? playerTurn.sign : "",
            count: game.count - 1,
        });
    },
    
    computerMove: async () => {
        const game = get().game;
        await new Promise(resolve => setTimeout(resolve, 600));
        return computerWins(game.board, game.players[1].sign, game.players[0].sign)||
            computerBestMove(game.board, game.players[1].sign, game.players[0].sign)||
            randomMove(game.board, game.players[1].sign, game.players[0].sign);
    },
    // טיפול במהלך 
    friendMove: () => {
        const handleGameUpdate = get().handleGameUpdate;
        const game = get().game;
        const user = get().user;
        user.sign = game.players.find((p) => p.socketId === user).sign;
        if (game.currentTurn !== user.sign) return;
        const changeTurn = game.currentTurn === "X" ? "O" : "X";
        handleGameUpdate({
            currentTurn: changeTurn,
        })

    },


}));

function check(board, sign, i, j) {
    const setGame = useGameStore.getState().setGame;
    console.log("check")
    if (row(board, sign, 0, j)) {
        console.log("row")
        return "row";
    } if (colomn(board, sign, i, 0)) return "colomn";
    if (sign === board[0][0] && diagonaldown(board, sign, 0, 0)) return "diagonaldown";
    if (sign === board[num - 1][0] && diagonalup(board, sign, num - 1, 0)) return "diagonalup";
    return false;
}


// פונקציות עזר לבדיקת ניצחון
function row(arr, currentTurn, i, j) {
    if (i === arr.length) return true;
    if (arr[i][j].value !== currentTurn) return false;
    return row(arr, currentTurn, i + 1, j);
}

function colomn(arr, currentTurn, i, j) {
    if (j === arr.length) return true;
    if (arr[i][j].value !== currentTurn) return false;
    return colomn(arr, currentTurn, i, j + 1);
}

function diagonaldown(arr, currentTurn, i, j) {
    if (i === arr.length) return true;
    if (arr[i][j].value !== currentTurn) return false;
    return diagonaldown(arr, currentTurn, i + 1, j + 1);
}

function diagonalup(arr, currentTurn, i, j) {
    if (i === -1) return true;
    if (arr[i][j].value !== currentTurn) return false;
    return diagonalup(arr, currentTurn, i - 1, j + 1);
}
const num = useGameStore.getState().game.difficulty;

// פונקציות למהלך של המחשב
function computerWins(board, ai, human) {
    const game = useGameStore.getState().game;
    const setGame = useGameStore.getState().setGame;
    console.log("computer");
    let i = 0;
    let j = 0;
    let foundMove = false;
    let newBoard = board;
    while (i < newBoard.length && !foundMove) {
        if (newBoard[i][j].value === '') {
            newBoard[i][j].value = ai;
            if (check(newBoard, ai, i, j)) {
                setGame({
                    board: newBoard,
                    lastMove: {
                        i: i,
                        j: j,
                    },
                    winner: ai,
                });
                foundMove = true;
            }
            if (!foundMove) {
                newBoard[i][j].value = '';
            }
        }
        j++;
        if (j >= newBoard.length) {
            j = 0;
            i++;
        }
    }
    return foundMove ? game : null;
}

function computerBestMove(board, ai, human) {
    console.log("best")
    let i = 0;
    let j = 0;
    let foundMove = false;
    const setGame = useGameStore.getState().setGame;
    const game = useGameStore.getState().game;
    let newBoard = game.board;
    while (i < newBoard.length && !foundMove) {
        if (newBoard[i][j].value === '') {
            newBoard[i][j].value = human;
            if (!check(newBoard, human, i, j)) {
                newBoard[i][j].value = '';
            } else {
                newBoard[i][j].value = ai;
                setGame({
                    board: newBoard,
                    lastMove: {
                        i: i,
                        j: j,
                    },
                });
                foundMove = true;
            }
        }
        j++;
        if (j >= newBoard.length) {
            j = 0;
            i++;
        }
    }
    if (foundMove) return game;
    return null;
}

function randomMove(board, ai, human) {
    console.log("random")
    const setGame = useGameStore.getState().setGame;
    const game = useGameStore.getState().game;
    let newBoard = game.board;
    const boardFull = board.every((row) => row.every((cell) => cell.value !== ''));
    if (boardFull){
        setGame({
            board: newBoard,
            lastMove: {
                i: -1,
                j: -1,
            },
            winner: 'tie',
        });
        return;
    }
    let random = Math.floor(Math.random() * board.length * board.length);
    let i = Math.floor(random / board.length);
    let j = random % board.length;
    if (newBoard[i][j].value === '') {
        newBoard[i][j].value = ai;
        setGame({
            board: newBoard,
            lastMove: {
                i: i,
                j: j,
            },
        });
        return game;
    }
    return randomMove(board, ai, human);
}
