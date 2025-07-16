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
  const defaultArticles: Record<string, Article> = {
    '1': {
      id: '1',
      title: '2025年快速通道（Express Entry）最新变化',
      content: `
        <div class="prose max-w-none">
          <p>联邦政府宣布Express Entry系统的重要调整，包括CRS评分标准变化和新的邀请策略。</p>
          
          <h2>主要变化内容</h2>
          
          <h3>1. CRS评分调整</h3>
          <p>新的评分标准更加重视加拿大工作经验和法语能力：</p>
          <ul>
            <li>加拿大工作经验加分提高</li>
            <li>法语能力额外加分</li>
            <li>STEM专业学历获得优先考虑</li>
          </ul>
          
          <h3>2. 邀请频率增加</h3>
          <p>从每月一次调整为每两周一次，为申请人提供更多机会。</p>
          
          <h2>对申请人的影响</h2>
          <p>这些变化为具有加拿大经验和法语能力的申请人创造了更多机会，建议符合条件的申请人尽快提交申请。</p>
        </div>
      `,
      isPaid: false,
      price: 0,
      views: 1234,
      createdAt: '2025-01-15',
      author: { nickname: '移民顾问张老师' }
    },
    '2': {
      id: '2',
      title: 'PNP省提名项目2025年配额分析',
      content: `
        <div class="prose max-w-none">
          <p>各省移民局公布了2025年省提名配额，安省、BC省、阿省等热门省份的配额变化详解。</p>
          
          <h2>主要省份配额情况</h2>
          <p>2025年配额分配情况分析...</p>
        </div>
        
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-8">
          <div class="text-center">
            <h3 class="text-lg font-semibold text-slate-900 mb-2">解锁完整内容</h3>
            <p class="text-slate-600 mb-4">查看完整的省提名配额分析和申请建议</p>
            <div class="flex items-center justify-center space-x-4">
              <span class="text-2xl font-bold text-blue-600">¥19.9</span>
              <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                立即购买
              </button>
            </div>
            <p class="text-sm text-slate-500 mt-2">支持微信支付 • 即买即看</p>
          </div>
        </div>
      `,
      isPaid: true,
      price: 19.9,
      views: 567,
      createdAt: '2025-01-14',
      author: { nickname: '移民专家李顾问' }
    }
  }
  
  return defaultArticles[id] || {
    id: id,
    title: `加拿大移民文章 ${id}`,
    content: '<div class="prose max-w-none"><p>文章内容加载中...</p></div>',
    isPaid: false,
    price: 0,
    views: 0,
    createdAt: '2025-01-15',
    author: { nickname: '移民顾问' }
  }
}

export async function generateStaticParams() {
  return [
    { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, 
    { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }
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
              <Badge variant="default">加拿大移民</Badge>
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
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>

        {/* 相关推荐 - 使用简单的 div 替代 Card */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">相关推荐</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">
                <Link href="/article/1" className="hover:text-blue-600">
                  Express Entry最新变化
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                2025年快速通道系统的重要调整...
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>移民顾问张老师</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">免费</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">
                <Link href="/article/2" className="hover:text-blue-600">
                  省提名配额分析
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                各省移民局2025年配额详解...
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>移民专家李顾问</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded">¥19.9</span>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}