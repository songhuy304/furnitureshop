import React from 'react'
import './Home.css'
import Hero  from '../../components/Hero/Hero'
import HeroCate from '../../components/Hero/HeroCate'
import Trending from '../../components/Trending/Trending'

import NewArriel  from '../../components/NewArriel/NewArriel'
import Benefit  from '../../components/Benefit/Benefit'
import Footer  from '../../components/Footer/Footer'


function Home() {
  return (
    <section className="Home">
        <Hero></Hero>
       
        <div className="container">
        <HeroCate />
        <Trending />
        <NewArriel />
        <Benefit />
     

        
        </div>
        <Footer />

    </section>
  )
}

export default Home