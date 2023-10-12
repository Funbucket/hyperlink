import User from '~/types/User'

export interface HoveredUserStore extends User {
  dispatchHoveredUser: (user: User) => void
}
