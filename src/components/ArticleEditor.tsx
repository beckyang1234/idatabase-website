'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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

interface ArticleEditorProps {
  articleId?: string
  isEdit?: boolean
}

export default function ArticleEditor({ articleId, isEdit = false }: ArticleEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: 'LATEST' as 'LATEST' | 'EXPERIENCE' | 'TIMELINE',
    isPaid: false,
    price: 0,
    author: '管理员'
  })

  useEffect(() => {
    if (isEdit && articleId) {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      const article = articles.find((a: Article) => a.id === articleId)
      if (article) {
        setFormData({
          title: article.title,
          content: article.content,
          summary: article.summary,
          category: article.category,
          isPaid: article.isPaid,
          price: article.price,
          author: article.author
        })
      }
    }
  }, [isEdit, articleId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      const now = new Date().toISOString().split('T')[0]

      if (isEdit && articleId) {
        // 编辑现有文章
        const articleIndex = articles.findIndex((a: Article) => a.id === articleId)
        if (articleIndex !== -1) {
          articles[articleIndex] = {
            ...articles[articleIndex],
            ...formData,
            updatedAt: now
          }
        }
      } else {
        // 创建新文章
        const newArticle = {
          id: Date.now().toString(),
          ...formData,
          createdAt: now,
          updatedAt: now
        }
        articles.push(newArticle)
      }

      localStorage.setItem('articles', JSON.stringify(articles))
      
      router.push('/admin/articles')
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        const imageHtml = `\n\n<img src="${imageUrl}" alt="上传的图片" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;" />\n\n`
        setFormData(prev => ({
          ...prev,
          content: prev.content + imageHtml
        }))
      }
      reader.readAsDataURL(file)
    }
  }

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
              <Link href="/admin/articles" className="text-slate-300 hover:text-white">
                文章管理
              </Link>
              <span className="text-slate-400">›</span>
              <span className="text-slate-300">{isEdit ? '编辑文章' : '新建文章'}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? '编辑文章' : '新建文章'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 文章标题 */}
              <div className="space-y-2">
                <Label htmlFor="title">文章标题</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="请输入文章标题"
                  required
                />
              </div>

              {/* 文章摘要 */}
              <div className="space-y-2">
                <Label htmlFor="summary">文章摘要</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="请输入文章摘要，将显示在文章列表中"
                  rows={3}
                  required
                />
              </div>

              {/* 分类和设置 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>文章分类</Label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  >
                    <option value="LATEST">最新动态</option>
                    <option value="EXPERIENCE">经验分享</option>
                    <option value="TIMELINE">时间线</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">作者</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="作者名称"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">文章价格</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.1"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                    disabled={!formData.isPaid}
                  />
                </div>
              </div>

              {/* 付费设置 */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isPaid}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPaid: e.target.checked, price: e.target.checked ? prev.price : 0 }))}
                  className="w-4 h-4"
                />
                <Label>付费文章</Label>
              </div>

              {/* 图片上传 */}
              <div className="space-y-2">
                <Label htmlFor="image">添加图片</Label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-slate-500">选择图片后会自动插入到文章内容中</p>
              </div>

              {/* 文章内容 */}
              <div className="space-y-2">
                <Label htmlFor="content">文章内容</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="请输入文章内容，支持HTML格式。图片上传后会自动插入。&#10;&#10;示例格式：&#10;<p>这是一个段落</p>&#10;<h2>这是标题</h2>&#10;<strong>这是粗体文字</strong>"
                  rows={20}
                  className="font-mono text-sm"
                  style={{
                    lineHeight: '1.6',
                    fontSize: '14px'
                  }}
                  required
                />
                <p className="text-sm text-slate-500">
                  支持HTML标签。建议使用：&lt;p&gt;段落&lt;/p&gt;、&lt;h2&gt;标题&lt;/h2&gt;、&lt;strong&gt;粗体&lt;/strong&gt;等标签
                </p>
              </div>

              {/* 提交按钮 */}
              <div className="flex items-center space-x-4">
                <Button type="submit" disabled={isLoading} className="bg-slate-900 hover:bg-slate-800">
                  {isLoading ? '保存中...' : (isEdit ? '更新文章' : '发布文章')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}