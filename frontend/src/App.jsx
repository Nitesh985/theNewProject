import { useEffect, useState } from "react"
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    image:null
  })
  const [response, setResponse] = useState(null)

  

  const handleSubmit = async (event) => {
    try {
      console.log(formData.image)
      event.preventDefault()
      const res = await axios.post('/api/v1/register', formData)
      setResponse(res?.data)
    } catch (error) {
      console.log("ERROR::", error)
    }
  }

  const handleChange = (event) => {
    const {name, value, files, type} = event.target
    setFormData((prevData)=>{
      return {
        ...prevData,
        [name]:(type==="file")?files[0]:value
      }
    })
  }

  console.log(response)

  return<>
    {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
      <center>
        {response && response?.message}
        <input type="file" name="image" onChange={handleChange} />
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} />
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
        <br />
        <button>Submit</button>
      </center>
    </form> */}

  </>
}

export default App
