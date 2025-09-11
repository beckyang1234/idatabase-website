import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '荐股龙虎榜 - X账号荐股大赛@jiangudasai',
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
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
