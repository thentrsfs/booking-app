'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

const NavBar = () => {
  const supabase = createClient()
  const router = useRouter()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }
  return (
    <nav className="lg:flex hidden items-center gap-6 font-medium text-text dark:text-text-dark">
 <Link href="/seller" className="flex items-center gap-3 hover:text-primary transition duration-300"> Dashboard
          </Link>
          <Link href="/seller/services" className="flex items-center gap-3 hover:text-primary transition duration-300">
            My Services
          </Link>
          <Link href="/seller/profile" className="flex items-center gap-3 hover:text-primary transition duration-300">
           Profile
          </Link>
          <Link href="/seller/settings" className="flex items-center gap-3 hover:text-primary transition duration-300">
            Settings
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 hover:text-red-500 transition duration-300 cursor-pointer">
            Logout
          </button>
    </nav>
  )
}

export default NavBar