import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { MovieGrid } from '../components/MovieGrid';
import { Movie, GENRES } from '../types/movie';
import { Breadcrumbs } from '../components/Breadcrumbs';

const API_KEY = '2c3ddf0f481ed8f96e903752808ab205';

export function GenrePage() {
  const { id } = useParams<{ id: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const genre = GENRES.find(g => g.id === Number(id));

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&sort_by=popularity.desc`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Movies', path: '/' },
            { label: genre?.name || 'Genre' }
          ]}
        />

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <MovieGrid title={`${genre?.name || 'Genre'} Movies`} movies={movies} />
        )}
      </main>
    </div>
  );
}