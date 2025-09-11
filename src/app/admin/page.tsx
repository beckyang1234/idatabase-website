'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// 定义文章类型接口
interface Article {
  id: number
  title: string
  content: string
  imageUrl: string
  createdAt: string
  views: number
  likes: number
}

// 定义表单数据类型
interface FormData {
  title: string
  content: string
  image: File | null
}

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([])  // 替换 any[]
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)  // 替换 any
  const [isClient, setIsClient] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image: null
  })

  useEffect(() => {
    setIsClient(true)
    const auth = localStorage.getItem('adminAuth')
    setIsAuthenticated(auth === 'true')
    
    if (auth === 'true') {
      loadArticles()
    }
  }, [])

  const loadArticles = () => {
    const savedArticles = localStorage.getItem('articles')
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles))
    }
  }

  const saveArticles = (newArticles: Article[]) => {
    localStorage.setItem('articles', JSON.stringify(newArticles))
    setArticles(newArticles)
  }

  const handleLogin = () => {
    if (password === 'admin2025') {
      localStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      loadArticles()
    } else {
      alert('密码错误')
    }
  }

  const handleAddArticle = () => {
    if (!formData.title || !formData.content) {
      alert('请填写标题和内容')
      return
    }

    const newArticle: Article = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : '',
      createdAt: new Date().toISOString().split('T')[0],
      views: Math.floor(Math.random() * 1000) + 100,
      likes: Math.floor(Math.random() * 100) + 10
    }

    const newArticles = [newArticle, ...articles]
    saveArticles(newArticles)
    setFormData({ title: '', content: '', image: null })
    setShowAddForm(false)
  }

  const handleEditArticle = (article: Article) => {  // 添加参数类型
    setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      image: null
    })
    setShowAddForm(false)
  }

  const handleUpdateArticle = () => {
    if (!formData.title || !formData.content || !editingArticle) {
      alert('请填写标题和内容')
      return
    }

    const updatedArticles = articles.map(article => 
      article.id === editingArticle.id 
        ? {
            ...article,
            title: formData.title,
            content: formData.content,
            imageUrl: formData.image ? URL.createObjectURL(formData.image) : article.imageUrl
          }
        : article
    )

    saveArticles(updatedArticles)
    setEditingArticle(null)
    setFormData({ title: '', content: '', image: null })
  }

  const handleDeleteArticle = (id: number) => {
    if (confirm('确定要删除这篇文章吗？')) {
      const newArticles = articles.filter(article => article.id !== id)
      saveArticles(newArticles)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setPassword('')
  }

  // 防止hydration error
  if (!isClient) {
    return <div>加载中...</div>
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          padding: '40px', 
          width: '400px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#1f2937' }}>
            管理后台登录
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入管理密码"
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              border: '2px solid #e5e7eb', 
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '16px'
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button 
            onClick={handleLogin}
            style={{ 
              width: '100%',
              backgroundColor: '#dc2626', 
              color: 'white', 
              border: 'none', 
              padding: '12px', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* 管理后台头部 */}
      <header style={{ backgroundColor: '#1f2937', color: 'white', padding: '0 20px' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px'
        }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>荐股龙虎榜 - 管理后台</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link 
              href="/"
              style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '14px' }}
            >
              返回首页
            </Link>
            <button 
              onClick={handleLogout}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#d1d5db', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      {/* 其余管理后台代码保持不变... */}
    </div>
  )
}
