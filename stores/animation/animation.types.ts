export interface Animation {
  animationEnd: boolean
}

export interface AnimationStore extends Animation {
  dispatchAnimationEnd: (value: boolean) => void
}
