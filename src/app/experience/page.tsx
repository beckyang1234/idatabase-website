import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const experienceArticles = [
  {
    id: '5',
    title: '从申请到登陆：我的加拿大技术移民全程记录',
    summary: '分享完整的Express Entry申请过程，包括雅思备考、ECA学历认证、工作经验证明等每个环节的详细经验...',
    isPaid: true,
    price: 29.9,
    views: 2345,
    createdAt: '2025-01-12',
    author: { nickname: '成功移民的程序员' }
  },
  {
    id: '6',
    title: '加拿大配偶团聚移民申请指南',
    summary: '详细介绍配偶团聚移民的申请条件、材料准备、面试经验和常见问题解答...',
    isPaid: false,
    price: 0,
    views: 1678,
    createdAt: '2025-01-11',
    author: { nickname: '移民律师陈女士' }
  },
  {
    id: '7',
    title: 'PEI省提名项目申请经验分享',
    summary: '爱德华王子岛省提名项目的详细申请流程，包括商业考察、投资要求和移民监解析...',
    isPaid: true,
    price: 25.0,
    views: 1234,
    createdAt: '2025-01-10',
    author: { nickname: 'PEI成功案例' }
  },
  {
    id: '8',
    title: '加拿大留学转移民完整攻略',
    summary: '从选择学校和专业到毕业后申请工签，再到最终获得永居身份的完整路径规划...',
    isPaid: true,
    price: 35.0,
    views: 3456,
    createdAt: '2025-01-09',
    author: { nickname: '留学移民顾问' }
  }
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">经验分享</h1>
          <p className="text-slate-600">真实移民案例分享和专业申请经验</p>
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