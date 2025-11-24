'use client';
import { X, Home, Calendar, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"

const NavSidebar = ({ showSidebar, setShowSidebar } : { showSidebar: boolean, setShowSidebar: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }
  return (
      <div className={`fixed right-0 top-0 h-full w-3/5 md:w-2/5 p-4 bg-background dark:bg-background-dark z-50 shadow-xl transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-primary">Menu</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="p-2 text-text dark:text-text-dark"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-6 pt-6 text-gray-700 dark:text-gray-100 text-xl font-medium">
          <Link href="/seller" onClick={() => setShowSidebar(false)} className="flex items-center gap-2 hover:text-primary transition">
            <Home className="w-6 h-6" /> Dashboard
          </Link>
          <Link href="/seller/services" onClick={() => setShowSidebar(false)} className="flex items-center gap-2 hover:text-primary transition">
            <Calendar className="w-6 h-6" /> My Services
          </Link>
          <Link href="/seller/profile" onClick={() => setShowSidebar(false)} className="flex items-center gap-2 hover:text-primary transition">
            <User className="w-6 h-6" /> Profile
          </Link>
          <Link href="/seller/settings" onClick={() => setShowSidebar(false)} className="flex items-center gap-2 hover:text-primary transition">
            <Settings className="w-6 h-6" /> Settings
          </Link>
          <button
            onClick={() => { setShowSidebar(false); handleLogout() }}
            className="flex items-center gap-2 text-red-600 transition mt-6"
          >
            <LogOut className="w-6 h-6" /> Logout
          </button>
        </nav>
          </div>
  )
}

export default NavSidebar