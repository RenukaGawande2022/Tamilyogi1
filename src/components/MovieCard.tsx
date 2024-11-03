import React from 'react';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  // Format rating with fallback for invalid values
  const rating = typeof movie.vote_average === 'number' && !isNaN(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : '0.0';

  // Format year with fallback for invalid dates
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-medium">{rating}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-600">{year}</p>
      </div>
    </Link>
  );
}