import React ,{ useContext } from 'react'
import { CartContext  } from '../../Context/CartContext';

function Following() {
  const context = useContext(CartContext);
  return (
    <div style={{ paddingTop: '100px' }}>
    <h2>Đây là trang Sản phẩm</h2>
    <h3>Sản phẩm trong giỏ hàng:</h3>
    <ul>
      {context.cart.map(item => (
        <li key={item.id}>
          {item.title} - {item.price} - Số lượng: {item.quantity}
        </li>
      ))}
    </ul>
  </div>

  )
}

export default Following