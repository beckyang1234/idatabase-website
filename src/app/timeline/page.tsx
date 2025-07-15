import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const timelineEvents = [
  {
    id: '6',
    title: '2025-01-15: 美联储主席发表重要讲话',
    summary: '美联储主席在达沃斯论坛上发表了关于未来货币政策的重要讲话...',
    date: '2025-01-15',
    time: '14:30',
    isPaid: false
  },
  {
    id: '7',
    title: '2025-01-14: 中国央行调整MLF利率',
    summary: '中国人民银行调整中期借贷便利（MLF）操作利率，释放流动性信号...',
    date: '2025-01-14',
    time: '09:15',
    isPaid: true
  },
  {
    id: '8',
    title: '2025-01-13: 重要经济数据发布',
    summary: '国家统计局发布2024年四季度GDP数据，同比增长情况超预期...',
    date: '2025-01-13',
    time: '10:00',
    isPaid: false
  }
]

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">时间线</h1>
          <p className="text-gray-600">按时间顺序展示的重要事件</p>
        </header>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative flex items-start">
                <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow"></div>
                
                <div className="ml-16 flex-1">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-blue-600 font-medium">
                          {event.date} {event.time}
                        </div>
                        {event.isPaid && (
                          <Badge variant="destructive">付费内容</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg hover:text-blue-600">
                        <Link href={`/article/${event.id}`}>
                          {event.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {event.summary}
                      </CardDescription>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/article/${event.id}`}>
                          查看详情
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}