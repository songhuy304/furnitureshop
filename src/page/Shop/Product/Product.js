import React from 'react'
import styles from './Product.module.css'
import Sidebar from '../Sidebar/Sidebar'
import MainContent from '../Maincontent/MainContent'
import { Col,Row,Container} from 'react-bootstrap'
import { AppProvider } from '../../../Context/AppContext'



function Product() {
  return (
    <AppProvider>

   
    <div className={styles.product}>
      <Container>
        <Row>
          <Col xs={12} md={3} xl={3}>
            <Sidebar />
          </Col>
          <Col xs={12} md={9} xl={9}>
            <MainContent />
          </Col>
        </Row>
      </Container>
    </div>
    </AppProvider>
  );
}

export default Product