'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
const BuyerPage = () => {
    const supabase = createClient()
    const router = useRouter()

      const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }
  return (
    <div>
    <div>BuyerPage</div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default BuyerPage