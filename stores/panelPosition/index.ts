import { create } from 'zustand'
import type { PanelPosition, PanelPositionStore } from './panelPosition.types'

const initialState: PanelPosition = {
  positionArray: [],
  positionType: 'random',
}

export const usePanelPositionStore = create<PanelPositionStore>((set) => ({
  ...initialState,
  dispatchPositionArray: (array) => set({ positionArray: array }),
  dispatchPositionType: (type) => set({ positionType: type }),
}))
