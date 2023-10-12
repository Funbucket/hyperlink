import { Vector3 } from 'three'

export interface PanelPosition {
  positionArray: Vector3[]
  positionType: 'random' | 'sphere'
}

export interface PanelPositionStore extends PanelPosition {
  dispatchPositionArray: (positionArray: Vector3[]) => void
  dispatchPositionType: (value: 'random' | 'sphere') => void
}
