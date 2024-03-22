import React , {useState , useEffect , useContext } from 'react'
import styles from './Main.module.css'
import SanphamApi from '../../../api/sanphamApi'
import CardCustom from '../../../components/Card/CardCustom'
import { Row, Col } from 'react-bootstrap';
import { IoIosArrowDown   ,IoIosArrowRoundForward } from "react-icons/io";
import { Appcontext } from '../../../Context/AppContext';
import { motion , AnimatePresence } from 'framer-motion';


function MainContent() {
  const { nav } = useContext(Appcontext);
  const [NumberSorting , setNumberSorting] = useState(6);
  const [TextSorting , setTextSorting] = useState("Default Sorting");
  
  const [sofaList, setSofaList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const params = {
          limit:NumberSorting,
          category: nav,
          sortBy : TextSorting
        };
        const products = await SanphamApi.getAll(params);
         setSofaList( products.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [nav , TextSorting , NumberSorting]); 

  
  return (
    <div className={styles.mainContent}>
      <div className={styles.productIso}>
        <Row>
          <Col>
            <div className="sorting">
              <ul className={styles.productSorting}>
                <li>
                  <span className="SortingText">{TextSorting}</span>
                  <IoIosArrowDown />
                  <ul className="SortingType">
                    <li
                      className="type_sorting_btn"
                      onClick={() => setTextSorting("Default Sorting")}
                    >
                      <span>Default Sorting</span>
                    </li>
                    <li
                      className="type_sorting_btn"
                      onClick={() => setTextSorting("price")}
                    >
                      <span>Price</span>
                    </li>
                    <li
                      className="type_sorting_btn"
                      onClick={() => setTextSorting("name")}
                    >
                      <span>Name</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="SortingText">Show</span>
                  <span className={styles.NumberSortingText}>
                    {NumberSorting}
                  </span>
                  <IoIosArrowDown />
                  <ul className="SortingNumber">
                    <li
                      className="num_sorting_btn"
                      onClick={() => setNumberSorting(6)}
                    >
                      <span>6</span>
                    </li>
                    <li
                      className="num_sorting_btn"
                      onClick={() => setNumberSorting(12)}
                    >
                      <span>12</span>
                    </li>
                    <li
                      className="num_sorting_btn"
                      onClick={() => setNumberSorting(24)}
                    >
                      <span>24</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          
           
            <div className={styles.productGrid}>
              {/* {dataDigitalBestSeller.map((item, index) => (
                <CardCustom
                  customStyle={'customCardStyle' }
                  key={index}
                  item={item}
                />
              ))} */}
              <AnimatePresence>
              {sofaList.map((sofa, index) => (
                <motion.div
                key={sofa.id}
                initial={{ y: "50%", opacity: 0, scale: 0.5 }} // Trạng thái ban đầu (ẩn và co lại)
                animate={{ y: 0, opacity: 1, scale: 1 }} // Trạng thái hiển thị (hiện và phóng to)
                transition={{ duration:0.2, ease: "easeOut" }} // Thời gian chuyển đổi animation với delay tăng dần
              >

                <CardCustom
                  customStyle={"customCardStyle"}
                  key={index}
                  item={sofa}
                />
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
            <div className={styles.page}>
              <div className="d-flex flex-row align-items-center">
                <div className={styles.pageCurrent}>
                  <span>1</span>
                  <ul className={styles.pageSelection}>
                    <li>
                      <span>1</span>
                    </li>
                    <li>
                      <span>2</span>
                    </li>
                    <li>
                      <span>3</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.pageTotal}>
                  <span>of</span> 3
                </div>
                <div id="next_page_1" className={styles.pageNext}>
                  <IoIosArrowRoundForward />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MainContent