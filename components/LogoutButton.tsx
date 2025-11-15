'use client'

import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
const LogoutButton = () => {
    const supabase = createClient()
    const router = useRouter()
    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }
  return (
    <button className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton