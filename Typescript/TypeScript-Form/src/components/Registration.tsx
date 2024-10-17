import React, { useState } from 'react'

// Form data Interface
interface FormData {
  firstname: string
  lastname: string
  email: string
}

// Define type for onSubmit event handler
interface MyFormProps {
  onSubmit: (data: FormData) => void
}

const Registration: React.FC<MyFormProps> = ({ onSubmit }) => {
  const initialFormData: FormData = { email: '', firstname: '', lastname: '' }

  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission behavior
    console.log(formData)
    onSubmit(formData) // Call onSubmit function with form data
    setFormData(initialFormData) // Reset form fields
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>Registration</h1>
      <div className="row">
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="row">
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="row">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default Registration
