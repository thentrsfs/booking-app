'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { AuthSchema } from "@/types/types"
import Logo from "@/components/Logo"
import Loader from "@/components/Loader"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async () => {
    if(loading) return;
    setLoading(true);

    const result = AuthSchema.safeParse({email, password})
    if(!result.success) {
      const firstError = result.error.issues[0]
      alert(firstError.message)
      setLoading(false);
      return
    }
    if(isSignUp) {
      const {error} = await supabase.auth.signUp({
        email,
        password
      })
     if (error) {
      alert(error.message.includes('already registered')
        ? 'Email already registered. Please login.'
        : error.message);
      setLoading(false);
      return;
    }
      router.push('/setup-profile')
    } else {
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if(error) {
        alert(error.message)
        setLoading(false);
        return
      }

      const {data: profile} = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

      if(profile?.role === 'seller') {
        router.push('/seller')
      } else if(profile?.role === 'buyer') {
        router.push('/buyer')
      } else {
        router.push('/setup-profile')
      }
    }
    setLoading(false);
  }
  if(loading) return <Loader/>
  return (
     <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark font-sans p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-200 dark:bg-[#1e293b] dark:border-gray-700">
        <Logo className='left-1/2 transform -translate-x-1/2' />
        <p className="text-center text-sm text-text dark:text-text-dark mb-4">
          Log in to manage your bookings
        </p>

        <form onSubmit={(e) => {e.preventDefault(); handleAuth()}} className="space-y-4">
          <div className="text-text dark:text-text-dark">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none focus:border-transparent hover:border-primary transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-text dark:text-text-dark">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 hover:border-primary  focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover cursor-pointer text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-text dark:text-text-dark">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline cursor-pointer focus:outline-primary"
          >
           {isSignUp ? "Login" : "Create one"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage