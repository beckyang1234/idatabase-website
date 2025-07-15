// 在 VS Code 中创建 src/app/register/page.tsx
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-slate-900">创建账户</CardTitle>
            <CardDescription className="text-slate-600">
              注册以访问更多内容
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">姓名</Label>
              <Input
                id="name"
                type="text"
                placeholder="您的姓名"
                className="border-slate-200 focus:border-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="border-slate-200 focus:border-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-slate-200 focus:border-slate-400"
              />
            </div>
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
              注册
            </Button>
            <div className="text-center text-sm text-slate-600">
              已有账户？{' '}
              <Link href="/login" className="text-slate-900 hover:underline font-medium">
                立即登录
              </Link>
            </div>
            <div className="text-center">
              <Link href="/" className="text-slate-500 hover:text-slate-700 text-sm">
                ← 返回首页
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}