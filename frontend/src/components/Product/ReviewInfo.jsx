import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import batman from "../../assets/images/batman.jpg";
import { AiFillDislike, AiFillLike, AiFillLock } from "react-icons/ai";

function ReviewInfo() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { avatar } = faker.internet;
  const { color } = faker.internet;
  const { userName } = faker.internet;
  const { catchPhraseAdjective } = faker.company;
  const { catchPhraseDescriptor } = faker.company;
  const { paragraphs } = faker.lorem;
  const { time } = faker.date;

  return (
    <div className="flex p-3 mt-3">
      <img src={batman} alt={userName()} className="rounded-full w-10 h-10" />

      <div className="ml-2">
        <h1>@{userName()}</h1>
        <span></span>
        <p className="text-xs">{paragraphs()}</p>
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
  );
}

export default ReviewInfo;
