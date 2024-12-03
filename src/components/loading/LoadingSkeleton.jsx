import React from "react";
import MovieCard from "../movie/MovieCard";
const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex flex-col p-3 rounded-lg movie-card bg-[rgb(47,48,50)]  ">
        <div className="h-[250px] flex-shrink-0  w-full rounded-lg mb-5 skeleton"></div>
        <div className="flex flex-col h-full">
          <h3 className="h-4 mb-auto rounded-lg skeleton "></h3>
          <div className="flex flex-col justify-between gap-2 mt-2 mb-4">
            <span className="h-2 rounded-lg skeleton"></span>
            <span className="h-2 rounded-lg skeleton"></span>
          </div>
          <button className="w-full h-10 px-6 py-3 rounded-lg skeleton"></button>
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;