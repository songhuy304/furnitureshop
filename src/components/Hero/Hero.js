import React from 'react'
import './Hero.css'
import { Container , Row , Col } from 'react-bootstrap'


function Hero() {
  return (
    <section className="hero">
     <Container>
        <Row className="align-items-center hero-banner">
          <Col xs={12} md={5} xl={5}>
            <div className="d-flex flex-column justify-content-center ">
              <h1 className="wrap">Decor Furniture</h1>
              <h2 className="wrap">For your House</h2>
              <p>
              Designing unique living spaces with the perfect blend of quality and style. 
              Creating the ideal ambiance with our Furniture.
              </p>
            </div>
            <button className="button-21">Shop Now!</button>
          </Col>
        
        </Row>
      </Container>
    </section>
   
  )
}

export default Hero