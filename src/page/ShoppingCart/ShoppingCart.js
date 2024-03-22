import React ,{ useState } from 'react'
import styles from './ShopingCart.module.css'
import CartItem from './CartItem/CartItem'; // Import CartItem component
import { useCart } from "react-use-cart";
// import { CartContext  } from '../../Context/CartContext';
import { Container , Row, Col ,Form , Button  } from 'react-bootstrap'
import { FaPaypal , FaCreditCard ,FaShippingFast } from "react-icons/fa";

function ShoppingCart() {
  // const [cart, setCart] = useState(context.cart);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem
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
                      CHECKOUT
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

  const handleItemClick = (itemName) => {
    setActive(itemName);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
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
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="PhoneNumber" required />
          <Form.Control.Feedback type="invalid">
            Please provide PhoneNumber.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Dirtrict</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
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
      <Button type="submit">Continute Checkout</Button>
    </Form>
  );
}

export default ShoppingCart