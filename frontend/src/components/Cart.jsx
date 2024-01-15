import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import useCart from "../context/CartContext";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart, updateCart } = useCart();

  

  useEffect(()=>{
    setTotalPrice(()=>{
        let sumOfPrice = 0;
        cart?.forEach(cartItem=>{
            const {quantity, price} = cartItem
            console.log(quantity)
            console.log(price)
            
            sumOfPrice += quantity * parseFloat(price.replace(/[^0-9.]/g, ""))
        })
        return sumOfPrice.toFixed(2)
    })
  }, [cart])


  return (
    <>
      <div className="font-bold text-2xl flex justify-between">
        <div className="invisible">cart</div>
        <div>Cart</div>
        <div className="text-green-500" >{"$" + totalPrice}</div>
      </div>
      {cart.length ? (
        <div>
          {cart?.map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
          <button className="btn glass self-center w-full mt-5">Buy</button>
        </div>
      ) : (
        <li className="fixed top-0 left-0 right-0 bottom-0 flex justify-center h-screen items-center">
          The cart is empty
        </li>
      )}
    </>
  );
}

export default Cart;
