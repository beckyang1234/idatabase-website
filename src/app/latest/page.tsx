import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const articles = [
  {
    id: '1',
    title: '2025年快速通道（Express Entry）最新变化',
    summary: '联邦政府宣布Express Entry系统的重要调整，包括CRS评分标准变化和新的邀请策略...',
    isPaid: false,
    price: 0,
    views: 1234,
    createdAt: '2025-01-15',
    author: { nickname: '移民顾问张老师' }
  },
  {
    id: '2',
    title: 'PNP省提名项目2025年配额分析',
    summary: '各省移民局公布了2025年省提名配额，安省、BC省、阿省等热门省份的配额变化详解...',
    isPaid: true,
    price: 19.9,
    views: 567,
    createdAt: '2025-01-14',
    author: { nickname: '移民专家李顾问' }
  },
  {
    id: '3',
    title: '加拿大学签新政策解读',
    summary: 'IRCC发布学习许可申请新要求，包括语言成绩、资金证明和学习计划的最新标准...',
    isPaid: true,
    price: 15.9,
    views: 890,
    createdAt: '2025-01-13',
    author: { nickname: '教育顾问王老师' }
  },
  {
    id: '4',
    title: '魁北克移民项目最新动态',
    summary: '魁省移民局发布CSQ申请新规定，法语要求和投资移民政策均有重大调整...',
    isPaid: false,
    price: 0,
    views: 756,
    createdAt: '2025-01-12',
    author: { nickname: '魁省移民专家' }
  }
]

export default function LatestPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">最新动态</h1>
          <p className="text-slate-600">最新的加拿大移民政策变化和重要通知</p>
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