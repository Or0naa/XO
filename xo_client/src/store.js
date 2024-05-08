import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: {
        name: '',
        avatar: '',
        wins: ''
    },
    setUser: (user) => set({ user })

}))

export const useOponentStore = create((set) => ({
    opponent: {
        name: '',
        avatar: '',
        wins: ''
    },
    setOpponent: (opponent) => set({ opponent })

}))

export const useGameStore = create((set) => ({
    game: {
        win: '',
        winner: '',
        board: [],
        squares: '',
        currentPlayer: {},
        gameType: ''
    },

    setGame: (game) => set({ game })
}))

