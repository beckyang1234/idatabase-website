import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '荐股龙虎榜 - 荐股大赛@jiangudasai',
  description: '专业的荐股龙虎榜分析平台，提供最新的股票资金流向分析和投资建议',
  keywords: '荐股,龙虎榜,股票分析,投资建议,资金流向',
  authors: [{ name: 'jiangudasai' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dc2626" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                console.warn('Global error caught:', e.error);
                // 阻止错误传播，避免显示错误页面
                e.preventDefault();
              });
              window.addEventListener('unhandledrejection', function(e) {
                console.warn('Unhandled promise rejection caught:', e.reason);
                // 阻止错误传播
                e.preventDefault();
              });
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
