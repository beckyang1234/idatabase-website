// 移除 generateStaticParams，因为它会导致问题
// export async function generateStaticParams() {
//   return []
// }

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

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

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && params.id) {
      const savedArticles = localStorage.getItem('articles')
      if (savedArticles) {
        try {
          const articles: Article[] = JSON.parse(savedArticles)
          const foundArticle = articles.find(a => a.id === parseInt(params.id as string))
          setArticle(foundArticle || null)
        } catch (error) {
          console.error('Failed to parse articles:', error)
        }
      }
    }
    setIsLoading(false)
  }, [params.id])

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

  if (!article) {
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
              <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: '500' }}>
                龙虎榜分析
              </Link>
            </div>
          </div>
        </nav>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '300px',
          color: '#6b7280'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '16px' }}>文章未找到</p>
          <Link 
            href="/" 
            style={{ 
              textDecoration: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              display: 'inline-block'
            }}
          >
            返回首页
          </Link>
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
            <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: '500' }}>
              龙虎榜分析
            </Link>
            <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
              <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>首页</Link>
              <span style={{ color: '#fff', cursor: 'pointer' }}>分析</span>
              <span style={{ color: '#fff', cursor: 'pointer' }}>数据</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 文章内容 */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <article style={{ 
          backgroundColor: 'white', 
          border: '1px solid #e5e7eb', 
          borderRadius: '6px', 
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          {/* 文章图片 */}
          {article.imageUrl && (
            <div style={{ borderBottom: '1px solid #e5e7eb' }}>
              <Image 
                src={article.imageUrl} 
                alt={article.title}
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
          
          {/* 文章内容 */}
          <div style={{ padding: '32px' }}>
            <h1 style={{ 
              margin: '0 0 24px 0', 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#1f2937',
              lineHeight: '1.3'
            }}>
              {article.title}
            </h1>
            
            <div style={{ 
              fontSize: '14px', 
              color: '#6b7280', 
              marginBottom: '32px',
              paddingBottom: '16px',
              borderBottom: '1px solid #f3f4f6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>发布时间：{article.createdAt}</span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span>👁️ {article.views}</span>
                <span>❤️ {article.likes}</span>
              </div>
            </div>
            
            {/* 文章正文 */}
            <div style={{ 
              color: '#374151', 
              lineHeight: '1.8', 
              fontSize: '16px',
              marginBottom: '32px'
            }}>
              {article.htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: article.htmlContent }} />
              ) : (
                <div style={{ whiteSpace: 'pre-line' }}>{article.content}</div>
              )}
            </div>
          </div>
        </article>

        {/* 返回按钮 */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
