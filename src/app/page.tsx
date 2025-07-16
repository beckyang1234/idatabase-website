import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              iDatabase
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/latest" className="text-slate-600 hover:text-slate-900 font-medium">
                最新动态
              </Link>
              <Link href="/experience" className="text-slate-600 hover:text-slate-900 font-medium">
                经验分享
              </Link>
              <Link href="/timeline" className="text-slate-600 hover:text-slate-900 font-medium">
                时间线
              </Link>
              <div className="flex items-center space-x-3">
                <Button asChild variant="outline" size="sm" className="border-slate-300 text-slate-700">
                  <Link href="/login">登录</Link>
                </Button>
                <Button asChild size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
                  <Link href="/register">注册</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* 英雄区域 */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            加拿大移民信息平台
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            获取最新移民政策、专业申请经验和重要时间节点，助您顺利移民加拿大
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3">
              <Link href="/latest">了解最新政策</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-700 px-8 py-3">
              <Link href="/register">免费注册</Link>
            </Button>
          </div>
        </section>

        {/* 功能卡片 */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="pb-4 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">📰</span>
              </div>
              <CardTitle className="text-slate-900">最新动态</CardTitle>
              <CardDescription className="text-slate-600">
                最新的加拿大移民政策变化和重要通知
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="/latest">查看最新动态</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="pb-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🍁</span>
              </div>
              <CardTitle className="text-slate-900">经验分享</CardTitle>
              <CardDescription className="text-slate-600">
                真实移民案例分享和专业申请经验
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="/experience">浏览经验分享</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="pb-4 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">📅</span>
              </div>
              <CardTitle className="text-slate-900">时间线</CardTitle>
              <CardDescription className="text-slate-600">
                重要移民政策时间节点和申请流程
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="/timeline">查看时间线</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* 特色内容 */}
        <section className="bg-white rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">为什么选择我们</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              我们致力于为您提供最准确的移民信息和最专业的申请指导
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">专业可靠</h3>
                <p className="text-slate-600">由移民专业人士提供的准确信息</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">及时更新</h3>
                <p className="text-slate-600">实时跟踪加拿大移民政策变化</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">深度分析</h3>
                <p className="text-slate-600">详细解读政策变化对申请的影响</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">微信分享</h3>
                <p className="text-slate-600">一键分享到微信，方便收藏</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">iDatabase</h3>
            <p className="text-slate-400 mb-6">加拿大移民信息平台，助您在移民路上保持领先</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/latest" className="hover:text-white">最新动态</Link>
              <Link href="/experience" className="hover:text-white">经验分享</Link>
              <Link href="/timeline" className="hover:text-white">时间线</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700 text-sm text-slate-500">
              © 2025 iDatabase. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}