import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Category() {
    const [categories, setCategories] = useState(null)
    const [categoryName, setCategoryName] = useState("Select the categories")
    
    const navigate = useNavigate()

    useEffect(()=>{
        axios
        .get(`/api/v1/categories/get-all-categories`)
        .then((res)=>{
            setCategories(res?.data?.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])


       
    
    const handleChange = (event) => {
        const {value} = event.target
        setCategoryName(value)
        if (value==="All"){
            navigate(`/product`)
        } else {
            navigate(`/product/c/${value}`)
        }
        
    }


  return (
    <div>
        <select value={categoryName} onChange={handleChange} >
            <option disabled>Select the categories</option>
            <option value="All" >All</option>
            {categories && categories?.map(category=>(
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </select>
    </div>
  )
}

export default Category