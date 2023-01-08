export interface User {
  id: string
  email: string
  nickname: string
}

export interface Post {
  id: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    nickname: string
  }
}
