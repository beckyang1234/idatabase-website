import Link from 'next/link'

export default function ArticleIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">文章页面</h1>
        <p className="text-slate-600 mb-6">请选择具体的文章查看</p>
        <Link href="/" className="text-blue-600 hover:underline">
          返回首页
        </Link>
      </div>
    </div>
  )
}