import { Vector3 } from 'three'

export function calcWidthHeightSegments(x: number): number {
  let y = 3

  while (true) {
    const q = (y - 1) * y

    if (q >= x) {
      return y
    }

    y++
  }
}

export function chunkFloat32Array(array: Float32Array, chunkSize: number, radius = 1): Vector3[] {
  const chunkedArrays: Vector3[] = []

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = Array.from(array.subarray(i, i + chunkSize))
    const vector = new Vector3(chunk[0], chunk[1], chunk[2])

    // 교차점 vertex 제거
    if (Math.abs(vector.y) !== radius) {
      chunkedArrays.push(vector)
    }
  }

  return chunkedArrays
}

export function getRandomPositionConsideringPanels(panelNum: number): Vector3 {
  const x = panelNum * 0.5 - 0.5
  return new Vector3(Math.random() * x * 2 - x, Math.random() * 2 - 1, Math.random() * x * 2 - x)
}

export function getRandomUniqueElements<T>(arr: T[], n: number): T[] {
  if (n >= arr.length) {
    throw new Error('n은 배열의 길이보다 작아야 합니다.')
  }

  const shuffled = [...arr]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, n)
}

export function vector3ToTweenValue(vector3: Vector3): any {
  return {
    x: vector3.x,
    y: vector3.y,
    z: vector3.z,
  }
}
