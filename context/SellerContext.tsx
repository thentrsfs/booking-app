'use client'

import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Service, ServiceInputSchema} from "@/types/types"
import { useRouter } from "next/navigation"

type SellerContextType = {
    services: Service[];
    loading: boolean;
    fetchServices: () => Promise<void>;
    addService: () => Promise<void>;
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    formData: {
        name: string;
        description: string;
        price: string;
        duration: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        description: string;
        price: string;
        duration: string;
    }>>;
    handleEdit: (service: Service) => void;
    handleDelete: (serviceId: string) => Promise<void>;
    resetForm: () => void;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export const SellerProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = createClient()
    const router = useRouter()
    const [showForm, setShowForm] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: ''
    })
    const [services, setServices] = useState<Service[]>([])
    const [editing, setEditing] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)

    const resetForm = () => {
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: ''
      })
      setEditing(false)
      setEditingService(null)
    }
    const handleEdit = (service: Service) => {
  setEditing(true)
  setEditingService(service)
  setFormData({
    name: service.name,
    description: service.description,
    price: service.price.toString(),
    duration: service.duration.toString()
  })
  setShowForm(true)
}

    const handleDelete = async (serviceId: string) => {
      const {error} = await supabase.from('services').delete().eq('id', serviceId)
      if(error) {
        alert('Error deleting service: ' + error.message)
      } else {
        setServices(services.filter(s => s.id !== serviceId))
      }
    }
    const fetchServices = async () => {
        setLoading(true)
            const {data: {user}} = await supabase.auth.getUser()
            if(!user) {
    setServices([]);
      setLoading(false);
      router.push('/login')
      return;
            }
            const {data, error} = await supabase
              .from('services')
              .select('*')
              .eq('seller_id', user.id)
            if(error) alert('Error fetching services: ' + error.message)
            else setServices(data || [])
            setLoading(false)
          }

    const addService = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/login')
    return
  }

  const result = ServiceInputSchema.safeParse(formData)
  if (!result.success) {
    console.log(result.error.issues.map(e => e.message).join(', '))
    return
  }

  if (editing && editingService) {
    const { error } = await supabase
      .from('services')
      .update({
        name: result.data.name,
        description: result.data.description,
        price: result.data.price,
        duration: result.data.duration,
      })
      .eq('id', editingService.id)

    if (error) {
      alert('Error updating service: ' + error.message)
    } else {
      setServices(prev =>
        prev.map(s =>
          s.id === editingService.id ? { ...s, ...result.data } : s
        )
      )
    }
    resetForm()
    setShowForm(false)
    return
  }

  // 🔹 Otherwise, add new service
  const newService = {
    id: crypto.randomUUID(),
    seller_id: user.id,
    ...result.data,
    created_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('services').insert([newService])
  if (error) {
    alert('Error adding service: ' + error.message)
  } else {
    setServices([...services, newService])
    resetForm()
    setShowForm(false)
  }
}

    useEffect(() => {
        fetchServices()
    }, [])
    return (
        <SellerContext.Provider value={{services, resetForm, showForm,handleEdit, handleDelete, setShowForm,formData, setFormData, loading, fetchServices, addService, showSidebar, setShowSidebar}}>
            {children}
        </SellerContext.Provider>
    )
}
export const useSeller = () => {
    const context = useContext(SellerContext);
    if (context === undefined) {
        throw new Error("useSeller must be used within a SellerProvider");
    }
    return context;
}
