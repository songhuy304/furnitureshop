import React , {useState} from 'react'
import styles from './NewArriel.module.css'
import {Row , Col} from 'react-bootstrap'
import { Data123 } from './data';
import { motion } from 'framer-motion';

import Cards from '../Card/CardCustom';


function NewArriel() {
  const [activeLink, setActiveLink] = useState('All');
  const [filteredItems, setFilteredItems] = useState(Data123);


  const handleActive = (category) => {
    setActiveLink(category);
    if (category === 'All') {
      setFilteredItems(Data123); // Show all items
    } else {
      // Filter items based on the selected category
      const filtered = Data123.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <div className={styles.newArrivals}>
      <div className={styles.newArrivalsTitle}>
        <div className={styles.TitleProduct}>NEW ARRIVALS SHOP ITEMS</div>
        <h2>
          <span>NEW ARRIVALS</span>
        </h2>
      </div>
      <Row>
        <Col>
          <ul className={styles.categories}>
            <li
              className={`${styles.button33} ${
                activeLink === "All" ? styles.btnactivec : ""
              }`}
              onClick={() => handleActive("All")}
            >
              All
            </li>
            <li
              className={`${styles.button33} ${
                activeLink === "Sofa" ? styles.btnactivec : ""
              }`}
              onClick={() => handleActive("Sofa")}
            >
              Sofa
            </li>
            <li
              className={`${styles.button33} ${
                activeLink === "Chair" ? styles.btnactivec : ""
              }`}
              onClick={() => handleActive("Chair")}
            >
              Chair
            </li>
            <li
              className={`${styles.button33} ${
                activeLink === "Lamp" ? styles.btnactivec : ""
              }`}
              onClick={() => handleActive("Lamp")}
            >
              Lamp
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.productGrid}>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }} // Trạng thái ban đầu (ẩn và co lại)
                animate={{ opacity: 1, scale: 1 }} // Trạng thái hiển thị (hiện và phóng to)
                exit={{ opacity: 0, scale: 0.8 }} // Trạng thái biến mất (ẩn và co lại)
                transition={{ duration: 0.5, delay: index * 0.1 }} // Thời gian chuyển đổi animation với delay tăng dần
              >
                <Cards item={item} />
              </motion.div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default NewArriel




