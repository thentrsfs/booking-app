'use client'
import {useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { ProfileInputSchema, ProfileInput } from "@/types/types"
import Header from "@/components/Header"
import AvatarSelector from "@/components/AvatarSelector"
import NavSidebar from "@/components/NavSidebar"
import { useSeller } from "@/context/SellerContext"
import { file } from "zod"

const SetupProfilePage = () => {
    const supabase = createClient()
    const router = useRouter()
    const { showSidebar, setShowSidebar} = useSeller()
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
  <div className="min-h-screen p-4 bg-background dark:bg-background-dark text-text dark:text-text-dark font-sans">
     <header>
        <Header setShowSidebar={setShowSidebar} />
      <h1 className="text-2xl font-semibold text-center">Set up your profile</h1>
        </header>
        <NavSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <AvatarSelector  value={formData.avatarFile || formData.avatar_url} onChange={fileOrUrl => setFormData({...formData, avatarFile: fileOrUrl instanceof File ? fileOrUrl : null, avatar_url: typeof fileOrUrl === 'string' ? fileOrUrl : null})} />
        <div className="flex flex-col gap-4 max-w-md mx-auto">
      <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as 'buyer' | 'seller'})}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <input value={formData.name} type="text" placeholder="Ime" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input value={formData.phone} type="text" placeholder="Telefon" onChange={e => setFormData({...formData, phone: e.target.value})} />
      <button onClick={handleSubmit}>Sačuvaj profil</button>
    </div>
    </div>
  )
}

export default SetupProfilePage