import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: {
        name: 'eliraz',
        avatar: './female.png',
        wins: '13',
        sigh: 'X',

    },
    setUser: (user) => set({ user })

}))

export const useOponentStore = create((set) => ({
    opponent: {
        name: 'boty',
        avatar: './robot.png',
        wins: '6',
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
        gameType: 'computer'
    },

    setGame: (game) => set({ game })
}))

