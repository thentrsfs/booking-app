'use client'
import { useSeller } from '@/context/SellerContext'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { set } from 'zod'

const SettingsPage = () => {
    const { loading, showSidebar, setShowSidebar, theme, handleThemeToggle } = useSeller()
    const supabase = createClient()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState('')

    const handlePasswordChange = async (e : React.FormEvent) => {
      e.preventDefault()
      const {error} = await supabase.auth.updateUser({password})
      if(password !== confirmPassword) {
        setMsg('Passwords do not match')
        return
      }
      setMsg(error ? `Error: ${error.message}` : 'Password updated successfully')
      setPassword('')
      setConfirmPassword('')
    }

    const handleDeleteAccount = async () => {
      const confirmDelete = confirm('Are you sure you want to delete your account? This action cannot be undone.')
      if(!confirmDelete) return
      const {error} = await supabase.rpc('delete_user_account')

      if(error) {
        setMsg(`Error: ${error.message}`)
      } else {
        setMsg('Account deleted successfully')
        supabase.auth.signOut()
      }
    }
    if (loading) return <div>Loading...</div>
  return (
         <div className="p-6 max-w-xl mx-auto flex flex-col gap-8">
{showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      {/* Theme */}
      <section >
        <h2 className="text-xl font-semibold">Appearance</h2>
        <div className="flex items-center gap-4 mt-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => handleThemeToggle('light')}
            />
            Light
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => handleThemeToggle('dark')}
            />
            Dark
          </label>
        </div>
      </section>

      {/* Change password */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Security</h2>

        <form onSubmit={(e) => handlePasswordChange(e)} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <input type="password" placeholder="Confirm Password" className="border p-2 rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button
            type="submit"
            className="bg-primary text-white font-semibold py-2 px-4 rounded"
          >
            Change Password
          </button>
        </form>
      </section>

      {/* Delete account */}
      <section>
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>

        <button
          onClick={handleDeleteAccount}
          className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Delete Account
        </button>
      </section>

      {msg && <p className="text-center text-sm mt-4 text-gray-600">{msg}</p>}
    </div>
  )
}

export default SettingsPage