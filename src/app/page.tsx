'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// 定义文章类型接口
interface Article {
  id: number
  title: string
  content: string
  htmlContent?: string
  imageUrl: string
  createdAt: string
  views: number
  likes: number
}

// 截取摘要的函数
const getExcerpt = (content: string, maxLines: number = 3) => {
  const lines = content.split('\n').filter(line => line.trim() !== '')
  const excerpt = lines.slice(0, maxLines).join('\n')
  return excerpt.length < content.length ? excerpt + '...' : excerpt
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [showDonation, setShowDonation] = useState(false)
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedArticles = localStorage.getItem('articles')
      if (savedArticles) {
        try {
          const parsedArticles: Article[] = JSON.parse(savedArticles)
          const validArticles = parsedArticles.filter((article: Article) => 
            article && 
            typeof article.title === 'string' && 
            typeof article.content === 'string' &&
            !article.title.includes('CRS') && 
            !article.content.includes('CRS')
          )
          setArticles(validArticles)
        } catch (error) {
          console.error('Failed to parse articles:', error)
          // 如果解析失败，设置空数组而不是默认数据
          setArticles([])
        }
      } else {
        // 如果没有保存的文章，设置空数组而不是默认数据
        setArticles([])
      }
    }
    
    setIsLoading(false)
  }, [])

  const toggleArticle = (articleId: number) => {
    setExpandedArticleId(expandedArticleId === articleId ? null : articleId)
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <div style={{ 
          backgroundColor: '#dc2626', 
          color: '#fff', 
          textAlign: 'center', 
          padding: '10px 0',
          fontWeight: 'bold',
          borderBottom: '2px solid #b91c1c'
        }}>
          荐股龙虎榜 (荐股大赛@jiangudasai)
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          color: '#6b7280'
        }}>
          加载中...
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* 顶部标题栏 */}
      <div style={{ 
        backgroundColor: '#dc2626', 
        color: '#fff', 
        textAlign: 'center', 
        padding: '10px 0',
        fontWeight: 'bold',
        borderBottom: '2px solid #b91c1c'
      }}>
        荐股龙虎榜 (荐股大赛@jiangudasai)
      </div>

      {/* 导航栏 */}
      <nav style={{ 
        backgroundColor: '#ea580c', 
        color: '#fff',
        padding: '0 20px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '50px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>龙虎榜分析</h1>
            <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
              <span style={{ color: '#fff', cursor: 'pointer' }}>首页</span>
              <span style={{ color: '#fff', cursor: 'pointer' }}>分析</span>
              <span style={{ color: '#fff', cursor: 'pointer' }}>数据</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
            <button 
              onClick={() => setShowDonation(true)}
              style={{ 
                backgroundColor: '#2563eb',
                color: 'white', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              打赏支持
            </button>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {/* 文章列表 */}
        {articles.length > 0 ? (
          articles.map((article) => {
            const isExpanded = expandedArticleId === article.id
            return (
              <article key={article.id} style={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px', 
                marginBottom: '20px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.2s ease'
              }}>
                {/* 文章图片 */}
                {article.imageUrl && (
                  <div style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <Image 
                      src={article.imageUrl} 
                      alt={article.title}
                      width={1200}
                      height={isExpanded ? 400 : 200}
                      style={{ 
                        width: '100%', 
                        height: isExpanded ? 'auto' : '200px', 
                        objectFit: 'cover', 
                        display: 'block' 
                      }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/* 文章内容 */}
                <div style={{ padding: '24px' }}>
                  <h2 style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: '#1f2937',
                    lineHeight: '1.4'
                  }}>
                    {article.title}
                  </h2>
                  
                  {/* 文章内容 */}
                  <div style={{ 
                    color: '#4b5563', 
                    lineHeight: '1.7', 
                    whiteSpace: 'pre-line',
                    marginBottom: '20px',
                    fontSize: '15px'
                  }}>
                    {isExpanded ? (
                      // 显示完整内容（已包含免责声明）
                      article.htmlContent ? (
                        <div dangerouslySetInnerHTML={{ __html: article.htmlContent }} />
                      ) : (
                        <div>{article.content}</div>
                      )
                    ) : (
                      // 显示摘要（从content字段获取，不包含HTML）
                      getExcerpt(article.content, 3)
                    )}
                  </div>

                  {/* 阅读更多/收起按钮 */}
                  <div style={{ marginBottom: '20px' }}>
                    <button 
                      onClick={() => toggleArticle(article.id)}
                      style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    >
                      {isExpanded ? '收起 ↑' : '阅读全文 ↓'}
                    </button>
                  </div>

                  {/* 移除这里的免责声明，因为已经在htmlContent中了 */}
                  
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#6b7280', 
                    paddingTop: '16px', 
                    borderTop: '1px solid #f3f4f6',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>发布时间：{article.createdAt}</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#2563eb' }}>👁️ {article.views}</span>
                      <span style={{ color: '#dc2626' }}>❤️ {article.likes}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })
        ) : (
          // 无文章时的提示
          <div style={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px', 
            padding: '60px', 
            textAlign: 'center'
          }}>
            <div style={{ color: '#6b7280', fontSize: '16px', marginBottom: '16px' }}>暂无文章内容</div>
            <div style={{ color: '#9ca3af', fontSize: '14px' }}>请前往管理后台发布第一篇文章</div>
          </div>
        )}
      </div>

      {/* 打赏弹窗 */}
      {showDonation && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.6)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '32px', 
            width: '400px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>感谢您的支持</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ border: '2px solid #fecaca', borderRadius: '6px', padding: '16px', marginBottom: '8px', backgroundColor: '#fef2f2' }}>
                  <Image
                    src="/wx.png"
                    alt="微信"
                    width={80}
                    height={80}
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmVmMmYyIi8+PHRleHQgeD0iNDAiIHk9IjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iI2RjMjYyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuW+ruS/oTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
                <div style={{ fontSize: '14px', color: '#dc2626', fontWeight: '500' }}>微信支付</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ border: '2px solid #bfdbfe', borderRadius: '6px', padding: '16px', marginBottom: '8px', backgroundColor: '#eff6ff' }}>
                  <Image
                    src="/zfb.png"
                    alt="支付宝"
                    width={80}
                    height={80}
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZWZmNmZmIi8+PHRleHQgeD0iNDAiIHk9IjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzI1NjNlYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaUr+S7mOWutTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
                <div style={{ fontSize: '14px', color: '#2563eb', fontWeight: '500' }}>支付宝</div>
              </div>
            </div>
            <button 
              onClick={() => setShowDonation(false)}
              style={{ 
                width: '100%',
                backgroundColor: '#374151', 
                color: 'white', 
                border: 'none', 
                padding: '12px', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
