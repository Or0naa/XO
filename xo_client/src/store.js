import { create } from 'zustand';
import { socket } from './socket'


export const useGameStore = create((set, get) => ({

    game: {
        roomNum: "",
        players: [{
            sign: "X",
            name: "Player 1",
            avatar: './woman.bmp',
            wins: 5,
        },
    {
            sign: "O",
            name: "Player 2",
            avatar: './woman.bmp',
            wins: 20
    }],
        difficulty: 3,
        type: "computer",
        currentPlayer: '', // השחקן הנוכחי בתור
        board: {
            board: [],
            currentTurn: "X",
            count: 9,
            isGameOver: false,
            winner: null,
            lastMove: { i: null, j: null },
        }
    },
    joinGame: (game) => {
        const { players } = game;
        if (players.length === 1) {
            const newPlayer = { sign: 'O', socketId: socket.id };
            const updatedPlayers = [...players, newPlayer];
            set(state => ({
                game: { ...state.game, players: updatedPlayers, roomNum: game.roomNum, currentPlayer: 'X' }
            }));
            socket.emit('joinGame', { ...game, players: updatedPlayers });
        }
    },
    setGame: (game) => {
        const isHost = !get().game.players[0].socketId;
        const newPlayer = { sign: isHost ? 'X' : 'O', socketId: socket.id };
        const players = isHost ? [newPlayer, { sign: 'O' }] : [...get().game.players, newPlayer];
        set(state => ({
            game: { ...state.game, ...game, players, currentPlayer: isHost ? 'X' : 'O' }
        }));
        socket.emit('newGame', { ...game, players });
    },
    // נוסיף פונקציה להגרלת מזהה ייחודי

    // נוסיף פונקציה להתחלת משחק חדש עבור שחקן אנונימי
    startNewAnonymousGame: () => {
        const roomNum = generateUniqueId(); // מזהה חדש לחדר
        set(state => ({
            game: { ...state.game, roomNum, currentPlayer: 'X' }
        }));
        socket.emit('newGame', { roomNum });
    },
    // נוסיף פונקציה להצטרפות למשחק קיים עבור שחקן אנונימי
    joinAnonymousGame: (roomNum) => {
        set(state => ({
            game: { ...state.game, roomNum, currentPlayer: 'O' }
        }));
        socket.emit('joinGame', { roomNum });
    },
    // נוסיף פונקציה למשחק חדש כשהמשחק נגמר
    startNewGame: () => {
        const { roomNum } = get().game;
        set({ game: { roomNum, currentPlayer: 'X', ...initialGameState } });
        socket.emit('newGame', { roomNum });
    },



    // בדיקת ניצחון
    checkWinner: (board) => {
        const { currentTurn, lastMove } = get().game.board;
        if (row(board, currentTurn, 0, lastMove.j)) return "row";
        if (colomn(board, currentTurn, lastMove.i, 0)) return "colomn";
        if (currentTurn === board[0][0] && diagonaldown(board, currentTurn, 0, 0)) return "diagonaldown";
        if (currentTurn === board[board.length - 1][0] && diagonalup(board, currentTurn, board.length - 1, 0)) return "diagonalup";
        return false;
    },
    // מהלך של המחשב
    computerMove: async () => {
        const { board, players } = get().game;
        await new Promise(resolve => setTimeout(resolve, 400));

        const newBoard = computerWins(board, players[1].sign, players[0].sign) ||
            computerBestMove(board, players[1].sign, players[0].sign) ||
            randomMove(board, players[1].sign, players[0].sign);

        if (newBoard) {
            const { i, j } = newBoard.lastMove;
            if (newBoard === "row" || newBoard === "colomn" || newBoard === "diagonaldown" || newBoard === "diagonalup") {
                set({ game: { board: { ...board, board: newBoard.board, lastMove: { i, j }, winner: players[1].sign, isGameOver: true } } });
            } else {
                set({ game: { board: { ...board, board: newBoard.board, lastMove: { i, j } } } });
            }
        }
    },
    // טיפול במהלך 
    handleMove: (i, j) => {
        const { game, checkWinner } = get();
        const { board, currentTurn, players } = game.board;

        if (board[i][j]) return;

        if (game.board.count === 0) {
            set({ game: { ...game, board: { ...board, lastMove: { i, j }, winner: "draw", isGameOver: true } } });
            return;
        }

        const newBoard = [...board];
        newBoard[i][j] = currentTurn;
        const result = checkWinner(newBoard);

        if (result) {
            const winnerSign = currentTurn;
            set({ game: { ...game, board: { ...board, board: newBoard, lastMove: { i, j }, winner: winnerSign, isGameOver: true } } });
            socket.emit('move', { i, j, currentTurn });
        } else {
            set({ game: { ...game, board: { ...board, board: newBoard, lastMove: { i, j }, currentTurn: currentTurn === 'X' ? 'O' : 'X' } } });
            socket.emit('move', { i, j, currentTurn });
        }
    },
    updatePlayerInfo: (playerInfo) => {
        set({ game: { ...get().game, players: [playerInfo, get().game.players[1]] } });
        socket.emit('updatePlayerInfo', playerInfo);
    },

}));

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 8);
}

// פונקציות עזר לבדיקת ניצחון
function row(arr, currentTurn, i, j) {
    if (i === arr.length) return true;
    if (arr[i][j] !== currentTurn) return false;
    return row(arr, currentTurn, i + 1, j);
}

function colomn(arr, currentTurn, i, j) {
    if (j === arr.length) return true;
    if (arr[i][j] !== currentTurn) return false;
    return colomn(arr, currentTurn, i, j + 1);
}

function diagonaldown(arr, currentTurn, i, j) {
    if (i === arr.length) return true;
    if (arr[i][j] !== currentTurn) return false;
    return diagonaldown(arr, currentTurn, i + 1, j + 1);
}

function diagonalup(arr, currentTurn, i, j) {
    if (i === -1) return true;
    if (arr[i][j] !== currentTurn) return false;
    return diagonalup(arr, currentTurn, i - 1, j + 1);
}

// פונקציות למהלך של המחשב
function computerWins(board, ai, human) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (!board[i][j]) {
            board[i][j] = ai;
            if (checkWinner(board)) {
                foundMove = true;
            }
            if (!foundMove) {
                board[i][j] = '';
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    return foundMove ? { board, lastMove: { i, j } } : null;
}

function computerBestMove(board, ai, human) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (!board[i][j]) {
            board[i][j] = human;
            if (!checkWinner(board)) {
                board[i][j] = '';
            } else {
                board[i][j] = ai;
                foundMove = true;
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    return foundMove ? { board, lastMove: { i, j } } : null;
}

function randomMove(board, ai, human) {
    let random = Math.floor(Math.random() * board.length * board.length);
    let i = Math.floor(random / board.length);
    let j = random % board.length;
    if (!board[i][j]) {
        board[i][j] = ai;
        return { board, lastMove: { i, j } };
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

