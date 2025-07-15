import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const articles = [
  {
    id: '1',
    title: '2025年全球经济趋势分析',
    summary: '深入分析2025年全球经济发展趋势，包括通胀预期、货币政策走向等关键因素...',
    isPaid: false,
    price: 0,
    views: 1234,
    createdAt: '2025-01-15',
    author: { nickname: '经济观察员' }
  },
  {
    id: '2',
    title: '美联储政策解读：下一步走向',
    summary: '最新美联储会议纪要解读，分析未来货币政策可能的调整方向...',
    isPaid: true,
    price: 9.9,
    views: 567,
    createdAt: '2025-01-14',
    author: { nickname: '金融分析师' }
  },
  {
    id: '3',
    title: 'A股市场投资机会梳理',
    summary: '当前A股市场投资机会分析，重点关注的板块和个股推荐...',
    isPaid: true,
    price: 19.9,
    views: 890,
    createdAt: '2025-01-13',
    author: { nickname: '投资顾问' }
  }
]

export default function LatestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">最新动态</h1>
          <p className="text-gray-600">实时更新的行业资讯和重要信息</p>
        </header>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 hover:text-blue-600">
                      <Link href={`/article/${article.id}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {article.summary}
                    </CardDescription>
                  </div>
                  {article.isPaid && (
                    <Badge variant="destructive" className="ml-4">
                      付费 ¥{article.price}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>作者: {article.author.nickname}</span>
                    <span>阅读: {article.views}</span>
                    <span>{article.createdAt}</span>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/article/${article.id}`}>
                      阅读全文
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">加载更多</Button>
        </div>
      </div>
    </div>
  )
}