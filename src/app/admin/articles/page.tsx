'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

interface Article {
  id: string
  title: string
  content: string
  summary: string
  category: 'LATEST' | 'EXPERIENCE' | 'TIMELINE'
  isPaid: boolean
  price: number
  author: string
  createdAt: string
  updatedAt: string
}

const getStoredArticles = (): Article[] => {
  if (typeof window !== 'undefined') {
    const articles = localStorage.getItem('articles')
    return articles ? JSON.parse(articles) : []
  }
  return []
}

const saveArticles = (articles: Article[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('articles', JSON.stringify(articles))
  }
}

export default function ArticlesManagePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    setArticles(getStoredArticles())
  }, [])

  const deleteArticle = (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      const updatedArticles = articles.filter(article => article.id !== id)
      setArticles(updatedArticles)
      saveArticles(updatedArticles)
    }
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 管理后台导航 */}
      <nav className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-xl font-bold hover:text-slate-300">
                iDatabase 管理后台
              </Link>
              <span className="text-slate-400">›</span>
              <span className="text-slate-300">文章管理</span>
            </div>
            <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Link href="/">返回网站</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 页面标题和操作 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">文章管理</h1>
            <p className="text-slate-600">管理网站的所有文章内容</p>
          </div>
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white">
            <Link href="/admin/articles/new">
              ➕ 新建文章
            </Link>
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="搜索文章标题..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md"
              >
                <option value="all">所有分类</option>
                <option value="LATEST">最新动态</option>
                <option value="EXPERIENCE">经验分享</option>
                <option value="TIMELINE">时间线</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* 文章列表 */}
        <div className="grid gap-6">
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-slate-500 mb-4">暂无文章，开始创建您的第一篇文章吧！</p>
                <Button asChild>
                  <Link href="/admin/articles/new">创建第一篇文章</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <CardDescription className="text-base mb-3">
                        {article.summary}
                      </CardDescription>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <Badge variant={
                          article.category === 'LATEST' ? 'default' :
                          article.category === 'EXPERIENCE' ? 'secondary' : 'outline'
                        }>
                          {article.category === 'LATEST' ? '最新动态' :
                           article.category === 'EXPERIENCE' ? '经验分享' : '时间线'}
                        </Badge>
                        {article.isPaid && (
                          <Badge variant="destructive">付费 ¥{article.price}</Badge>
                        )}
                        <span>作者: {article.author}</span>
                        <span>{article.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/article/${article.id}`}>
                        👁️ 预览
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/articles/edit/${article.id}`}>
                        ✏️ 编辑
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteArticle(article.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      🗑️ 删除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}