'use client'
import {useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { ProfileInputSchema, ProfileInput } from "@/types/types"
import Logo from "@/components/Logo"
import AvatarSelector from "@/components/AvatarSelector"

const SetupProfilePage = () => {
    const supabase = createClient()
    const router = useRouter()
    const [formData, setFormData] = useState<ProfileInput>({
        name: '',
        phone: '',
        bio: '',
        avatarFile: null,
        avatar_url: null,
        role: 'buyer'
    })
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const {data: {user}} = await supabase.auth.getUser()
            if(user) setUserId(user.id);
        };
        fetchUser();
    }, []);

    const handleSubmit = async () => {
        if(!userId) return;
        setLoading(true);

        const result = ProfileInputSchema.safeParse(formData);
        if(!result.success) {
            const errors = result.error.issues;
            alert('Validation errors: ' + errors.map(e => e.message).join(', '));
            setLoading(false);
            return;
        }

        let avatar_url = formData.avatar_url || null;
        if(formData.avatarFile) {
            const {data, error: uploadError} = await supabase.storage
            .from('avatars')
            .upload(`public/${userId}-${formData.avatarFile.name}`, formData.avatarFile, {
        upsert: true,
      });
            if(uploadError) {
                alert('Error uploading avatar: ' + uploadError.message);
                return;
            }
             avatar_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${data.path}`;
        }

        const {error} = await supabase.from('profiles').insert([{
            id: userId,
           name: result.data.name,
            phone: result.data.phone,
            role: result.data.role,
            bio: result.data.bio,
              avatar_url,
            created_at: new Date().toISOString()
        }]);
        setLoading(false);
        if(error) {
           if(error.message.includes('duplicate key value')) {
            router.push('/');
           } else {
            alert('Error saving profile: ' + error.message);
            setLoading(false);
           }
              return;
        }
        router.push('/');
    }
    if(loading) return <div>Loading...</div>
  return (
  <div className="min-h-screen p-4 bg-background dark:bg-background-dark text-text dark:text-text-dark font-sans flex flex-col gap-6 max-w-2xl mx-auto">
     <header>
   <Logo/>
      <h1 className="text-2xl font-semibold text-center mt-4 text-text dark:text-text-dark">Set up your profile</h1>
        </header>
        <div className="space-y-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <AvatarSelector  value={formData.avatarFile || formData.avatar_url} onChange={fileOrUrl => setFormData({...formData, avatarFile: fileOrUrl instanceof File ? fileOrUrl : null, avatar_url: typeof fileOrUrl === 'string' ? fileOrUrl : null})} />
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <div className="flex flex-col gap-1">
        <label htmlFor="role" className="text-sm text-gray-700 font-medium dark:text-gray-300">Role</label>
      <select id="role" className="border border-gray-400 dark:border-gray-600 dark:focus:outline-white focus:outline-1 p-2 rounded-lg bg-white dark:bg-gray-700" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as 'buyer' | 'seller'})}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-gray-700 font-medium dark:text-gray-300">Name</label>
      <input id="name" className="border border-gray-400 dark:border-gray-600 dark:focus:outline-white focus:outline-1 p-2 rounded-lg bg-white dark:bg-gray-700" value={formData.name} type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm text-gray-700 font-medium dark:text-gray-300">Phone</label>
      <input value={formData.phone} type="text" placeholder="Phone (optional)" className="border border-gray-400 dark:border-gray-600 dark:focus:outline-white focus:outline-1 p-2 rounded-lg bg-white dark:bg-gray-700" onChange={e => setFormData({...formData, phone: e.target.value})} />
      </div>
    </div>
    </div>
      <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg" onClick={handleSubmit}>Save Profile</button>
    </div>
  )
}

export default SetupProfilePage