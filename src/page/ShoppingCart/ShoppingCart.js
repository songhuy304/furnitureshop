import React ,{ useState } from 'react'
import styles from './ShopingCart.module.css'
import CartItem from './CartItem/CartItem'; // Import CartItem component
import { useCart } from "react-use-cart";
import orderApi from '../../api/order'

import {jwtDecode } from 'jwt-decode'; // Thư viện để giải mã token JWT
// import { CartContext  } from '../../Context/CartContext';
import { Container , Row, Col ,Form , Button  } from 'react-bootstrap'
import { FaPaypal , FaCreditCard ,FaShippingFast } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
  // const [cart, setCart] = useState(context.cart);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    // emptyCart
  } = useCart();
 
 
  const [checkout, setcheckout] = useState(false);

  const handleclickCheckout = () => {
    setcheckout(!checkout); // Đảo ngược giá trị của checkout khi nút CHECKOUT được nhấp
  };
  
 

  return (
    <>
    {isEmpty ? (
      <h1 style={{ marginTop: "200px", textAlign: "center", verticalAlign: "middle" }} className="text-center">
        Giỏ Hàng Trống
      </h1>
    ) : (
    <div className={styles.cart}>
  
      
      <Container>
        <Row>
          <Col xs={12} md={8} xl={8}>
            <h2 className={styles.cartTitle}>Shoping Cart </h2>
            <h5 className={styles.cartTotalItem}>Cart ({totalUniqueItems}) total Items: ({totalItems}) </h5>
            {checkout ? (
              <FormCheckout></FormCheckout>

            ) : (
              <div className={styles.cartItem}>
              <table className={`${styles.table1} table table-borderless`}>
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item , index) => (
                    <CartItem
                    key={index}
                    item={item}
                    index={index}
                    updateItemQuantity={updateItemQuantity}
                    removeItem={removeItem}
                    />
                  ))}
                 
                </tbody>
              </table>
            </div>
            )}
            
            <div className={styles.checkout}></div>
          </Col>
          <Col xs={12} md={4} xl={4}>
            <div className={styles.Order}>
              <div className="container">
                <h2 className={styles.cartTitle}>Order Sumary</h2>
                <div className={styles.OrderDetails}>
                  <div className="mb-3">
                    <label className="form-label">ITEMS</label>
                    <span>3</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">SHIPPING</label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">COD</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">PROMO CODE</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      placeholder="ENTER YOUR CODE"
                    />
                    <Button className="mt-3" variant="danger">
                      APPLY
                    </Button>
                  </div>
                  <hr></hr>
                  <div className={`${styles.CheckoutList} mb-3`}>
                    <label>TOTAL COST</label>
                    <span>${cartTotal}</span>
                  </div>
                  <div className={`${styles.CheckoutList} mb-3`}>
                    <Button 
                    className={styles.btncheckout} 
                    variant="primary"
                    onClick={handleclickCheckout}
                    >
                      {checkout ? "Back To Cart" : "CHECKOUT"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
     
    </div>
    )}
     </>
  );
}

function FormCheckout(){

  const [validated, setValidated] = useState(false);
  const [active, setActive] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const {
    items,
    emptyCart
  } = useCart();

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('login');
      if(!token) {
        alert('Xin vui lòng đăng nhập');
        navigate('/login');
      }
      else {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
        let id = '';
        if (decodedToken.exp > currentTime) {
            id = decodedToken.id;
        }else {
          // Xử lý trường hợp token hết hạn hoặc không hợp lệ
          console.error('Token expired or invalid');
        }
          // hàm tính tổng
      const totalAmount = items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.itemTotal;
      }, 0);
            // Lấy ngày hôm nay
      const today = new Date();
      // Định dạng ngày thành chuỗi theo định dạng "YYYY-MM-DD"
      const formattedDate = today.toISOString().split("T")[0];
      // Tạo dữ liệu đơn hàng từ các sản phẩm trong giỏ hàng hoặc dữ liệu cần thiết khác
      const checkoutData = {
        invoice_date : formattedDate,
        user_id: id, // Sử dụng id thay vì user_id
        customer_name:lastname,
        phone : phone,
        total : totalAmount,
        status: "Loading...",
        addrress: address,
        invoice_items: items.map(item => ({
          product_id: item._id, // Đây là id của sản phẩm trong giỏ hàng
          name: item.title,
          price: item.price, // Đây là giá của sản phẩm trong giỏ hàng
          quantity: item.quantity, // Đây là số lượng của sản phẩm trong giỏ hàng
          itemTotal: item.itemTotal
        }))
      };
      console.log(checkoutData);
      // Gọi API checkout
      const response = await orderApi.checkout(checkoutData);
      
      // Xử lý kết quả từ server nếu cần
      console.log('Checkout successful:', response.data);
      alert('Checkout successful');
      emptyCart();
      }
    
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error during checkout:', error.response.data);
    }
  };

  const handleItemClick = (itemName) => {
    setActive(itemName);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault(); // Ngăn chặn hành động mặc định của form submit
      event.stopPropagation();
      setValidated(true); // Đặt validated thành true để hiển thị feedback
    } else {
      event.preventDefault(); // Ngăn chặn hành động mặc định của form submit
      event.stopPropagation();
      setValidated(true); // Đặt validated thành true để hiển thị feedback
      await handleCheckout(); // Chỉ gọi handleCheckout() nếu form hợp lệ
    }
  };

  return (
    <Form
      className="mb-3"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"

            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastname" 
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Phone</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="PhoneNumber"
           name="phone" 
           value={phone}
           onChange={(e) => setPhone(e.target.value)}
           required  />
          <Form.Control.Feedback type="invalid">
            Please provide PhoneNumber.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <Form.Control
           name="addrress"
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
             required />
          <Form.Control.Feedback type="invalid">
            Vui Lòng nhập địa chỉ.
          </Form.Control.Feedback>
        </Form.Group>
       
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Payment Method</Form.Label>
        <div className={styles.Payments}>
          <div
            className={`${styles.listPayment} ${
              active === "Credit Card" ? styles.listPaymentactive : ""
            }`}
            onClick={() => handleItemClick("Credit Card")}
          >
            <FaCreditCard />
            Credit Card
          </div>
          <div
            className={`${styles.listPayment} ${
              active === "Pay Pal" ? styles.listPaymentactive : ""
            }`}
            onClick={() => handleItemClick("Pay Pal")}
          >
            <FaPaypal />
            Pay Pal
          </div>
          <div
            className={`${styles.listPayment} ${
              active === "COD" ? styles.listPaymentactive : ""
            }`}
            onClick={() => handleItemClick("COD")}
          >
            <FaShippingFast />
            COD
          </div>
        </div>
      </Form.Group>
      <Button
        className={styles.btncheckout}
        variant="primary"
        type='submit'
      >
        Continue checkout
      </Button>
    </Form>
  );
}

export default ShoppingCart