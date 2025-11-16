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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-center">Profile Dashboard</h1>
      {showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <Image
          src={profile.avatar_url || "/avatars/default.jpg"}
          alt="User avatar"
          width={120}
          height={120}
          className="rounded-full w-32 h-32 object-cover"
          priority
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 capitalize">{profile.role}</p>
          {profile.bio && <p className="mt-2 text-gray-600 dark:text-gray-300">{profile.bio}</p>}
          <p className="mt-1 text-gray-500 dark:text-gray-400">📞 {profile.phone}</p>
        </div>
      </div>

      {/* 📊 Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Services</h3>
          <p className="text-2xl font-semibold">{services.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Upcoming Bookings</h3>
          <p className="text-2xl font-semibold">12</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={() => router.push('/seller/services')}
          className="bg-primary hover:bg-primary-hover max-sm:flex-1 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Manage Services
        </button>
        <button
          onClick={() => router.push('/seller/profile/edit')}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg"
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
