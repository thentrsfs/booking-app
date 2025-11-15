'use client'
import { useSeller } from "@/context/SellerContext"
import NavSidebar from "@/components/NavSidebar"
import { Service } from "@/types/types"
import AddService from "@/components/AddService"
import { useRouter } from "next/navigation"

const SellerPage = () => {
  const {services, loading, showSidebar, setShowSidebar, showForm, setShowForm, handleEdit, handleDelete, resetForm} = useSeller()
  const router = useRouter()
    if(loading) return <div>Loading...</div>
  return (
    <>
        <main className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Dashboard</h1>
          {showSidebar && (
            <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>
          )}
          {showForm && (
            <div onClick={() => {setShowForm(false); resetForm() }} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>
          )}
{showForm && (
 <AddService/>
)}
          <NavSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center ">
    <p className="text-sm text-gray-500 dark:text-gray-400">Total Services</p>
    <p className="text-xl font-bold">{services.length}</p>
  </div>
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
    <p className="text-xl font-bold">0</p>
  </div>
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">Earnings</p>
    <p className="text-xl font-bold">$0</p>
  </div>
</div>

<div className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">No bookings yet</div>

<div className="flex gap-4"><button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg">Add New Service</button>
<button onClick={() => router.push('/seller/services')} className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg">View all services</button>
<button onClick={() => router.push('/seller/profile')} className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg">Manage Profile</button></div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-2">
  {services.map((service : Service) => (
    <li key={service.id} className="flex flex-col border border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm p-4 rounded-lg">
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
        <footer>
        </footer>
    </>
  )
}

export default SellerPage