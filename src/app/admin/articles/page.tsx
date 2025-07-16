import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// 临时设置为 true 以便访问管理后台
const isAuthenticated = true

export default function AdminPage() {
  // 如果未登录，重定向到管理员登录页面
  if (!isAuthenticated) {
    // redirect('/admin-login') - 暂时注释掉避免错误
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">iDatabase 管理后台</h1>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">管理员</span>
              <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Link href="/">返回网站</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">管理控制台</h1>
          <p className="text-slate-600">内容管理和用户管理</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900">文章管理</CardTitle>
              <CardDescription className="text-slate-600">创建、编辑和管理移民信息文章</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="/admin/articles">管理文章</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900">用户管理</CardTitle>
              <CardDescription className="text-slate-600">管理注册用户和权限</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">管理用户</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900">订单管理</CardTitle>
              <CardDescription className="text-slate-600">查看和管理付费订单</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">查看订单</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900">数据统计</CardTitle>
              <CardDescription className="text-slate-600">查看访问量和收入统计</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">查看统计</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900">收款管理</CardTitle>
              <CardDescription className="text-slate-600">管理支付方式和收款账户</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">收款设置</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900">系统设置</CardTitle>
              <CardDescription className="text-slate-600">网站配置和系统设置</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">系统设置</Button>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">数据概览</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-2">1,234</div>
                <div className="text-slate-600">总用户数</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-2">89</div>
                <div className="text-slate-600">文章总数</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-2">456</div>
                <div className="text-slate-600">付费订单</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-2">¥12,345</div>
                <div className="text-slate-600">本月收入</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}