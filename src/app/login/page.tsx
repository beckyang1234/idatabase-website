'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // 模拟登录过程
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 简单的验证
      if (!formData.email || !formData.password) {
        setMessage('请填写邮箱和密码')
        return
      }

      // 模拟成功登录
      setMessage('登录成功！欢迎回来')
      
      // 2秒后跳转到首页
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)

    } catch (error) {
      setMessage('登录失败，请检查邮箱和密码')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-slate-900">欢迎回来</CardTitle>
            <CardDescription className="text-slate-600">
              登录您的账户以继续
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-slate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">密码</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-slate-400"
                  required
                />
              </div>

              {message && (
                <div className={`text-sm p-3 rounded ${
                  message.includes('成功') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : '登录'}
              </Button>
            </form>

            <div className="text-center text-sm text-slate-600">
              还没有账户？{' '}
              <Link href="/register" className="text-slate-900 hover:underline font-medium">
                立即注册
              </Link>
            </div>
            <div className="text-center">
              <Link href="/" className="text-slate-500 hover:text-slate-700 text-sm">
                ← 返回首页
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}