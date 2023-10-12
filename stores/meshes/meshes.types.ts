import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from 'three'

// Mesh 객체의 타입 정의
export type IMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
export type CMeshes = { current: IMesh[] }

export interface Meshes {
  mesh: CMeshes
}

export interface MeshesStore extends Meshes {}
