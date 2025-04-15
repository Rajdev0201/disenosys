"use client"
import React, { useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation"

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, phone } = formData

    if (!name || !email || !phone) {
      toast.error("All fields are required")
      return
    }

    setLoading(true)
    try {
      const res = await axios.post("https://disenosys-dkhj.onrender.com/enroll/post", formData)
      toast.success("Enrollment successful!")
      setFormData({ name: "", email: "", phone: "" })
      router.push("/")
    } catch (err) {
      toast.error("Enrollment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-garet">
      <div className="md:w-1/2 w-full h-64 md:h-auto bg-cover bg-center bg-blue-500 text-white flex items-center justify-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/800x600/?education')" }}>
<button
  class="px-8 z-30 py-4 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-rose-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl"
>
Welcome to Enrollment
</button>

      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Enroll Now</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default EnrollmentForm
