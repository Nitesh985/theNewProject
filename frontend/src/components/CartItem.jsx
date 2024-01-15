import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import useCart from "../context/CartContext";

function CartItem({ name, images, quantity, _id}) {
  const [count, setCount] = useState(quantity || 1);

  const { updateCart, deleteFromCart } = useCart();

  return (
    <div className="flex flex-row items-center justify-between border border-slate-300 border-opacity-10 w-full h-16 mt-2">
      <div className="flex items-center gap-2">
        <div className="flex group" >
          <img
            src={images[0].url}
            alt={name}
            className="w-[50px] h-[40px] hover:blur-[1px] transition-all duration-300 ease-linear cursor-pointer group"
          />
          <div className="absolute ml-3 mt-2 cursor-pointer scale-0 group-hover:scale-100">
            <FaTrashCan size={23} color="red" onClick={()=>{
              deleteFromCart(_id)
            }} />
          </div>
        </div>
        <h1 className="flex justify-self-end text-[17px]">
          {name.slice(0, 10)}
          {name[11] ? "..." : ""}
        </h1>
      </div>
      <div className="flex items-center">
        <button
          className="btn text-xl"
          onClick={() => {
            updateCart({ _id, quantity: count===1 ? 1 : count - 1 });
            setCount((prevCount) => {
              if (prevCount===1) return prevCount;
              const quantity = prevCount - 1;
              return quantity;
            });
          }}
        >
          -
        </button>
        <h1>{count}</h1>
        <button
          className="btn text-xl"
          onClick={() => {
            updateCart({ _id, quantity: count + 1 });
            setCount((prevCount) => {
              const quantity = prevCount + 1;
              return quantity;
            });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
