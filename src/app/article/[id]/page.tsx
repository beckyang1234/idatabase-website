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
    },
    '3': {
      id: '3',
      title: 'A股市场投资机会梳理',
      content: '当前A股市场投资机会分析，重点关注的板块和个股推荐...',
      isPaid: true,
      price: 19.9,
      views: 890,
      createdAt: '2025-01-13',
      author: { nickname: '投资顾问' }
    },
    '4': {
      id: '4',
      title: '十年交易心得：如何在市场中生存',
      content: '分享十年交易经验，从新手到专业交易员的成长路径...',
      isPaid: true,
      price: 29.9,
      views: 2345,
      createdAt: '2025-01-12',
      author: { nickname: '资深交易员' }
    },
    '5': {
      id: '5',
      title: '价值投资实战指南',
      content: '巴菲特式价值投资方法在A股市场的实践应用...',
      isPaid: false,
      price: 0,
      views: 1678,
      createdAt: '2025-01-11',
      author: { nickname: '价值投资者' }
    },
    '6': {
      id: '6',
      title: '美联储主席发表重要讲话',
      content: '美联储主席在达沃斯论坛上发表了关于未来货币政策的重要讲话...',
      isPaid: false,
      price: 0,
      views: 1156,
      createdAt: '2025-01-15',
      author: { nickname: '财经记者' }
    },
    '7': {
      id: '7',
      title: '中国央行调整MLF利率',
      content: '中国人民银行调整中期借贷便利（MLF）操作利率，释放流动性信号...',
      isPaid: true,
      price: 15.0,
      views: 789,
      createdAt: '2025-01-14',
      author: { nickname: '央行观察员' }
    },
    '8': {
      id: '8',
      title: '重要经济数据发布',
      content: '国家统计局发布2024年四季度GDP数据，同比增长情况超预期...',
      isPaid: false,
      price: 0,
      views: 2134,
      createdAt: '2025-01-13',
      author: { nickname: '数据分析师' }
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

// 生成静态路径
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' }
  ]
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
              <Button asChild variant="outline" size="sm">
                <Link href="/login">登录</Link>
              </Button>
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
              
              {article.isPaid && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">解锁完整内容</h3>
                    <p className="text-slate-600 mb-4">查看完整的分析和投资建议</p>
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