import React, {useState} from "react";
import {Star} from "lucide-react";

const RatingStars = ({totalStars = 5, initialRating = 0, onRate}) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const handleClick = (rate) => {
        setRating(rate);
        if (onRate) {
            onRate(rate);
        }
    };

    const isInteractive = !!onRate;

    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;

                // Determine the star's visual state
                const isFilled = starValue <= (hover || rating);

                return (
                    <button
                        type="button"
                        key={starValue}
                        className={`bg-transparent border-none p-0.5 ${
                            isInteractive ? "cursor-pointer" : "cursor-default"
                        }`}
                        onClick={() => isInteractive && handleClick(starValue)}
                        onMouseEnter={() => isInteractive && setHover(starValue)}
                        onMouseLeave={() => isInteractive && setHover(0)}
                        aria-label={`Rate ${starValue} ${starValue > 1 ? 'stars' : 'star'}`}
                        disabled={!isInteractive}
                    >
                        <Star
                            size={24} // Slightly larger for better tap/click
                            className="transition-colors duration-150"
                            // Use our new 'secondary' color for the fill
                            fill={
                                isFilled
                                    ? "currentColor"
                                    : "none"
                            }
                            // Use theme colors for stroke and fill
                            color={
                                isFilled
                                    ? "rgb(251, 191, 36)" // secondary-400
                                    : "rgb(214, 211, 209)" // neutral-300
                            }
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default RatingStars;