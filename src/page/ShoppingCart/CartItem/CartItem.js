import React  from 'react';



const CartItem = ({ item , index, updateItemQuantity, removeItem }) => {
  
  return (
    <tr key={index}>
      <td>
        <img
          src={item.linkImg}
          className="rounded me-2"
          alt="Product"
          style={{ maxWidth: "80px", maxHeight: "80px" }}
          // style={{ height: "6rem" }}
        />
      </td>
      <td>{item.title}</td>
      <td>{item.price}</td>
      <td> {item.quantity}</td>
      <td>
        <button
          style={{ border: "2px solid red" }}
          className="btn btn-light ms-2"
          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
        >
          –
        </button>
        <button
          style={{ border: "2px solid #fcba03" }}
          className="btn btn-light ms-2"
          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => removeItem(item.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
