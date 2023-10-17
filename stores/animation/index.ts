import { create } from 'zustand'
import { Animation, AnimationStore } from './animation.types'

const initialState: Animation = {
  animationEnd: false,
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  ...initialState,
  dispatchAnimationEnd: (value) => set({ animationEnd: value }),
}))
