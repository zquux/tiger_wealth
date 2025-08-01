import type { SessionDto } from '../api/types'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { userService } from '@/entities/user/@x'

type SessionState = {
  user: {
    email: string
  }
  accessToken: string
  refreshToken: string
  isAuthenticated: boolean
  authenticate: (data: SessionDto) => void
  getCurrentUser: () => Promise<void>
  logout: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: {
        email: ''
      },
      accessToken: '',
      refreshToken: '',
      get isAuthenticated() {
        return Boolean(get().accessToken && get().refreshToken)
      },
      authenticate: ({ user, accessToken, refreshToken }) => {
        set({
          user,
          accessToken,
          refreshToken
        })
      },
      getCurrentUser: async () => {
        const user = await userService.getCurrentUser()
        set({ user })
      },
      logout: () => {
        set({
          user: { email: '' },
          accessToken: '',
          refreshToken: ''
        })
        localStorage.clear()
      }
    }),
    {
      name: 'session-store',
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken
      })
    }
  )
)
