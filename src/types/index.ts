export interface User {
  id: string
  phone?: string
  wechatId?: string
  nickname: string
  avatar?: string
  email?: string
  role: 'ADMIN' | 'EDITOR' | 'VIP' | 'USER'
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  id: string
  title: string
  content: string
  summary?: string
  authorId: string
  category: 'LATEST' | 'EXPERIENCE' | 'TIMELINE'
  isPaid: boolean
  price?: number
  coverImage?: string
  views: number
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  createdAt: Date
  updatedAt: Date
  author: User
}

export interface Order {
  id: string
  userId: string
  articleId: string
  amount: number
  status: 'PENDING' | 'PAID' | 'CANCELLED'
  paymentMethod?: string
  createdAt: Date
}