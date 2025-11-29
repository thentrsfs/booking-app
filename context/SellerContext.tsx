'use client'

import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Service, ServiceInputSchema} from "@/types/types"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

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
        duration_value: string;
        duration_unit: 'minutes' | 'hours' | 'days';
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        description: string;
        price: string;
        duration_value: string;
        duration_unit: 'minutes' | 'hours' | 'days';
    }>>;
    handleEdit: (service: Service) => void;
    handleDelete: (serviceId: string) => Promise<void>;
    resetForm: () => void;
    handleOpenDeleteModal: (serviceId: string) => void;
    openDeleteModal: boolean;
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    deleteServiceId: string;
    handleThemeToggle: () => void;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export const SellerProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = createClient()
    const router = useRouter()
    const { theme, setTheme } = useTheme();
    const [showForm, setShowForm] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        price: string;
        duration_value: string;
        duration_unit: 'minutes' | 'hours' | 'days';
    }>({
        name: '',
        description: '',
        price: '',
        duration_value: '',
        duration_unit: 'minutes'
    })
    const [services, setServices] = useState<Service[]>([])
    const [editing, setEditing] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteServiceId, setDeleteServiceId] = useState<string>('')
    const [loading, setLoading] = useState(true)

    const resetForm = () => {
      setFormData({
        name: '',
        description: '',
        price: '',
        duration_value: '',
        duration_unit: 'minutes'
      })
      setEditing(false)
      setEditingService(null)
    }

    const handleThemeToggle = () => {
      setTheme(theme === "light" ? "dark" : "light");
    }
    const handleEdit = (service: Service) => {
  setEditing(true)
  setEditingService(service)
  setFormData({
    name: service.name,
    description: service.description,
    price: service.price.toString(),
    duration_value: service.duration_value.toString(),
    duration_unit: 'minutes'
  })
  setShowForm(true)
}

const handleOpenDeleteModal = (serviceId: string) => {
  setDeleteServiceId(serviceId)
  setOpenDeleteModal(true)
}
    const handleDelete = async (serviceId: string) => {
      if(!serviceId) return;
      const {error} = await supabase.from('services').delete().eq('id', serviceId)
      if(error) {
        alert('Error deleting service: ' + error.message)
      }
      setServices(services.filter(s => s.id !== serviceId))
      setOpenDeleteModal(false)
      setDeleteServiceId('')
    }
    const fetchServices = async () => {
      setLoading(true);
            const {data: {user}} = await supabase.auth.getUser()
            if(!user) {
    setServices([]);
      setLoading(false);
      router.push('/login')
      return;
            }
            const {data} = await supabase
              .from('services')
              .select('*')
              .eq('seller_id', user.id)
            setServices(data || [])
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
        duration_value: result.data.duration_value,
        duration_unit: result.data.duration_unit
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
        const {data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if(session?.user){
            fetchServices()
          } else {
            setServices([])
          }
        })
        return () => { subscription.unsubscribe() }
    }, [])
    return (
        <SellerContext.Provider value={{services,deleteServiceId, handleThemeToggle, handleOpenDeleteModal,setOpenDeleteModal, openDeleteModal, resetForm, showForm,handleEdit, handleDelete, setShowForm,formData, setFormData, loading, fetchServices, addService, showSidebar, setShowSidebar}}>
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
