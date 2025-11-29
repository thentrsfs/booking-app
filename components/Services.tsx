import { useSeller } from '@/context/SellerContext'
import { Service } from '@/types/types'

const Services = () => {
    const {services, handleEdit, handleOpenDeleteModal} = useSeller()
  return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-2">
  {services.map((service : Service) => (
    <li key={service.id} className="flex flex-col justify-between h-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm p-4 rounded-lg">
      <div className="flex flex-col h-full justify-between gap-2 mb-4">
      <h2 className="font-bold text-xl mb-2 text-text dark:text-text-dark">{service.name}</h2>
      <p className="text-gray-500 dark:text-gray-400">{service.description}</p>
      <p className="font-semibold dark:text-gray-100 text-text text-lg">${service.price}</p>
      <p className="text-gray-500 dark:text-gray-400">Duration: {service.duration_value} {service.duration_unit}</p>
      </div>
    <div className="flex gap-2">
      <button className="bg-primary hover:bg-primary-hover text-white font-medium text-sm transition duration-300 cursor-pointer py-2 px-4 rounded-lg" onClick={() => handleEdit(service)}>Edit</button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-medium text-sm transition duration-300 cursor-pointer py-2 px-4 rounded-lg" onClick={() => handleOpenDeleteModal(service.id)}>Delete</button>
    </div>
    </li>
  ))}
  </ul>
  )
}

export default Services