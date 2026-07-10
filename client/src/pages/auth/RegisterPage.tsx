import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { registerAPI } from '@/api/auth.api'
import { Eye, EyeOff, Check, X, Video } from 'lucide-react'

const passwordRules = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'At least 1 uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'At least 1 number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'At least 1 special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

const RegisterPage = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRules, setShowRules] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const allRulesPassed = passwordRules.every(rule => rule.test(form.password))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    if (!allRulesPassed) {
      setError('Password does not meet all requirements')
      return
    }
    try {
      setLoading(true)
      const res = await registerAPI(form)
      setAuth(res.user, res.accessToken)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left side — Visual Panel */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2847 40%, #1a1a3e 100%)'
        }}>

        {/* Animated background circles */}
        <div className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b82f6, transparent)',
            top: '10%', right: '10%', filter: 'blur(60px)'
          }} />
        <div className="absolute w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #8b5cf6, transparent)',
            bottom: '10%', left: '10%', filter: 'blur(60px)'
          }} />

        {/* Content */}
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ backdropFilter: 'blur(10px)' }}>
            <Video size={36} className="text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Join IntellMeet<br />
            <span className="text-blue-400">Today</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Start collaborating smarter with your team.<br />
            AI-powered meetings await you.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '10x', label: 'Faster Notes' },
              { value: '100%', label: 'AI Powered' },
              { value: '0', label: 'Missed Tasks' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl p-4 border border-blue-500/20"
                style={{ background: 'rgba(59,130,246,0.08)' }}>
                <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12"
        style={{
          background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)'
        }}>

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8">
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

          <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
          <p className="text-gray-400 mb-8">Join thousands of teams using IntellMeet</p>

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

            {/* Google Sign Up */}
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
              <span className="text-gray-500 text-xs">or register with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Moiz Patel"
                  className="w-full rounded-xl px-4 py-3 outline-none border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                />
              </div>

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
                <label className="text-sm text-gray-400 block mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setShowRules(true)}
                    placeholder="Min. 8 characters"
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

                {/* Password Rules */}
                {showRules && (
                  <div className="mt-3 rounded-xl p-4 space-y-2 border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {passwordRules.map((rule) => {
                      const passed = rule.test(form.password)
                      return (
                        <div key={rule.label} className="flex items-center gap-2">
                          {passed
                            ? <Check size={13} className="text-green-400 shrink-0" />
                            : <X size={13} className="text-red-400 shrink-0" />
                          }
                          <span className={`text-xs ${passed ? 'text-green-400' : 'text-gray-500'}`}>
                            {rule.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !allRulesPassed}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all"
                style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage