import React from "react";
import { Link } from "react-router-dom";

const Poster = (props) => {
  return (
    <Link to={`/movie/${props.id}`}>
      <div className="group flex flex-col items-start gap-3 px-2 md:px-3 transition-all duration-300 hover:scale-105">
        <div className="relative h-40 md:h-80 w-full overflow-hidden rounded-xl">
          <img
            src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
            alt="poster"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
          {/* Glass card overlay with movie info */}
          <div className="absolute bottom-3 left-3 right-3 glass-card p-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <div className="flex items-center justify-between text-white text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {props.vote_average?.toFixed(1) || "N/A"}
              </span>
              <span className="bg-blue-500/80 px-2 py-1 rounded-full text-xs font-medium">
                {props.release_date?.split('-')[0] || "TBA"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="w-full">
          <h3 className="text-base md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {props.original_title}
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            {props.genre_ids?.length > 0 ? "Action • Drama" : "Movie"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Poster;
