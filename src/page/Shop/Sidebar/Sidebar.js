import React , {useState , useEffect , useContext} from 'react'
import styles from './Sidebar.module.css'
import categoryApi from '../../../api/categoryApi'
import { Appcontext } from '../../../Context/AppContext';

import { IoIosAdd ,IoMdArrowDropright ,IoMdCheckmark  } from "react-icons/io";


function Sidebar() {
  const {setNav} = useContext(Appcontext);

  const [navlink , setNavLink] = useState("All")
  const [ price, setPrice ] = useState(40);
  const [ color, setcolor ] = useState("white");
  const [menuList, SetmenuList] = useState([]);



  const handleInput = (e)=>{
    setPrice( e.target.value );
  }
  const handleColorClick = (selectedColor) => {
    setcolor(selectedColor);
  };
  const handleSetActive = (value) =>{
    setNavLink(value);
    setNav(value);
  }


  useEffect(() => {
    async function fetchData() {
      try {
       
        const category = await categoryApi.getAll();
        SetmenuList(category.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []); 




  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarTitle}>
          <h5>Product Category</h5>
        </div>
        <div className={styles.sidebarcategories}>
          <ul>
            <li
              className={navlink === "All" ? styles.navActive : ""}
              onClick={() => handleSetActive("All")}
            >
              {navlink === "All" ? (
                <i>
                  <IoMdArrowDropright />
                </i>
              ) : (
                ""
              )}
              All
              <span>
                <IoIosAdd />
              </span>
            </li>
            {menuList.map((item, index) => (
              <li
                key={index}
                className={navlink === item.name ? styles.navActive : ""}
                onClick={() => handleSetActive(item.name)}
              >
                {navlink === item.name ? (
                  <i>
                    <IoMdArrowDropright />
                  </i>
                ) : (
                  ""
                )}
                {item.name}
                <span>
                  <IoIosAdd />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarTitle}>
          <h5>Filter by Price</h5>
        </div>
        <div className={styles.inputWrapper}>
          <span className="text-center">${price}</span>
          <input type="range" max={1000} onChange={handleInput} />
        </div>
      </div>
     <div className={styles.mobile}>
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarTitle}>
            <h5>Color</h5>
          </div>
          <div className={styles.sidebarcategoriesColor}>
            <ul>
              <li id={styles.white} onClick={() => handleColorClick("white")}>
                {color === "white" && (
                  <IoMdCheckmark className="mb-1" color="black" />
                )}
              </li>
              <li id={styles.black} onClick={() => handleColorClick("black")}>
                {color === "black" && (
                  <IoMdCheckmark className="mb-1" color="white" />
                )}
              </li>
              <li id={styles.yellow} onClick={() => handleColorClick("yellow")}>
                {color === "yellow" && (
                  <IoMdCheckmark className="mb-1" color="black" />
                )}
              </li>
              <li id={styles.red} onClick={() => handleColorClick("red")}>
                {color === "red" && (
                  <IoMdCheckmark className="mb-1" color="white" />
                )}
              </li>
              <li id={styles.blue} onClick={() => handleColorClick("blue")}>
                {color === "blue" && (
                  <IoMdCheckmark className="mb-1" color="white" />
                )}
              </li>
              <li id={styles.pink} onClick={() => handleColorClick("pink")}>
                {color === "pink" && (
                  <IoMdCheckmark className="mb-1" color="white" />
                )}
              </li>
              <li id={styles.gray} onClick={() => handleColorClick("gray")}>
                {color === "gray" && (
                  <IoMdCheckmark className="mb-1" color="white" />
                )}
              </li>
              <li id={styles.orange} onClick={() => handleColorClick("orange")}>
                {color === "orange" && (
                  <IoMdCheckmark className="mb-1" color="white" />
                )}
              </li>
              <li id={styles.brown} onClick={() => handleColorClick("brown")}>
                {color === "brown" && (
                  <IoMdCheckmark className="mb-1" color="white" />
                )}
              </li>
            </ul>
          </div>
        </div>
     </div>
    </div>
  );
}

export default Sidebar