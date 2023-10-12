import create from 'zustand'
import { Meshes, MeshesStore } from './meshes.types'

const initialState: Meshes = {
  mesh: { current: [] },
}

export const useMeshesStore = create<MeshesStore>(() => ({
  ...initialState,
}))
