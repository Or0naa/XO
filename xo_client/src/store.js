import { create } from 'zustand';
import { socket } from './socket'


export const useGameStore = create((set, get) => ({

    game: {
        roomNumber: "",
        players: [{
            sign: "X",
            name: "Player 1",
            avatar: '/woman.bmp',
            wins: 5,
            socketId: ""

        },
        {
            sign: "O",
            name: "Player 2",
            avatar: '/woman.bmp',
            wins: 2,
            socketId: ""
        }],
        difficulty: 3,
        type: "computer",
        currentPlayer: '', // השחקן הנוכחי בתור
        board: [],
        currentTurn: "X",
        count: 9,
        isGameOver: false,
        winner: null,
        lastMove: { i: null, j: null },

    },

    setGame: (game) => {
        const isHost = !get().game.players[0].socketId;
        const newPlayer = { sign: isHost ? 'X' : 'O', socketId: socket.id, name: 'Rachel', avatar: '/woman.bmp', wins: 5 };
        const players = isHost ? [newPlayer, { sign: 'O' }] : [...get().game.players, newPlayer];
        set(state => ({
            game: { ...state.game, ...game, ...players, currentPlayer: isHost ? 'X' : 'O' }
        }));
        socket.emit('newGame', { ...game, players });
    },
    // נוסיף פונקציה להגרלת מזהה ייחודי

    // נוסיף פונקציה להתחלת משחק חדש עבור שחקן אנונימי
    createRoom: (playerDetails) => {
        const roomId = null;
        socket.emit('game:join-room', roomId, playerDetails);
        socket.on('roomNumber', (roomNum) => {
            console.log('roomNumber', roomNum);
            set(state => ({
                game: {
                    ...state.game,
                    roomNumber: roomNum
                }
            }));
        });
    },
    joinToRoom: (roomId) => {
        socket.emit('game:join-room', roomId);
        socket.on('roomFull', () => {
            console.log('roomFull');
        });
        socket.on('game:join-success', (room) => {
            console.log('game:join-success', room);
            set(state => ({
                game: {
                    ...state.game,
                    roomNumber: roomId,
                    type: "friend", // עדכון לסוג משחק נגד שחקן אחר
                    players: {
                        player1: {
                            ...game.players[0],
                            sign: room.players[0].sign,
                            socketId: room.players[0].id
                        },
                        player2: {
                            ...game.players[1],
                            sign: room.players[1].sign,
                            socketId: room.players[1].id
                        }
                    }
                }
            }))
        });

    },

    // נוסיף פונקציה לטיפול בהודעת game:join-success
    handleJoinSuccess: (room) => {
        set(state => ({
            game: {
                ...state.game,
                ...room,
                type: "player", // עדכון לסוג משחק נגד שחקן אחר
            }
        }));
    },

    // נוסיף פונקציה לטיפול בהודעת gameUpdate
    handleGameUpdate: (room) => {
        set(state => ({
            game: {
                ...state.game,
                ...room
            }
        }));
    },
    // נוסיף פונקציה למשחק חדש כשהמשחק נגמר
    startNewGame: () => {
        const { roomNumber } = get().game;
        set({ game: { roomNumber, currentPlayer: 'X', ...initialGameState } });
        socket.emit('newGame', { roomNumber });
    },
    joinGame: (game) => {
        const { players } = game;
        if (players.length === 1) {
            const newPlayer = { sign: 'O', socketId: socket.id };
            const updatedPlayers = [...players, newPlayer];
            set(state => ({
                game: { ...state.game, players: updatedPlayers, roomNumber: game.roomNumber, currentPlayer: 'X' }
            }));
            socket.emit('joinGame', { ...game, players: updatedPlayers });
        }
    },
    // מהלך של המחשב
    computerMove: async () => {
        const { board, players, currentTurn } = get().game;
        await new Promise(resolve => setTimeout(resolve, 400));

        const newBoard = computerWins(board, players[1].sign, players[0].sign) ||
            computerBestMove(board, players[1].sign, players[0].sign) ||
            randomMove(board, players[1].sign, players[0].sign);

        if (newBoard) {
            const { i, j } = newBoard.lastMove;
            if (newBoard === "row" || newBoard === "colomn" || newBoard === "diagonaldown" || newBoard === "diagonalup") {
                let turn = players[0].sign;
                set({ game: { ...get().game, currentTurn: turn, board: newBoard.board, lastMove: { i, j }, winner: players[1].sign, isGameOver: true } });
            }
        }
    },
    // טיפול במהלך 
    handleMove: (i, j) => {
        const { game } = get();
        // console.log("game: ", game)
        const { board, currentTurn, count, isGameOver, type, players } = game;
        // if (board[i][j] || game.isGameOver) return; // אם המשבצת כבר מומלאת או שהמשחק כבר נגמר, יש לחזור מיידית

        const newBoard = board.map(row => [...row]);
        newBoard[i][j].value = currentTurn;

        let isDraw = newBoard.every(row => row.every(square => square.value !== ''));

        let result = checkWinner(newBoard, currentTurn, i, j);

        if (isDraw || result) {
            // אם יש ניצחון או תיקו, יש לעדכן את הסטייט בהתאם
            console.log("drow or winner");
            const winnerSign = result ? currentTurn : 'draw';
            set(state => ({
                game: {
                    ...state.game,
                    board, board: newBoard, lastMove: { i, j }, winner: winnerSign, isGameOver: true
                }

            }));
            socket.emit('move', { i, j, currentTurn, winner: winnerSign });
        } else {
            // אחרת, יש להחליף את התור של השחקן הנוכחי ולעדכן את הלוח
            console.log("currentTurn", currentTurn);
            let changeTrun = currentTurn === 'X' ? 'O' : 'X';
            if (type == "computer") {
                changeTrun = players[0].sign;
            }
            set(state => ({
                game: {
                    ...state.game,
                    board, board: newBoard, lastMove: { i, j }, currentTurn: changeTrun
                }

            }));
            socket.emit('move', { i, j, currentTurn });
        }
    },
    makeMove: (index) => {
        const { game, roomNumber } = get();
        const { board, currentTurn, currentPlayer, type } = game;

        // בדיקת תקינות המהלך
        if (board[index] || game.isGameOver || currentPlayer !== currentTurn) {
            return; // אם המשבצת כבר מומלאת, המשחק נגמר, או זה לא תורו של השחקן הנוכחי, אל תעשה דבר
        }

        // עדכון הלוח המקומי
        const newBoard = [...board];
        newBoard[index] = currentTurn;

        // בדיקת ניצחון או תיקו
        const isDraw = newBoard.every(value => value !== null);
        const winner = checkWinner(newBoard, currentTurn);

        // עדכון המצב המקומי
        if (winner || isDraw) {
            set(state => ({
                game: {
                    ...state.game,
                    board: newBoard,
                    lastMove: { i: Math.floor(index / state.game.difficulty), j: index % state.game.difficulty },
                    winner: winner || 'draw',
                    isGameOver: true,
                    currentTurn: winner ? currentTurn : null,
                }
            }));
        } else {
            set(state => ({
                game: {
                    ...state.game,
                    board: newBoard,
                    lastMove: { i: Math.floor(index / state.game.difficulty), j: index % state.game.difficulty },
                    currentTurn: currentTurn === 'X' ? 'O' : 'X',
                }
            }));

            // אם המשחק הוא נגד המחשב וזה תורו של המחשב
            if (type === "computer" && currentTurn === 'O') {
                handleComputerMove();
            }
        }

        // שליחת המהלך לשרת
        socket.emit('move', { roomId: roomNumber, index, currentTurn });
    },
    updatePlayerInfo: (playerInfo) => {
        const updatedPlayers = [...get().game.players];
        // עדכון פרטי המשתמש בהתאם לנתונים המתקבלים
        // לדוגמה: updatedPlayers[0].sign = playerInfo.players[0].sign;
        // לעדכן את המשתנה players במצב העדכון
        set({ game: { ...get().game, players: updatedPlayers } });
        console.log("playerInfo: ", playerInfo)
        // שליחת הודעת socket עם העדכון לכל הלקוחות המחוברים
        socket.emit('updatePlayerInfo', playerInfo);
    },

}));

