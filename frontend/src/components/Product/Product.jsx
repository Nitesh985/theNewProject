import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../utils/Loader'
import axios from 'axios'
import ProductDetails from './ProductInfo'
import Review from './Review'


function ProductPreview() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)


    const {productId} = useParams()
    
    useEffect(()=>{
      setLoading(true)
      axios.get(`/api/v1/products/get-product/${productId}`)
      .then((response)=>{
        setLoading(false)
        setProduct(response?.data?.data)
      })
      .catch(error=>{
        setLoading(false)
        console.log(error)
      })
    }, [])


    

    return (
    <Loader loading={loading} >
        {product && <ProductDetails {...product} />}
        <Review />
    </Loader>
  )
}

export default ProductPreview