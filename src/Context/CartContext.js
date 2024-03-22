import React, { createContext, useState } from 'react';

// Tạo Context
export const CartContext = createContext(null);


export const CartProvider  = ({children}) => {
  const [cart, setCart] = useState([]);    

  const addToCart = (item) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };


      
  const removeFromCart = (itemId) => {
    // Xử lý logic xoá sản phẩm khỏi giỏ hàng ở đây
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };
  const UpdateCountCartItem = ( NewAmount, itemId) => {
    // Xử lý logic xoá sản phẩm khỏi giỏ hàng ở đây
   
    setCart((prev) => ({...prev, [itemId]: NewAmount}));
  };

  const cartValues = {
    cart,
    addToCart,
    removeFromCart,
    UpdateCountCartItem,
  };

  console.log(cart);
  return (
    <CartContext.Provider value={cartValues}>
      {children}
    </CartContext.Provider>
  );

}