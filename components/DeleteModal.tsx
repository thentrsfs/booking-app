import React from 'react'
import { useSeller } from '@/context/SellerContext'

const DeleteModal = ({serviceId} : {serviceId: string}) => {
    const {handleDelete, setOpenDeleteModal} = useSeller()
  return (
    <div className="fixed flex flex-col inset-x-15 sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 sm:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-60 text-center">
Are you sure you want to delete this service?
<div className="flex gap-4 mt-4 justify-center">
<button className="bg-red-500 hover:bg-red-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer" onClick={() => handleDelete(serviceId)}>Yes</button>
<button className="bg-gray-500 hover:bg-gray-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer" onClick={() => setOpenDeleteModal(false)}>No</button>
</div>
    </div>
  )
}

export default DeleteModal