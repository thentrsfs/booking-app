import { useSeller } from "@/context/SellerContext"

const AddService = () => {
    const {addService, formData, setFormData, setShowForm, resetForm} = useSeller()
  return (
   <form
    onSubmit={(e) => {
      e.preventDefault()
      addService()
    }}
    className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50 flex flex-col gap-3 w-11/12 max-w-md"
  >
    <h1 className="text-2xl font-semibold text-primary">Add Service</h1>
    <div className="flex flex-col gap-1">
      <label htmlFor="service-name" className="text-sm text-gray-700 font-medium dark:text-gray-300">Name</label>
    <input
    id="service-name"
      type="text"
      placeholder="Name"
      className="border border-gray-400 dark:border-gray-600 dark:focus:outline-white focus:outline-1 p-2 rounded-lg bg-white dark:bg-gray-700"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="service-description" className="text-sm text-gray-700 font-medium dark:text-gray-300">Description</label>
    <textarea
    id="service-description"
      placeholder="Description"
      className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
                 bg-white dark:bg-gray-700 dark:focus:outline-white focus:outline-1"
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="service-price" className="text-sm text-gray-700 font-medium dark:text-gray-300">Price</label>
    <input
    id="service-price"
      type="number"
      placeholder="Price"
      className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg dark:focus:outline-white focus:outline-1 bg-white dark:bg-gray-700"
      value={formData.price}
      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
    />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="service-duration" className="text-sm text-gray-700 font-medium dark:text-gray-300">Duration (mins)</label>
    <input
    id="service-duration"
      type="number"
      placeholder="Duration (mins)"
      className="border border-gray-400 dark:border-gray-600 dark:focus:outline-white focus:outline-1 p-2 rounded-lg bg-white dark:bg-gray-700"
      value={formData.duration}
      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
    />
    </div>
    <div className="flex gap-2 mt-3">
    <button
      type="submit"
      className="bg-primary hover:bg-primary-hover flex-1 text-white font-semibold py-2 px-4 rounded-lg"
    >
      Save
    </button>
    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg" onClick={() => {setShowForm(false); resetForm()}}>Cancel</button>
    </div>
  </form>
  )
}

export default AddService