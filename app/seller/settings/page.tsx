'use client'
import { useSeller } from '@/context/SellerContext'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import ThemeToggle from '@/components/ThemeToggle'

const SettingsPage = () => {
    const {showSidebar, setShowSidebar, loading } = useSeller()
    const supabase = createClient()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState('')
    const router = useRouter()

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
  // get the current user from supabase auth
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (userError || !userId) {
    alert("No authenticated user found.");
    return;
  }

  const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  if (!confirm) return;

  const res = await fetch("/api/delete-account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Account deleted");
    router.push("/login");
  } else {
    alert("Error deleting account: " + data.error);
  }
};

    if (loading) return <Loader/>
  return (
    <div className='flex flex-col gap-4 max-w-xl mx-auto'>
    <h1 className="text-2xl font-semibold text-text dark:text-text-dark text-center">Settings</h1>
         <div className=" bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 space-y-10">

{showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}

      {/* Theme */}
       <section className="space-y-4">
    <h2 className="text-xl font-semibold">Appearance</h2>
    <ThemeToggle />
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
            className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
          />
          <input type="password" placeholder="Confirm Password" className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover transiton duration-300 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg"
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
          className="mt-3 bg-red-600 hover:bg-red-700 transition duration-300 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg"
        >
          Delete Account
        </button>
      </section>

      {msg && <p className="text-center text-sm mt-4 text-gray-600">{msg}</p>}
    </div>
    </div>
  )
}

export default SettingsPage