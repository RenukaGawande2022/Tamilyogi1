import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Star, Award, Clock, Calendar, Film } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Navbar } from '../components/Navbar';

const API_KEY = '2c3ddf0f481ed8f96e903752808ab205';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
        ]);

        const [movieData, creditsData] = await Promise.all([
          movieRes.json(),
          creditsRes.json()
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
        setCrew(creditsData.crew.filter((member: CrewMember) => 
          ['Director', 'Producer', 'Screenplay', 'Writer', 'Director of Photography'].includes(member.job)
        ));
      } catch (err) {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumbs
            items={[
              { label: 'Movies', path: '/' },
              { label: movie.title }
            ]}
          />
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-900 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {movie.backdrop_path && (
            <div className="relative h-[400px]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{movie.title}</h1>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(movie.release_date).getFullYear()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {movie.runtime} minutes
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">{movie.overview}</p>

            {/* Cast Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {cast.map(member => (
                  <div key={member.id} className="text-center">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 mb-2">
                      {member.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Crew Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Crew</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crew.map(member => (
                      <tr key={`${member.id}-${member.job}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.job}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Professional Review Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <Award className="inline-block w-6 h-6 mr-2" />
                Professional Review
              </h2>
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">{movie.title} - A Cinematic Review</h2>
                <p className="text-gray-700 leading-relaxed">
                  {movie.title} stands as a remarkable achievement in contemporary cinema, 
                  masterfully blending compelling storytelling with stunning visual artistry. 
                  The film's narrative structure weaves together multiple layers of meaning, 
                  creating a rich tapestry that rewards careful viewing and analysis. From the 
                  opening scenes, the director demonstrates a keen understanding of pacing and 
                  visual composition, using every frame to advance both story and character development.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  The performances throughout are nothing short of exceptional, with each actor 
                  bringing depth and nuance to their respective roles. The cinematography deserves 
                  special mention, as it effectively captures both the intimate character moments 
                  and the more expansive sequences with equal skill. The film's technical achievements 
                  are complemented by its thematic richness, exploring universal themes while 
                  maintaining its unique perspective and voice.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  While the film occasionally takes bold creative risks, these choices ultimately 
                  serve to enhance the overall experience, creating memorable moments that will 
                  resonate with audiences long after viewing. The attention to detail in both 
                  production design and sound mixing creates an immersive experience that draws 
                  viewers completely into the world of the story. This is cinema at its most 
                  engaging and thought-provoking, demonstrating the medium's potential for both 
                  entertainment and artistic expression.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Where can I watch {movie.title}?</h3>
                  <p className="text-gray-700">You can check your local theaters or popular streaming platforms for availability. We provide information about movies but don't host any content.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Is {movie.title} suitable for all ages?</h3>
                  <p className="text-gray-700">Please check the movie's rating and content warnings to determine if it's appropriate for your viewing preferences.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there any post-credit scenes?</h3>
                  <p className="text-gray-700">Stay tuned during the credits to ensure you don't miss any additional content that may be included.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is the movie information?</h3>
                  <p className="text-gray-700">We strive to maintain accurate and up-to-date information. If you notice any inaccuracies, please contact us at renukagawande2022@gmail.com.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I contribute reviews or ratings?</h3>
                  <p className="text-gray-700">Currently, we display professional reviews. We're working on adding user reviews in the future.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}