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
            专业内容平台
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            获取最新动态、专业经验分享和重要时间线，助您在信息时代保持领先
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3">
              <Link href="/latest">开始阅读</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-700 px-8 py-3">
              <Link href="/register">免费注册</Link>
            </Button>
          </div>
        </section>

        {/* 功能卡片 */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle className="text-slate-900">最新动态</CardTitle>
              <CardDescription className="text-slate-600">
                实时更新的行业资讯和重要信息，让您第一时间掌握市场动向
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="/latest">查看最新动态</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <CardTitle className="text-slate-900">经验分享</CardTitle>
              <CardDescription className="text-slate-600">
                专业人士的深度分析和实战经验，帮您避坑并快速成长
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="/experience">浏览经验分享</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <CardTitle className="text-slate-900">时间线</CardTitle>
              <CardDescription className="text-slate-600">
                按时间顺序展示的重要事件，清晰了解发展脉络
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">为什么选择 iDatabase</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              我们致力于为您提供最有价值的内容和最佳的阅读体验
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">专业内容</h3>
                <p className="text-slate-600">由行业专家撰写的高质量文章</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">及时更新</h3>
                <p className="text-slate-600">实时跟踪最新行业动态</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">付费精品</h3>
                <p className="text-slate-600">深度分析内容，物超所值</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-slate-600">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">微信分享</h3>
                <p className="text-slate-600">一键分享到微信，方便快捷</p>
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
            <p className="text-slate-400 mb-6">专业内容平台，助您在信息时代保持领先</p>
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