import React from 'react'
import Product from './Product/Product'
import Benefit from '../../components/Benefit/Benefit'
import Footer from '../../components/Footer/Footer'



function Shop() {
  return (
    <>
      
      <Product />
      <div className="container">
      <Benefit />
      </div>
      <Footer />
      
    </>
  )
}

export default Shop