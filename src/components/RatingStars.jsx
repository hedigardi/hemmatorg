import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({ rating = 0 }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
