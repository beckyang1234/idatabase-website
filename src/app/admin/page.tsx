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
  const [articles, setArticles] = useState<Article[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // 新增加载状态
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image: null
  })

  useEffect(() => {
    // 确保在客户端才进行localStorage操作
    setIsClient(true)
    
    // 检查localStorage中的认证状态
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuth')
      const isAuth = auth === 'true'
      setIsAuthenticated(isAuth)
      
      if (isAuth) {
        loadArticles()
      }
    }
    
    setIsLoading(false) // 加载完成
  }, [])

  const loadArticles = () => {
    if (typeof window !== 'undefined') {
      const savedArticles = localStorage.getItem('articles')
      if (savedArticles) {
        try {
          setArticles(JSON.parse(savedArticles))
        } catch (error) {
          console.error('Failed to parse articles:', error)
          setArticles([])
        }
      }
    }
  }

  const saveArticles = (newArticles: Article[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('articles', JSON.stringify(newArticles))
      setArticles(newArticles)
    }
  }

  const handleLogin = () => {
    if (password === 'admin2025') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminAuth', 'true')
      }
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

  const handleEditArticle = (article: Article) => {
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth')
    }
    setIsAuthenticated(false)
    setPassword('')
  }

  // 加载中状态
  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#6b7280', fontSize: '16px' }}>加载中...</div>
      </div>
    )
  }

  // 未认证状态
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        
        {/* 操作按钮区 */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => {
              setShowAddForm(!showAddForm)
              setEditingArticle(null)
              setFormData({ title: '', content: '', image: null })
            }}
            style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {showAddForm ? '取消发布' : '发布新文章'}
          </button>
          
          {editingArticle && (
            <button 
              onClick={() => {
                setEditingArticle(null)
                setFormData({ title: '', content: '', image: null })
              }}
              style={{ 
                backgroundColor: '#6b7280', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              取消编辑
            </button>
          )}
        </div>

        {/* 发布/编辑表单 */}
        {(showAddForm || editingArticle) && (
          <div style={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px', 
            padding: '24px', 
            marginBottom: '24px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
              {editingArticle ? '编辑文章' : '发布新文章'}
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                文章标题
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                placeholder="输入文章标题"
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                文章内容
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={10}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
                placeholder="输入文章内容"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                上传图片
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={editingArticle ? handleUpdateArticle : handleAddArticle}
                style={{ 
                  backgroundColor: '#dc2626', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {editingArticle ? '保存修改' : '发布文章'}
              </button>
              
              <button 
                onClick={() => {
                  setShowAddForm(false)
                  setEditingArticle(null)
                  setFormData({ title: '', content: '', image: null })
                }}
                style={{ 
                  backgroundColor: '#6b7280', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* 文章列表 */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>文章管理 ({articles.length}篇)</h3>
          </div>
          
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div key={article.id} style={{ 
                padding: '20px', 
                borderBottom: index < articles.length - 1 ? '1px solid #f3f4f6' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>
                      {article.title}
                    </h4>
                    <p style={{ 
                      margin: '0 0 12px 0', 
                      color: '#6b7280', 
                      fontSize: '14px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {article.content.substring(0, 100)}...
                    </p>
                    <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', gap: '16px' }}>
                      <span>发布时间：{article.createdAt}</span>
                      <span>浏览：{article.views}</span>
                      <span>点赞：{article.likes}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    <button 
                      onClick={() => handleEditArticle(article)}
                      style={{ 
                        backgroundColor: '#2563eb', 
                        color: 'white', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      编辑
                    </button>
                    <button 
                      onClick={() => handleDeleteArticle(article.id)}
                      style={{ 
                        backgroundColor: '#dc2626', 
                        color: 'white', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
              暂无文章
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
