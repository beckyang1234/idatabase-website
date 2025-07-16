import ArticleEditor from '@/components/ArticleEditor'

// 为静态导出生成静态路径
export async function generateStaticParams() {
  // 为管理后台预生成一些编辑页面路径
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' }
  ]
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params
  return <ArticleEditor articleId={id} isEdit={true} />
}