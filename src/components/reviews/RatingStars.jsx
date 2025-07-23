import React, { useState } from "react";
import { Star } from "lucide-react";

const RatingStars = ({ totalStars = 5, initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (rate) => {
    setRating(rate);
    if (onRate) {
      onRate(rate);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className={`bg-transparent border-none cursor-pointer p-0 ${
              !onRate && "cursor-default"
            }`}
            onClick={() => onRate && handleClick(starValue)}
            onMouseEnter={() => onRate && setHover(starValue)}
            onMouseLeave={() => onRate && setHover(0)}
          >
            <Star
              size={24}
              className="transition-colors"
              fill={starValue <= (hover || rating) ? "#f59e0b" : "none"}
              stroke={starValue <= (hover || rating) ? "#f59e0b" : "#9ca3af"}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
