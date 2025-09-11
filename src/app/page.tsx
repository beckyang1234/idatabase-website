'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [articles, setArticles] = useState<any[]>([])
  const [showDonation, setShowDonation] = useState(false)

  useEffect(() => {
    // 从localStorage加载文章数据
    const savedArticles = localStorage.getItem('articles')
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles))
    } else {
      const sampleData = [
        {
          id: 1,
          title: '9月10日荐股龙虎榜分析',
          content: '今日龙虎榜数据显示，机构席位买入较为活跃宁德时代、比亚迪等个股获得机构重点关注。\n\n重点数据：\n• 机构买入净额：15.2亿元\n• 游资买入净额：8.7亿元\n• 活跃个股数量：156只\n\n建议投资者关注资金流向，理性投资。',
          imageUrl: '',
          createdAt: '2025-09-10'
        }
      ]
      setArticles(sampleData)
      localStorage.setItem('articles', JSON.stringify(sampleData))
    }
  }, [])

  return (
    <>
      {/* 顶部标题栏 - 红色主题 */}
      <div style={{ 
        backgroundColor: '#dc2626', 
        color: '#fff', 
        textAlign: 'center', 
        padding: '10px 0',
        fontWeight: 'bold',
        borderBottom: '2px solid #b91c1c'
      }}>
        荐股龙虎榜 (X账号：荐股大赛@jiangudasai)
      </div>

      {/* 导航栏 - 黑色主题 */}
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
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>荐股龙虎榜</h1>
            <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
              <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>公开、真实、可跟随</a>
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
              感谢打赏支持
            </button>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 100px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          
          {/* 文章列表 */}
          {articles.length > 0 ? (
            articles.map((article) => (
              <article key={article.id} style={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px', 
                marginBottom: '20px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                {/* 文章图片 */}
                {article.imageUrl && (
                  <div style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
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
                  
                  <div style={{ 
                    color: '#4b5563', 
                    lineHeight: '1.7', 
                    whiteSpace: 'pre-line',
                    marginBottom: '20px',
                    fontSize: '15px'
                  }}>
                    {article.content}
                  </div>
                  
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
                      <span style={{ color: '#2563eb' }}>💬 评论</span>
                      <span style={{ color: '#dc2626' }}>❤️ 收藏</span>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div style={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '6px', 
              padding: '60px', 
              textAlign: 'center'
            }}>
              <div style={{ color: '#6b7280', fontSize: '16px' }}>暂无文章内容</div>
            </div>
          )}
        </div>
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
                  <img
                    src="/wx.png"
                    alt="微信"
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
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
                  <img
                    src="/zfb.png"
                    alt="支付宝"
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
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
    </>
  )
}
