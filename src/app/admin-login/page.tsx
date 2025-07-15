// 在 VS Code 中创建 src/app/admin-login/page.tsx
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield } from 'lucide-react'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-slate-700 bg-slate-800">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-slate-300" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-100">管理员登录</CardTitle>
            <CardDescription className="text-slate-400">
              仅限授权管理员访问
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-slate-300">管理员邮箱</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@idatebase.online"
                className="border-slate-600 bg-slate-700 text-slate-100 focus:border-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-slate-300">管理员密码</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                className="border-slate-600 bg-slate-700 text-slate-100 focus:border-slate-400"
              />
            </div>
            <Button className="w-full bg-slate-600 hover:bg-slate-500 text-white">
              登录管理后台
            </Button>
            <div className="text-center">
              <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm">
                ← 返回网站首页
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
