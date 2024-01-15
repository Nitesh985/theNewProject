import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Carousel({ images }) {
    const [index, setIndex] = useState(0)

    const addIndex = () => {
        setIndex(prevIndex => (prevIndex+1)%images.length)
    }

    const subIndex = () => {
        setIndex(prevIndex => (prevIndex-1+images.length)%images.length)
    }



  return (
    <div className="flex justify-center">
      <div className="flex mt-10 relative group w-[500px] h-[300px]">
        <img
          src={images[index]?.url}
          alt=""
          width={500}
          className="rounded-xl bg-[#FFFFFF]"
        />
        <button className="absolute top-1/2 left-1 transform -translate-y-1/2 flex justify-center items-center w-[25px] h-10"
            onClick={addIndex}
        >
          <div className="absolute hover:bg-slate-700 flex justify-center items-center w-[25px] h-10 opacity-40 transition-all duration-200"></div>
          <IoIosArrowBack className="cursor-pointer" size={25} />
        </button>

        <button className="absolute top-1/2 right-1 transform -translate-y-1/2 flex justify-center items-center w-[25px] h-10"
            onClick={subIndex}
        >
          <div className="absolute hover:bg-slate-700 flex justify-center items-center w-[25px] h-10 opacity-40 transition-all duration-200"></div>
          <IoIosArrowForward className="cursor-pointer" size={25} />
        </button>
        <div className="absolute rating rating-md scale-0 group-hover:scale-100 ">
          <input
            type="radio"
            name="rating-7"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-7"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-7"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-7"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-7"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
