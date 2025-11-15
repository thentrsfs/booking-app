'use client'
import { useState } from "react"
import Image from "next/image"

const defaultAvatars = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.jpg",
  "/avatars/avatar3.jpg",
]

export default function AvatarSelector({ value, onChange }: {
  value?: string | null
  onChange: (fileOrUrl: File | string | null) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-32 h-32 rounded-full bg-gray-300 overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition"
        onClick={() => setOpen(true)}
      >
        {value ? (
          <Image
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt="Avatar"
            width={128}
            height={128}
  className="rounded-full object-cover w-32 h-32"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm text-center px-2">
            Upload or Choose Avatar
          </span>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-3 text-center">Choose your avatar</h3>

            <div className="flex justify-between mb-4 px-1">
              {defaultAvatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Avatar ${i + 1}`}
                  width={80}
                  height={80}
                  className={`rounded-full object-cover w-22 h-22 cursor-pointer border-2 ${
                    value === src ? 'border-primary' : 'border-transparent'
                  } hover:scale-105 transition`}
                  onClick={() => {
                    onChange(src)
                    setOpen(false)
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-3">
  <label className="text-sm text-gray-500">Or upload your own</label>

  <label
    htmlFor="avatar-upload"
    className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center cursor-pointer text-gray-700 dark:text-gray-200"
  >
    Choose Image
  </label>

  <input
    id="avatar-upload"
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        onChange(e.target.files[0])
        setOpen(false)
      }
    }}
    className="hidden"
  />
</div>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
