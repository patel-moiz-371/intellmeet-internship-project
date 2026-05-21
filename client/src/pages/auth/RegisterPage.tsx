import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { registerAPI } from '@/api/auth.api'
import { Check, X } from 'lucide-react'

// Password rules
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
      setAuth(res.data.user, res.data.accessToken)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Intell<span className="text-blue-500">Meet</span>
          </h1>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-400 block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500 transition-colors placeholder-gray-500"
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
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500 transition-colors placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400 block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setShowRules(true)}
                placeholder="Min. 8 characters"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500 transition-colors placeholder-gray-500"
              />

              {/* Password rules — show when user focuses on password field */}
              {showRules && (
                <div className="mt-3 bg-gray-800 rounded-lg p-4 space-y-2">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(form.password)
                    return (
                      <div key={rule.label} className="flex items-center gap-2">
                        {passed
                          ? <Check size={14} className="text-green-400 shrink-0" />
                          : <X size={14} className="text-red-400 shrink-0" />
                        }
                        <span className={`text-xs ${passed ? 'text-green-400' : 'text-gray-400'}`}>
                          {rule.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !allRulesPassed}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage