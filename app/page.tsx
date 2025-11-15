'use client'
import { useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function Home() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const redirectUser = async () => {
      const {data: {user}} = await supabase.auth.getUser()
      if(!user) {
        router.push('/login')
        return
      }

      const {data: profile, error} = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

      if (error || !profile) {
        router.push('/setup-profile');
        return;
      }

      if (profile.role === 'seller') {
        router.push('/seller');
      } else {
        router.push('/buyer');
      }
    }
    redirectUser()
  }, [])
  return (
    <div>Loading...</div>
  );
}
