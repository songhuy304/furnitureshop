import React  from 'react'
import { Card } from 'react-bootstrap';
import style from './Card.module.css';
import { FaHeart,FaShoppingCart  } from "react-icons/fa";
// import { CartContext  } from '../../Context/CartContext';
import { useCart } from "react-use-cart";


function CardCustom ({item ,customStyle }) {
    const { addItem } = useCart();
   
    const { _id, title, price, linkImg } = item; // Thêm category vào danh sách destructuring
   
    // const categoryName = category ? category.name : ''; // Lấy ra tên category, kiểm tra nếu category tồn tại trước khi truy cập name??

    const handleAddToCart = () => {
      // Ánh xạ thuộc tính _id sang id
      const itemWithId = { ...item, id: _id };
      addItem(itemWithId);
      alert("Thêm sản phẩm thành công");
    };

    const handleAddToFavourite = (item) => {
      console.log('Item added to Favourite:', item);

    };
    return (
      <Card className={`${style.card} ${style[customStyle]}`}>
        <div>
          <Card.Img className={style.cardImg} variant="top" src={linkImg} />
        </div>
        <div className={style.cardContent}>
          <ul className={style.itemHover}>
            <li>
            <button onClick={handleAddToCart}>
                <FaShoppingCart />
              </button>
            </li>
            <li>
              <button onClick={() => handleAddToFavourite(item)}>
                <FaHeart />
              </button>
            </li>
          </ul>
        </div>
        <Card.Body style={{ margin: "auto" }}>
          <Card.Title className={style.cardTitle}>{title}</Card.Title>
          {/* <Card.Text
            className={`d-flex justify-content-between ${style.cardText}`}
          >
            <span>{categoryName}</span>
          </Card.Text> */}
          <Card.Text
            className={`d-flex justify-content-between ${style.cardText}`}
          >
            <span>${price}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    );
}

export default CardCustom