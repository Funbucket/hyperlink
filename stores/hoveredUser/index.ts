import { create } from 'zustand'
import type { HoveredUserStore } from './user.types'
import User from '~/types/User'

const initialState: User = {
  order: 0,
  id: '',
  name: '',
  imageUrl: '',
  siteUrl: '',
}

export const useHoveredUserStore = create<HoveredUserStore>((set) => ({
  ...initialState,
  dispatchHoveredUser: (user) => set({ ...user }),
}))
