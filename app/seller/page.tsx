'use client'
import { useSeller } from "@/context/SellerContext"
import NavSidebar from "@/components/NavSidebar"
import Services from "@/components/Services"
import AddService from "@/components/AddService"
import { useRouter } from "next/navigation"
import DeleteModal from "@/components/DeleteModal"
import Loader from "@/components/Loader"

const SellerPage = () => {
  const {services, loading, showSidebar, setShowSidebar, showForm, setShowForm, resetForm, deleteServiceId, openDeleteModal, setOpenDeleteModal} = useSeller()
  const router = useRouter()
    if(loading) return <Loader/>
  return (
    <>
        <main className="flex flex-col gap-6 ">
          <h1 className="text-2xl font-semibold text-text dark:text-text-dark text-center">Dashboard</h1>
          {showSidebar && (
            <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>
          )}
          {showForm && (
            <div onClick={() => {setShowForm(false); resetForm() }} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"></div>
          )}
          {openDeleteModal && (
            <div onClick={() => {setOpenDeleteModal(false); }} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"></div>
          )}
{showForm && (
 <AddService/>
)}
{openDeleteModal && deleteServiceId !== '' && (
 <DeleteModal serviceId={deleteServiceId}/>
)}
          <NavSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center ">
    <p className="text-sm text-gray-500 dark:text-gray-400">Total Services</p>
    <p className="text-xl font-bold text-text dark:text-text-dark">{services.length}</p>
  </div>
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
    <p className="text-xl font-bold text-text dark:text-text-dark">0</p>
  </div>
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">Earnings</p>
    <p className="text-xl font-bold text-text dark:text-text-dark">$0</p>
  </div>
</div>

<div className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-gray-700 dark:text-gray-300">No bookings yet</div>

<div className="grid grid-cols-3 gap-4"><button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer">Add New Service</button>
<button onClick={() => router.push('/seller/services')} className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer">View all services</button>
<button onClick={() => router.push('/seller/profile')} className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer">Manage Profile</button></div>
<Services />
        </main>
        <footer>
        </footer>
    </>
  )
}

export default SellerPage