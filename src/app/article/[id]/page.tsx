import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Article {
  id: string
  title: string
  content: string
  isPaid: boolean
  price: number
  views: number
  createdAt: string
  author: { nickname: string }
}

const getArticle = (id: string): Article => {
  const articles: Record<string, Article> = {
    '1': {
      id: '1',
      title: '2025年全球经济趋势分析',
      content: '这是一篇关于2025年全球经济趋势的详细分析文章。文章内容包括通胀预期、货币政策走向等关键因素的深入探讨...',
      isPaid: false,
      price: 0,
      views: 1234,
      createdAt: '2025-01-15',
      author: { nickname: '经济观察员' }
    },
    '2': {
      id: '2',
      title: '美联储政策解读：下一步走向',
      content: '美联储最新会议纪要显示...',
      isPaid: true,
      price: 9.9,
      views: 567,
      createdAt: '2025-01-14',
      author: { nickname: '金融分析师' }
    }
  }
  
  return articles[id] || {
    id: id,
    title: `文章 ${id}`,
    content: `这是文章 ${id} 的内容。`,
    isPaid: false,
    price: 0,
    views: 0,
    createdAt: '2025-01-15',
    author: { nickname: '作者' }
  }
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params
  const article = getArticle(id)

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-slate-900">
              iDatabase
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/latest" className="text-slate-600 hover:text-slate-900">最新动态</Link>
              <Link href="/experience" className="text-slate-600 hover:text-slate-900">经验分享</Link>
              <Link href="/timeline" className="text-slate-600 hover:text-slate-900">时间线</Link>
              <Button variant="outline" size="sm">登录</Button>
            </div>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <header className="p-8 border-b">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="default">最新动态</Badge>
              {article.isPaid && (
                <Badge variant="destructive">付费内容 ¥{article.price}</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-4">
                <span>{article.author.nickname}</span>
                <span>{article.createdAt}</span>
                <span>{article.views} 阅读</span>
              </div>
              
              <Button variant="outline" size="sm">
                分享到微信
              </Button>
            </div>
          </header>

          <div className="p-8">
            <div className="prose max-w-none">
              <p className="text-slate-700 leading-7">{article.content}</p>
              
              {article.isPaid && article.id === '2' && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">解锁完整内容</h3>
                    <p className="text-slate-600 mb-4">查看完整的美联储政策分析和投资建议</p>
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-2xl font-bold text-blue-600">¥{article.price}</span>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        立即购买
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">支持微信支付 • 即买即看</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}