function checkWinner(board, sign, i, j) {
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

// פונקציות למהלך של המחשב
function computerWins(board, ai, human) {
    console.log("board: ", board)
    console.log("ai: ", ai)
    console.log("human: ", human)
    let i = 0;
    let j = 0;
    let foundMove = false;
    const newBoard = board.map(row => [...row]);
    while (i < num && !foundMove) {
        if (newBoard[i][j].value == "") {
            newBoard[i][j].value = ai;
            if (checkWinner(newBoard)) {
                foundMove = true;

            }
            if (!foundMove) {
                newBoard[i][j].value = '';
            }
        }
        j++;
        if (j >= num) {
            j = 0;
            i++;
        }
    }
    return foundMove ? { board: newBoard, lastMove: { i, j } } : null;
}

const num = useGameStore.getState().game.difficulty;

function computerBestMove(board, ai, human) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    const newBoard = board.map(row => [...row]);
    while (i < num && !foundMove) {
        if (newBoard[i][j].value == "") {
            newBoard[i][j] = human;
            if (!checkWinner(newBoard)) {
                newBoard[i][j].value = '';
            } else {
                newBoard[i][j].value = ai;
                foundMove = true;
            }
        }
        j++;
        if (j >= num) {
            j = 0;
            i++;
        }
    }
    return foundMove ? { board: newBoard, lastMove: { i, j } } : null;
}

