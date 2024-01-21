import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { AiFillDislike, AiFillLike, AiFillLock } from "react-icons/ai";
import StarInfo from "../../utils/StarUtil";

function ReviewInfo({ stars, comment, reviewer }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { avatar } = faker.internet;
  const { color } = faker.internet;
  const { userName } = faker.internet;
  const { catchPhraseAdjective } = faker.company;
  const { catchPhraseDescriptor } = faker.company;
  const { paragraphs } = faker.lorem;
  const { time } = faker.date;
// TODO: put an image alternative to the avatar
  
  return (
    <div>
      <div className="flex p-3 mt-3">
          <img src={reviewer?.avatar?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" } alt={reviewer?.username} className="w-12 rounded-badge mt-1 h-12 " />
        <div className="ml-2">
          <div className="flex gap-3 items-center" >
            <h1>@{reviewer?.username}</h1>
            <StarInfo size={17} count={stars} />
          </div>
          
          <p className="text-xs">{comment}</p>
          <div className="mt-2 flex w-[60px] justify-between">
            <button
              className={`${liked ? "text-blue-500" : ""} cursor-pointer`}
              onClick={() => {
                setDisliked(false);
                setLiked((prevState) => !prevState);
              }}
            >
              <AiFillLike />
            </button>
            <button
              className={`${disliked ? "text-red-500" : ""} cursor-pointer `}
              onClick={() => {
                setLiked(false);
                setDisliked((prevState) => !prevState);
              }}
            >
              <AiFillDislike />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewInfo;
