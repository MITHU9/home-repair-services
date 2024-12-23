const BookingForm = ({
  formData,
  handleChange,
  handleSubmit,
  setShowModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full dark:bg-gray-700">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Book Service
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <span className="font-bold text-2xl dark:text-gray-200">
              &times;
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            {/* Service ID, Service Name, and other non-editable fields */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Service ID
              </label>
              <input
                type="text"
                name="serviceId"
                value={formData.serviceId}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block dark:text-gray-300 text-gray-700">
                Service Name
              </label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block dark:text-gray-300 text-gray-700">
                Service Image
              </label>
              <input
                type="text"
                name="serviceImage"
                value={formData.serviceImage}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block dark:text-gray-300 text-gray-700">
                Provider Email
              </label>
              <input
                type="text"
                name="providerEmail"
                value={formData.providerEmail}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block dark:text-gray-300 text-gray-700">
                Provider Name
              </label>
              <input
                type="text"
                name="providerName"
                value={formData.providerName}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Current User Email</label>
              <input
                type="text"
                name="userEmail"
                value={formData.userEmail}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block dark:text-gray-300 text-gray-700">
                Current User Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Service Taking Date</label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                className="w-full p-3 mt-2 border dark:bg-gray-600 rounded-lg"
              />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block dark:text-gray-300 text-gray-700">
                Special Instructions
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                className="w-full p-3 dark:bg-gray-600 mt-2 border rounded-lg"
                placeholder="Anything like address, area, customized service plan..."
              />
            </div>

            <div className="mb-4">
              <label className="block dark:text-gray-300 text-gray-700">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                readOnly
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100 outline-none dark:bg-gray-600"
              />
            </div>
          </div>

          {/* Purchase Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-600 dark:text-gray-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 w-full"
            >
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookingForm;
