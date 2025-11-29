'use client'

import { useSeller } from "@/context/SellerContext"
import { Service } from "@/types/types"
import AddService from "@/components/AddService"
import { useEffect } from "react"
import Loader from "@/components/Loader"
import Services from "@/components/Services"

const ServicesPage = () => {
  const {services , fetchServices, loading, showSidebar, setShowSidebar, showForm, setShowForm} = useSeller()

  useEffect(() => {
    fetchServices()
  }, [])
  if(loading) return <Loader/>
  return (
    <div >
      {showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      {showForm && <div onClick={() => setShowForm(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      {showForm && <AddService />}
      <main>
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">All Services</h1>
        <button className="bg-primary hover:bg-primary-hover transition-all duration-300 cursor-pointer text-white font-medium text-sm py-2 px-4 rounded-lg" onClick={() => setShowForm(true)}>Add Service</button>
        </div>
        {services.length === 0 && <p className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">No services found. Click <span className="font-semibold cursor-pointer" onClick={() => setShowForm(true)}>{'"Add Service"'}</span> to create one.</p> }
        <Services />
      </main>
    </div>
  )
}

export default ServicesPage