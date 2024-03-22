import {  Button} from 'react-bootstrap'
import React , { useState } from 'react'
import styles from './Quantity.module.css'

function Quantity({ onChange }) {
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
        onChange(quantity - 1);
      };

      const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        onChange(quantity + 1);
      };
    
  return (
    <div className={styles.InputQuantity}>
        <Button onClick={handleDecrease}>-</Button>
      <input
        id="form1"
        min="0"
        name="quantity"
        value={quantity}
        type="number"
        className="form-control"
        readOnly
      />
      <Button onClick={handleIncrease}>+</Button>

    </div>
  )
}

export default Quantity