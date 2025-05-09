import React from 'react';
import  { useSelector, useDispatch }  from  'react-redux';
import  { removeItem } from  './CartSlice';
import { updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
const calculateTotalAmount = (cart) => {
    let total = 0;
  
    cart.forEach((item) => {
      // Extract the numeric value from the item's cost string
      const unitPrice = parseFloat(item.cost.substring(1));
      
      // Calculate the total cost for the item
      const itemTotalCost = item.quantity * unitPrice;
      
      // Add the item's total cost to the overall total
      total += itemTotalCost;
    });
  
    return total;
  };

const handleContinueShopping = (e) => {
    // Call the onContinueShopping function passed from the parent component
    onContinueShopping(e);
  };
const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

const handleIncrement = (item) => {
    // Dispatch the updateQuantity action to increase the item quantity by 1
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  
const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Dispatch the updateQuantity action to decrease the item quantity by 1
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      // If the quantity is 1, dispatch the removeItem action to remove the item from the cart
      dispatch(removeItem(item.id));
    }
  };

const handleRemove = (item) => {
    // Dispatch the removeItem action to delete the item from the cart
    dispatch(removeItem(item.id));
  };

  // Calculate total cost based on quantity for an item
const calculateTotalCost = (item) => {
    // Extract the numeric value from the item's cost string
const unitPrice = parseFloat(item.cost.substring(1));
  
    // Calculate the total cost by multiplying the quantity with the unit price
const totalCost = item.quantity * unitPrice;
    
    return totalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem