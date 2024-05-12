import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: {
        name: '',
        avatar: '',
        wins: '0',
        sigh: 'X',

    },
    setUser: (user) => set({ user })

}))

export const useOponentStore = create((set) => ({
    opponent: {
        name: '',
        avatar: '.',
        wins: '0',
        sigh: 'O',
    },
    setOpponent: (opponent) => set({ opponent })

}))

export const useGameStore = create((set) => ({
    game: {
        win: false,
        winner: null,
        board: [],
        squares: 3,
        currentPlayer:  'X',
        gameType: '',
        room: {}
    },

    setGame: (game) => set({ game })
}))

