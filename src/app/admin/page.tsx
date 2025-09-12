'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase, type Article } from '@/lib/supabase'

// 定义表单数据类型
interface FormData {
  title: string
  content: string
  htmlContent: string
  createdAt: string
  image: File | null
}

// 简单的富文本编辑器工具栏
const SimpleEditor = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null)

  const executeCommand = (command: string, value?: string) => {
    try {
      document.execCommand(command, false, value)
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML)
      }
    } catch (error) {
      console.warn('Editor command failed:', command, error)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  return (
    <div style={{ border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
      {/* 工具栏 */}
      <div style={{ 
        backgroundColor: '#f9fafb', 
        borderBottom: '1px solid #d1d5db', 
        padding: '8px 12px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          style={{
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          style={{
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            fontStyle: 'italic'
          }}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          style={{
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            textDecoration: 'underline'
          }}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => executeCommand('foreColor', '#dc2626')}
          style={{
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#dc2626'
          }}
        >
          红色
        </button>
        <button
          type="button"
          onClick={() => executeCommand('foreColor', '#2563eb')}
          style={{
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#2563eb'
          }}
        >
          蓝色
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          style={{
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          • 列表
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', 'h3')}
          style={{
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          H3
        </button>
      </div>
      
      {/* 编辑区域 */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          minHeight: '250px',
          padding: '16px',
          lineHeight: '1.6',
          fontSize: '14px',
          outline: 'none'
        }}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    htmlContent: '',
    createdAt: new Date().toISOString().split('T')[0],
    image: null
  })

  useEffect(() => {
    // 简单的本地认证检查
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuth')
      const isAuth = auth === 'true'
      setIsAuthenticated(isAuth)
      
      if (isAuth) {
        loadArticles()
      }
    }
    
    setIsLoading(false)
  }, [])

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setArticles(data || [])
    } catch (error) {
      console.error('Error loading articles:', error)
      alert('加载文章失败，请检查网络连接')
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

  const handleAddArticle = async () => {
    if (!formData.title || !formData.htmlContent) {
      alert('请填写标题和内容')
      return
    }

    setIsSaving(true)

    try {
      // 检查是否已包含免责声明，简单文本检查
      const disclaimerText = '本网站内容仅供交流学习，不构成任何投资建议，盈亏自负。'
      let finalContent = formData.htmlContent
      
      if (!finalContent.includes(disclaimerText)) {
        finalContent += '<div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 16px; margin-top: 24px; font-size: 14px; color: #92400e; font-weight: 500;">本网站内容仅供交流学习，不构成任何投资建议，盈亏自负。</div>'
      }

      const newArticle = {
        title: formData.title,
        content: formData.content || formData.htmlContent.replace(/<[^>]*>/g, ''),
        html_content: finalContent,
        image_url: '', // 暂时不支持图片上传，后续可扩展
        created_at: formData.createdAt,
        views: Math.floor(Math.random() * 1000) + 100,
        likes: Math.floor(Math.random() * 100) + 10
      }

      const { error } = await supabase
        .from('articles')
        .insert([newArticle])

      if (error) throw error

      alert('文章发布成功！')
      await loadArticles() // 重新加载文章列表
      
      // 重置表单
      setFormData({ 
        title: '', 
        content: '', 
        htmlContent: '', 
        createdAt: new Date().toISOString().split('T')[0],
        image: null 
      })
      setShowAddForm(false)

    } catch (error) {
      console.error('Error adding article:', error)
      alert('发布文章失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article)
    
    // 编辑时，移除免责声明让用户编辑纯内容
    let editContent = article.html_content || article.content
    const disclaimerText = '本网站内容仅供交流学习，不构成任何投资建议，盈亏自负。'
    
    // 如果包含免责声明，就尝试移除它
    if (editContent.includes(disclaimerText)) {
      const lastIndex = editContent.lastIndexOf('<div')
      if (lastIndex > -1) {
        const beforeDiv = editContent.substring(0, lastIndex)
        const afterDiv = editContent.substring(lastIndex)
        if (afterDiv.includes(disclaimerText)) {
          editContent = beforeDiv.trim()
        }
      }
    }
    
    setFormData({
      title: article.title,
      content: article.content,
      htmlContent: editContent,
      createdAt: article.created_at,
      image: null
    })
    setShowAddForm(false)
  }

  const handleUpdateArticle = async () => {
    if (!formData.title || !formData.htmlContent || !editingArticle) {
      alert('请填写标题和内容')
      return
    }

    setIsSaving(true)

    try {
      // 检查是否已包含免责声明
      const disclaimerText = '本网站内容仅供交流学习，不构成任何投资建议，盈亏自负。'
      let finalContent = formData.htmlContent
      
      if (!finalContent.includes(disclaimerText)) {
        finalContent += '<div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 16px; margin-top: 24px; font-size: 14px; color: #92400e; font-weight: 500;">本网站内容仅供交流学习，不构成任何投资建议，盈亏自负。</div>'
      }

      const { error } = await supabase
        .from('articles')
        .update({
          title: formData.title,
          content: formData.content || formData.htmlContent.replace(/<[^>]*>/g, ''),
          html_content: finalContent,
          created_at: formData.createdAt,
        })
        .eq('id', editingArticle.id)

      if (error) throw error

      alert('文章更新成功！')
      await loadArticles() // 重新加载文章列表
      
      setEditingArticle(null)
      setFormData({ 
        title: '', 
        content: '', 
        htmlContent: '', 
        createdAt: new Date().toISOString().split('T')[0],
        image: null 
      })

    } catch (error) {
      console.error('Error updating article:', error)
      alert('更新文章失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('确定要删除这篇文章吗？')) return

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) throw error

      alert('文章删除成功！')
      await loadArticles() // 重新加载文章列表

    } catch (error) {
      console.error('Error deleting article:', error)
      alert('删除文章失败，请重试')
    }
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth')
    }
    setIsAuthenticated(false)
    setPassword('')
  }

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
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={() => {
              setShowAddForm(!showAddForm)
              setEditingArticle(null)
              setFormData({ 
                title: '', 
                content: '', 
                htmlContent: '', 
                createdAt: new Date().toISOString().split('T')[0],
                image: null 
              })
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
                setFormData({ 
                  title: '', 
                  content: '', 
                  htmlContent: '', 
                  createdAt: new Date().toISOString().split('T')[0],
                  image: null 
                })
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

          {/* 状态提示 */}
          {isSaving && (
            <span style={{ color: '#2563eb', fontSize: '14px' }}>保存中...</span>
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
                发布日期
              </label>
              <input
                type="date"
                value={formData.createdAt}
                onChange={(e) => setFormData({...formData, createdAt: e.target.value})}
                style={{ 
                  width: '200px', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                文章内容
              </label>
              <SimpleEditor
                value={formData.htmlContent}
                onChange={(content) => setFormData({...formData, htmlContent: content})}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
                提示：免责声明会自动添加到文章末尾，无需手动添加
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                上传图片（暂不支持）
              </label>
              <input
                type="file"
                accept="image/*"
                disabled
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  opacity: 0.5
                }}
              />
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#6b7280' }}>
                图片上传功能将在后续版本中添加
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={editingArticle ? handleUpdateArticle : handleAddArticle}
                disabled={isSaving}
                style={{ 
                  backgroundColor: isSaving ? '#9ca3af' : '#dc2626', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '6px',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {isSaving ? '保存中...' : (editingArticle ? '保存修改' : '发布文章')}
              </button>
              
              <button 
                onClick={() => {
                  setShowAddForm(false)
                  setEditingArticle(null)
                  setFormData({ 
                    title: '', 
                    content: '', 
                    htmlContent: '', 
                    createdAt: new Date().toISOString().split('T')[0],
                    image: null 
                  })
                }}
                disabled={isSaving}
                style={{ 
                  backgroundColor: '#6b7280', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '6px',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
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
                      <span>发布时间：{article.created_at}</span>
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
                      onClick={() => handleDeleteArticle(article.id!)}
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
