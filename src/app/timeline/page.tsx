import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const timelineEvents = [
  {
    id: '9',
    title: '2025-01-15: Express Entry第一轮邀请结果',
    summary: 'IRCC发出2025年首轮Express Entry邀请，CRS分数线为485分，共邀请4500人...',
    date: '2025-01-15',
    time: '14:30',
    isPaid: false
  },
  {
    id: '10',
    title: '2025-01-14: 安省PNP新增Tech职业类别',
    summary: '安大略省提名项目新增科技人才类别，为AI、机器学习等新兴技术岗位开辟快速通道...',
    date: '2025-01-14',
    time: '09:15',
    isPaid: true
  },
  {
    id: '11',
    title: '2025-01-13: 魁省投资移民项目重启',
    summary: '魁北克省宣布重启投资移民项目，投资金额调整为200万加元，申请条件有重大变化...',
    date: '2025-01-13',
    time: '10:00',
    isPaid: false
  },
  {
    id: '12',
    title: '2025-01-12: 联邦自雇移民审理时间更新',
    summary: '联邦自雇移民项目最新审理时间公布，目前平均处理周期为31个月...',
    date: '2025-01-12',
    time: '16:45',
    isPaid: false
  }
]

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">时间线</h1>
          <p className="text-slate-600">重要移民政策时间节点和申请流程</p>
        </header>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event) => (
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