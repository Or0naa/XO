import { create } from 'zustand';
import { socket } from './socket'


export const useGameStore = create((set, get) => ({

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

    },

    setGame: (game) => {
        set(state => ({
            game: { ...state.game, ...game }
        }));
    },
    setGameType: (type) => {
        if (type == "computer") {
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
                    ]
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
                    startGame: true,
                }
            })

            );
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
                    startGame: true,
                }
            }))

            console.log('setGame', get().game);


        });

    },
    handleGameUpdate: (room) => {
        console.log('handleGameUpdate', room);
        socket.emit('move', room);
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
    computerMove: async () => {
        console.log("computerMove")
    },
    // טיפול במהלך 
    handleMove: (i, j) => {
        console.log("handleMove")

    },
    friendMove: () => {
        console.log("friendMove")
    },


}));

function check(board, sign, i, j) {
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
function computerWins(board, newBoard, ai, human) {
    console.log("computer")
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j].value === '') {
            board[i][j].value = ai;
            if (check(board, ai, i, j)) {
                newBoard.board = board;
                newBoard.i = i;
                newBoard.j = j;
                foundMove = true;
            }
            if (!foundMove) {
                board[i][j].value = ''
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    return foundMove ? newBoard : null;
}

function computerBestMove(board, newBoard, ai, human) {
    console.log("best")
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j].value === '') {
            board[i][j].value = human;
            if (!check(board, human, i, j)) {
                board[i][j].value = '';
            } else {
                board[i][j].value = ai;
                newBoard.board = board;
                newBoard.i = i;
                newBoard.j = j;
                foundMove = true;
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    if (foundMove) return newBoard;
    return null;
}

function randomMove(board, newBoard, ai, human) {
    console.log("random")
    let random = Math.floor(Math.random() * board.length * board.length);
    let i = Math.floor(random / board.length);
    let j = random % board.length;
    if (board[i][j].value === '') {
        board[i][j].value = ai;
        newBoard.board = board;
        newBoard.i = i;
        newBoard.j = j;
        return newBoard;
    }
    return randomMove(board, newBoard);
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

