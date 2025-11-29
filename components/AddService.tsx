import { useSeller } from "@/context/SellerContext"

const AddService = () => {
    const {addService, formData, setFormData, setShowForm, resetForm} = useSeller()
  return (
   <form
    onSubmit={(e) => {
      e.preventDefault()
      addService()
    }}
    className="fixed top-40 left-1/2 -translate-x-1/2 w-11/12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50 flex flex-col gap-3 max-w-md"
  >
    <h1 className="text-2xl font-semibold text-primary">Add Service</h1>
    <div className="flex flex-col gap-1">
      <label htmlFor="service-name" className="text-sm text-gray-700 font-medium dark:text-gray-300">Name</label>
    <input
    id="service-name"
      type="text"
      placeholder="Name"
      className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="service-description" className="text-sm text-gray-700 font-medium dark:text-gray-300">Description</label>
    <textarea
    id="service-description"
      placeholder="Description"
      maxLength={180}
      rows={3}
      className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
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
      className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
      value={formData.price}
      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
    />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="service-duration" className="text-sm text-gray-700 font-medium dark:text-gray-300">Duration</label>
      <div className="flex gap-2">
    <input
    id="service-duration"
      type="number"
      placeholder="Duration"
      className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
      value={formData.duration_value}
      onChange={(e) => setFormData({ ...formData, duration_value: e.target.value })}
    />
    <select name="duration_unit" id="duration_unit" className="border border-gray-400 dark:border-gray-600 p-2 rounded-lg
 dark:bg-gray-800 dark:focus:outline-white focus:outline-1 hover:shadow-md hover:border-primary transition duration-300"
    value={formData.duration_unit}
    onChange={(e) => setFormData({...formData, duration_unit: e.target.value as 'days' | 'hours' | 'minutes'})}>
<option value="minutes">Mins</option>
<option value="hours">Hours</option>
<option value="days">Days</option>
    </select>
    </div>
    </div>
    <div className="flex gap-2 mt-3">
    <button
      type="submit"
      className="bg-primary hover:bg-primary-hover flex-1 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
    >
      Save
    </button>
    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer" onClick={() => {setShowForm(false); resetForm()}}>Cancel</button>
    </div>
  </form>
  )
}

export default AddService