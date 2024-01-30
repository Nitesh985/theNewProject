import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = JSON.parse(localStorage.getItem("CART"));

    return localData ? localData : [];
  });
  const [alertMessage, setAlertMessage] = useState("");

  const addToCart = (data) => {
    let message;
    if (cart.some((cartItem) => cartItem._id === data._id)) {
      message = `${data.name} already exists in the cart`;
    } else {
      message = `${data.name} added to the cart successfully!`;
    }
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 1000);
    
    if (message.includes("already exists in the cart")) return

    setCart((prevData) => {
      data.quantity = 1;
      const newData = [...prevData, data];
      localStorage.setItem("CART", JSON.stringify(newData));
      return newData;
    });
  };

  const updateCart = (data) => {
    setCart((prevData) => {
      const updatedData = prevData.map((item) => {
        if (data._id === item._id) {
          return {
            ...item,
            quantity: data.quantity,
          };
        }
        return item;
      });
      localStorage.setItem("CART", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const deleteFromCart = (indexID) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (cartItem) => cartItem._id !== indexID
      );
      localStorage.setItem("CART", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const deleteAllFromCart = () => {
    setCart(()=>{
      localStorage.setItem("CART", "[]");
      return []
    })

  }


  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, deleteFromCart, deleteAllFromCart }}
    >
      <div>
        <div>{children}</div>
        {alertMessage && (
          <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-end mb-[10px]">
            <div role="alert" className="alert">
              {alertMessage.includes("already exists in the cart") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span>{alertMessage}</span>
            </div>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
};

export default function useCart() {
  return useContext(CartContext);
}
