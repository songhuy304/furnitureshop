import React, { useEffect } from 'react'
import { Row , Col } from 'react-bootstrap'
import cate1 from '../../assets/ca1.png'
import cate2 from '../../assets/ca2.png'
import cate3 from '../../assets/cate3.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './HeroCate.css'

function HeroCate() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Cấu hình AOS cho phần tử cụ thể

    // Nếu bạn muốn disable AOS khi component bị hủy
    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <section  className="hero-cate">
 
        <div className="hero-bx">
          <Row>
            <Col xs={12} md={4} xl={4} data-aos="fade-right" className="box1">
              <div className="box-col d-flex ">
                <div className="box-pof">
                  <h3 className="box-title">Design <span>Sofa</span> </h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="box-image d-flex align-items-center justify-content-center ">
                  <img src={cate3} alt="Product" />
                </div>
              </div>
            </Col>
            <Col xs={12} md={4} xl={4}  data-aos="fade-down" className="box2">
            <div className="box-col d-flex ">
                <div className="box-pof d-flex flex-column">
                  <h3 className="box-title">Minimal <span>Chair</span></h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="box-image d-flex align-items-center justify-content-center ">
                  <img src={cate1} alt="Product" />
                </div>
              </div>
            </Col>
            <Col xs={12} md={4} xl={4} data-aos="fade-left" className="box3">
              <div className="box-col d-flex ">
                <div className="box-pof">
                  <h3 className="box-title">standing <span>Lamp</span></h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="box-image d-flex align-items-center justify-content-center ">
                  <img src={cate2} alt="Product" />
                </div>
              </div>
            </Col>
          </Row>
        </div>

    </section>
  );
}

export default HeroCate