import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: {
        name: '',
        avatar: '',
        wins: '',
        sigh: 'X',

    },
    setUser: (user) => set({ user })

}))

export const useOponentStore = create((set) => ({
    opponent: {
        name: '',
        avatar: '',
        wins: '',
        sigh: 'O',
    },
    setOpponent: (opponent) => set({ opponent })

}))

export const useGameStore = create((set) => ({
    game: {
        win: false,
        winner: '',
        board: [],
        squares: 3,
        currentPlayer:  'X',
        gameType: 'computer'
    },

    setGame: (game) => set({ game })
}))

