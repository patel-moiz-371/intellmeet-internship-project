import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { loginAPI } from '@/api/auth.api'
import { Eye, EyeOff, Video } from 'lucide-react'

const LoginPage = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    try {
      setLoading(true)
      const res = await loginAPI(form)
      setAuth(res.data.user, res.data.accessToken)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12"
        style={{
          background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)'
        }}>

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video size={18} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Intell<span className="text-blue-500">Meet</span>
              </h1>
            </div>
            <p className="text-gray-400 text-sm">AI-Powered Meeting Platform</p>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-8">Sign in to continue to IntellMeet</p>

          {/* Glass Card */}
          <div className="rounded-2xl p-8 border border-white/10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
              className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium py-3 rounded-xl transition-all mb-6"
              >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
               Continue with Google
              </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-xs">or sign in with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl px-4 py-3 outline-none border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">Password</label>
                  <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl px-4 py-3 pr-12 outline-none border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all"
                style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side — Visual Panel */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2847 40%, #1a1a3e 100%)'
        }}>

        {/* Animated background circles */}
        <div className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b82f6, transparent)',
            top: '10%', left: '10%', filter: 'blur(60px)'
          }} />
        <div className="absolute w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #8b5cf6, transparent)',
            bottom: '10%', right: '10%', filter: 'blur(60px)'
          }} />

        {/* Content */}
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ backdropFilter: 'blur(10px)' }}>
            <Video size={36} className="text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Meet Smarter<br />
            <span className="text-blue-400">with AI</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Real-time transcription, smart summaries,<br />
            and automatic action items — all powered by AI.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['🎥 Video Meetings', '🤖 AI Summaries', '💬 Live Chat', '📋 Task Board'].map(f => (
              <span key={f} className="px-4 py-2 rounded-full text-sm text-blue-300 border border-blue-500/30"
                style={{ background: 'rgba(59,130,246,0.1)' }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginPage