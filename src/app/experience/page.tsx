import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const experienceArticles = [
  {
    id: '4',
    title: '十年交易心得：如何在市场中生存',
    summary: '分享十年交易经验，从新手到专业交易员的成长路径，包括风险控制、心态管理等...',
    isPaid: true,
    price: 29.9,
    views: 2345,
    createdAt: '2025-01-12',
    author: { nickname: '资深交易员' }
  },
  {
    id: '5',
    title: '价值投资实战指南',
    summary: '巴菲特式价值投资方法在A股市场的实践应用，包括公司分析框架、估值方法等...',
    isPaid: false,
    price: 0,
    views: 1678,
    createdAt: '2025-01-11',
    author: { nickname: '价值投资者' }
  }
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">经验分享</h1>
          <p className="text-gray-600">深度分析和专业见解分享</p>
        </header>

        <div className="grid gap-6">
          {experienceArticles.map((article) => (
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
      </div>
    </div>
  )
}