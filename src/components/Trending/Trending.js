import React from 'react'
import { dataDigitalBestSeller } from './data';
import './Trending.css'

import Cards from '../Card/CardCustom';

import Slider from "react-slick";
function Trending() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
    
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
  return (
    <div className="trending-slider">
        <div className="trending-title">
            <div className="title-product">
            TRENDING SHOP ITEMS
            </div>
            <h2><span>TRENDING SHOP ITEMS</span></h2>
        </div>
        <div>
       
        <Slider {...settings}>
        {dataDigitalBestSeller.map((item) => (
        <Cards key={item.id} item={item} />
        ))}
       
        </Slider>
      </div>
        
    </div>
  )
}


export default Trending