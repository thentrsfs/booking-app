'use client'

import { useSeller } from "@/context/SellerContext"
import { Service } from "@/types/types"
import AddService from "@/components/AddService"

const ServicesPage = () => {
  const {services,handleDelete, handleEdit, loading, showSidebar, setShowSidebar, showForm, setShowForm} = useSeller()
  if(loading) return <div>Loading...</div>
  return (
    <div >
      {showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      {showForm && <div onClick={() => setShowForm(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>}
      {showForm && <AddService />}
      <main>
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">All Services</h1>
        <button className="bg-primary hover:bg-primary-hover text-white font-medium text-sm py-2 px-4 rounded-lg" onClick={() => setShowForm(true)}>Add Service</button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-2">
        {services.map((service : Service) => (
          <li key={service.id} className="flex flex-col border border-gray-300 dark:border-gray-700 shadow-sm p-4 rounded-lg">
            <div className="flex flex-col gap-1 mb-4">
            <h2 className="font-bold text-xl mb-2">{service.name}</h2>
            <p className="text-gray-500">{service.description}</p>
            <p className="font-semibold dark:text-gray-100 text-lg">${service.price}</p>
            <p className="text-gray-500 dark:text-gray-400">Duration: {service.duration} mins</p>
            </div>
          <div className="flex gap-2">
            <button className="bg-primary hover:bg-primary-hover text-white font-medium text-sm py-2 px-4 rounded-lg" onClick={() => handleEdit(service)}>Edit</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-medium text-sm py-2 px-4 rounded-lg" onClick={() => handleDelete(service.id)}>Delete</button>
          </div>
          </li>
        ))}
        </ul>
      </main>
    </div>
  )
}

export default ServicesPage