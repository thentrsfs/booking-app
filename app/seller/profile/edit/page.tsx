'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { useSeller } from "@/context/SellerContext"
import { ProfileInput } from "@/types/types"

const EditProfilePage = () => {
const supabase = createClient()
const router = useRouter()
const {loading, setShowSidebar, showSidebar} = useSeller()

const [formData, setFormData] = useState<ProfileInput>({
    name: '',
    phone: '',
    bio: '',
    avatarFile: null,
    avatar_url: null,
    role: 'seller'
})
const [userId, setUserId] = useState<string | null>(null)
const [saving, setSaving] = useState(false)
const [showAvatarOptions, setShowAvatarOptions] = useState(false)

useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUserId(user.id)

      const { data, error } = await supabase
        .from('profiles')
        .select('name, phone, bio, avatar_url')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setFormData(prev => ({
          ...prev,
          name: data.name || "",
          phone: data.phone || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || null,
          avatarFile: null
        }))
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    if (!userId) return
    setSaving(true)

    let avatar_url = formData.avatar_url

    // If user uploaded new file
    if (formData.avatarFile) {
      const filePath = `public/${userId}-${formData.avatarFile.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, formData.avatarFile, { upsert: true })

      if (uploadError) {
        alert("Error uploading avatar: " + uploadError.message)
        setSaving(false)
        return
      }

      avatar_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${data.path}`
    }

    // Save updated profile
    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        bio: formData.bio?.trim() ,
        avatar_url,
      })
      .eq('id', userId)

    setSaving(false)

    if (error) {
      alert("Error updating profile: " + error.message)
    } else {
      router.push('/seller/profile')
    }
  }

  if (loading) return <div>Loading...</div>

 return (
    <div className="min-h-screen p-4 bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <h1 className="text-2xl font-semibold text-center mb-4 transiton duration-300 cursor-pointer">Edit Profile</h1>
      {showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div
          className="relative w-32 h-32 cursor-pointer"
          onClick={() => setShowAvatarOptions(!showAvatarOptions)}
        >
          <Image
            src={
              formData.avatarFile
                ? URL.createObjectURL(formData.avatarFile)
                : formData.avatar_url || "/avatars/default.jpg"
            }
            alt="Avatar"
            fill
            sizes="128px"
            className="rounded-full object-cover border-2 border-primary"
            priority
          />
        </div>
        <p className="text-sm text-gray-500">Click to change avatar</p>

        {/* Avatar Options (popup style) */}
        {showAvatarOptions && (
          <div className="flex flex-col items-center gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex gap-3">
              {["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"].map((img) => (
                <Image
                  key={img}
                  src={`/avatars/${img}`}
                  alt={img}
                  width={60}
                  height={60}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      avatar_url: `/avatars/${img}`,
                      avatarFile: null
                    })
                  }
                  className={`rounded-full w-20 h-20 object-cover cursor-pointer hover:scale-105 transition ${
                    formData.avatar_url === `/avatars/${img}`
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                />
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setFormData({ ...formData, avatarFile: file })
                }
              }}
              className="w-full text-center text-sm bg-gray-200 dark:bg-gray-700 py-2 rounded-md"
            />
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3 max-w-md mx-auto">
        <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-gray-700 font-medium dark:text-gray-300">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
        />
        </div>
        <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm text-gray-700 font-medium dark:text-gray-300 ">Phone</label>
        <input
          id="phone"
          type="text"
          placeholder="Phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
        />
        </div>
        <div className="flex flex-col gap-1">
        <label htmlFor="bio" className="text-sm text-gray-700 font-medium dark:text-gray-300">Bio</label>
        <textarea
          id="bio"
          placeholder="Short bio..."
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg dark:focus:outline-white focus:outline-1 dark:bg-gray-800 resize-none hover:shadow-md hover:border-primary transition duration-300"
        />
</div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 transiton duration-300 cursor-pointer rounded-lg"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={() => router.push('/seller/profile')}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 transiton duration-300 cursor-pointer hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditProfilePage