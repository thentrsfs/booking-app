'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { useSeller } from "@/context/SellerContext"
import { Profile } from "@/types/types"

const ProfilePage = () => {
  const router = useRouter()
  const supabase = createClient()
  const { loading, showSidebar, setShowSidebar, services } = useSeller()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('name, phone, bio, role, avatar_url, created_at')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error.message)
      } else {
        setProfile(data as Profile)
      }
      setFetching(false)
    }

    fetchProfile()
  }, [])

  if (loading || fetching) return <div>Loading...</div>

  if (!profile) {
    return (
      <div className="text-center mt-10">
        <p>No profile found.</p>
        <button
          onClick={() => router.push('/setup-profile')}
          className="mt-4 bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg"
        >
          Create Profile
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">Profile Dashboard</h1>
      {showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <Image
          src={profile.avatar_url || "/avatars/default.jpg"}
          alt="User avatar"
          width={120}
          height={120}
          className="rounded-full flex-shrink-0 w-28 h-28 object-cover shadow"
          priority
        />
         {/* Name + Role */}
  <div className="text-center">
    <h2 className="text-xl font-semibold">{profile.name}</h2>
    <p className="text-sm text-gray-400 capitalize">{profile.role}</p>
  </div>

  {/* Info List */}
  <div className="w-full space-y-2 text-text dark:text-text-dark">
    <div className="flex items-center gap-3 bg-gray-400/15 dark:bg-gray-500/30 p-3 rounded-lg">
      <span className="text-pink-400">👤</span>
      <p className="text-sm">{profile.name || "Not provided"}</p>
    </div>

    <div className="flex items-center gap-3 bg-gray-400/15 dark:bg-gray-500/30 p-3 rounded-lg">
      <span className="text-pink-400">📞</span>
      <p className="text-sm">{profile.phone || "No phone added"}</p>
    </div>
  </div>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center flex flex-col items-center justify-center">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Services</h3>
          <p className="text-2xl font-semibold">{services.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center flex flex-col items-center justify-center">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Upcoming Bookings</h3>
          <p className="text-2xl font-semibold">12</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => router.push('/seller/services')}
          className="bg-primary hover:bg-primary-hover max-sm:flex-1 text-white font-semibold py-2 px-4 rounded-lg transiton duration-300 cursor-pointer"
        >
          Manage Services
        </button>
        <button
          onClick={() => router.push('/seller/profile/edit')}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transiton duration-300 cursor-pointer dark:hover:bg-gray-600"
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
