import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../context/CartContext";
import Carousel from "../../utils/Carousel";

function ProductInfo({ _id, name, description, images, price, category }) {
  const { addToCart } = useCart();
  // category: {_id: '659d4b0395a5601e20c4d02e',
  // name: 'Books & Literature',
  // description: 'Immerse yourself in captivating stories and enriching knowledge.',
  // createdAt: '2024-01-09T13:32:51.825Z',
  // updatedAt: '2024-01-09T13:32:51.825Z',
  //  …}categoryId: "659d4b0395a5601e20c4d02e"
  // createdAt: "2024-01-09T14:16:57.893Z"
  // description: "This is really awesome book"
  // images: [{…}]
  // name: "The song of ice and fire"
  // price: "$4.99"
  // updatedAt: "2024-01-09T14:16:57.893Z"
  // __v: 0
  // _id: "659d55594d57012b1a57c029"
  // [[Prototype]]: Object
  const [design, setDesign] = useState(true);

  const myDescription = `A Song of Ice and Fire" is a series of epic fantasy novels written by American author George R.R. Martin. The series is widely known for its intricate characters, political intrigue, and expansive world-building. As of my knowledge cutoff in January 2022, the series consists of five published novels, with two more planned.

  Here are the novels in the series:
  
      A Game of Thrones (1996): The story begins with the death of Jon Arryn, the Hand of the King. Eddard Stark, Lord of Winterfell, is asked to become the new Hand, leading to a series of events that involve political maneuvering, battles, and the discovery of a long-forgotten threat in the north.
  
      A Clash of Kings (1998): The Seven Kingdoms are in the midst of a civil war. As multiple claimants vie for the Iron Throne, the War of the Five Kings unfolds. Meanwhile, threats from beyond the Wall become more apparent.
  
      A Storm of Swords (2000): The War of the Five Kings continues, and the narrative expands to include various characters and regions. The book is known for its numerous twists, shocking events, and major character developments.
  
      A Feast for Crows (2005): The aftermath of the War of the Five Kings is explored as new power struggles emerge. Due to the vast scope of the story, the events of this book run concurrently with parts of "A Dance with Dragons."
  
      A Dance with Dragons (2011): The narrative picks up where "A Storm of Swords" left off, with multiple storylines occurring simultaneously. Characters are spread across Westeros and Essos, facing challenges and navigating complex political landscapes.
  
  The remaining planned books in the series are titled "The Winds of Winter" and "A Dream of Spring." As of my last update in January 2022, the release dates for these books were not confirmed, and George R.R. Martin has been working on completing them.
  
  The series gained international acclaim and was adapted into the highly successful television series "Game of Thrones," which aired from 2011 to 2019. The television adaptation closely followed the events of the books, although some differences exist due to the incomplete nature of the book series at the time of the show's conclusion.`;

  return (
    <>
      <div className={`flex ${design ? "flex-col" : ""} gap-3`}>
        {images?.length && (
          <Carousel images={images} />
        )}
        <h1 className=" font-bold text-2xl text-center">{name}</h1>
        <Link to={`/category/${category?._id}`} className="hover:underline">
          <p className="text-center">{category?.name}</p>
        </Link>
        <div className="flex justify-center">
          <div className="flex w-[600px] justify-between">
            <p className="text-center flex gap-2">
              <h1 className="font-bold">Price: </h1>
              <span className="text-green-400">{price}</span>
            </p>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 hover:text-gray-950 w-[100px] h-[30px] rounded-xl text-gray-800 "
              onClick={() => {
                addToCart({
                  _id,
                  name,
                  images,
                  price,
                });
              }}
            >
              Add to Cart
            </button>
            <button className="hover:bg-[#4CAF50] bg-green-600 rounded-xl w-[100px] hover:text-gray-950 text-gray-800">
              Buy Now
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="w-[800px]">{myDescription}</p>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
