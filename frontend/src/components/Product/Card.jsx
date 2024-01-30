import React from "react";
import Batman from "../../assets/images/batman.jpg";

function Card() {
  return (
    <div>
      <div className="flex flex-col justify-center w-[260px] h-[400px] rounded-3xl border">
        <div className="flex flex-col items-center">
          <img src={Batman} width={250} height={400} />
          <h1 className="text-xl font-bold text-zinc-400">Batman</h1>
          <div>
            Price: <span className="text-green-500">$11.55</span>
          </div>
          
        </div>
        <div className="flex justify-around">
          <button className="border w-24 h-8 ">Add to Cart</button>
          <button className="border w-24 h-8">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