function randomMove(board, ai, human) {
    const emptySquares = board.flat().filter(cell => cell.value === '');
    if (emptySquares.length == 0) {
        return null;
    }


    let random = Math.floor(Math.random() * board.length * board.length);
    let i = Math.floor(random / board.length);
    let j = random % board.length;
    if (board[i][j].value == '') {
        const newBoard = board.map(row => [...row]);
        newBoard[i][j].value = ai;
        return { board: newBoard, lastMove: { i, j } };
    }
    return randomMove(board, ai, human);
}

export const useUserStore = create((set, get) => ({
    user: null,
    login: async (formData) => {
        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        //apiReq
        const user = { name: 'yosef', age: 12, token: '9898' }
        localStorage.user = JSON.stringify(user)
        localStorage.token = user.token
        console.log({ user })
        set({ user })
    },
    logout: () => {
        localStorage.clear()
        set({ user: null })
    }
}))
export const useUserPrefStore = create((set, get) => ({
    isDark: false,
    currency: 'usd',
    language: 'English',
    setCurrency: (cur) => set({ currency: cur }),
    setDark: () => set(state => ({ isDark: !state.isDark })),
    setLanguage: (lan) => {
        //check if lang exist
        set({ language: lan })
    },
    resetAll: () => set({ isDark: false, currency: 'usd', language: 'English' })
}))

// import { create } from 'zustand'

// export const useUserStore = create((set) => ({
//     user: {
//         name: '',
//         avatar: '',
//         wins: '0',
//         sigh: 'X',

//     },
//     setUser: (user) => set({ user })

// }))

// export const useOponentStore = create((set) => ({
//     opponent: {
//         name: '',
//         avatar: '.',
//         wins: '0',
//         sigh: 'O',
//     },
//     setOpponent: (opponent) => set({ opponent })

// }))

// export const useGameStore = create((set) => ({
//     game: {
//         win: false,
//         winner: null,
//         board: [],
//         squares: 3,
//         currentPlayer:  'X',
//         gameType: '',
//         room: {}
//     },

//     setGame: (game) => set({ game })
// }))

