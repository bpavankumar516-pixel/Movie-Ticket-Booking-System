import { api } from './api';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'fake_key_fallback';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

// Comprehensive Fallback Mock Data Service Layer
export const MOCK_MOVIES = [
  {
    id: 101,
    tmdbId: 693134,
    title: 'Dune: Part Two',
    originalTitle: 'Dune 2 (沙丘2)',
    tagline: 'Long live the fighters.',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future.',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2400&auto=format&fit=crop&q=95',
    rating: 9.6,
    voteCount: 4956,
    likes: 4956,
    runtime: 166,
    releaseDate: '2024-03-01',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX', 'VIP Lounge'],
    cast: [
      { name: 'Denis Villeneuve', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Timothée Chalamet', role: 'As Paul Atreides', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Zendaya Coleman', role: 'As Chani', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Florence Pugh', role: 'As Princess Irulan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
  },
  {
    id: 102,
    tmdbId: 453395,
    title: 'Doctor Strange in the Multiverse of Madness',
    originalTitle: 'Doctor Strange 2',
    tagline: 'Enter a new dimension of Strange.',
    overview: 'Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses to battle multiple threats across infinite realities.',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=2400&auto=format&fit=crop&q=95',
    rating: 9.4,
    voteCount: 3820,
    likes: 3820,
    runtime: 126,
    releaseDate: '2024-02-10',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    genres: ['Action', 'Fantasy', 'Sci-Fi'],
    formats: ['IMAX 3D', 'Dolby Atmos'],
    cast: [
      { name: 'Sam Raimi', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Benedict Cumberbatch', role: 'As Dr. Stephen Strange', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Elizabeth Olsen', role: 'As Wanda Maximoff', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/aWzlQ2N6qqg'
  },
  {
    id: 103,
    tmdbId: 872585,
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    tagline: 'The world forever changes.',
    overview: 'The story of J. Robert Oppenheimer role in the development of the atomic bomb during World War II and its dramatic aftermath.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=2400&auto=format&fit=crop&q=95',
    rating: 9.5,
    voteCount: 6120,
    likes: 6120,
    runtime: 180,
    releaseDate: '2023-07-21',
    language: 'English',
    status: 'Top Rated',
    category: 'top_rated',
    genres: ['Biography', 'Drama', 'History'],
    formats: ['70MM IMAX', 'Dolby Atmos'],
    cast: [
      { name: 'Christopher Nolan', role: 'Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Cillian Murphy', role: 'As J. Robert Oppenheimer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Emily Blunt', role: 'As Katherine Oppenheimer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg'
  },
  {
    id: 104,
    tmdbId: 299536,
    title: 'Avengers: Endgame',
    originalTitle: 'Avengers Endgame',
    tagline: 'A part of the journey is the end.',
    overview: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos actions and restore balance.',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=2400&auto=format&fit=crop&q=95',
    rating: 9.8,
    voteCount: 9980,
    likes: 9980,
    runtime: 181,
    releaseDate: '2019-04-26',
    language: 'English',
    status: 'Top Rated',
    category: 'popular',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'Anthony Russo', role: 'Director', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Robert Downey Jr.', role: 'As Tony Stark / Iron Man', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Chris Evans', role: 'As Steve Rogers / Captain America', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c'
  },
  {
    id: 105,
    tmdbId: 76600,
    title: 'Avatar: The Way of Water',
    originalTitle: 'Avatar 2',
    tagline: 'Return to Pandora.',
    overview: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=2400&auto=format&fit=crop&q=95',
    rating: 9.3,
    voteCount: 7850,
    likes: 7850,
    runtime: 192,
    releaseDate: '2022-12-16',
    language: 'English',
    status: 'Popular',
    category: 'popular',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    formats: ['IMAX 3D', '4DX'],
    cast: [
      { name: 'James Cameron', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sam Worthington', role: 'As Jake Sully', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Zoe Saldana', role: 'As Neytiri', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0'
  },
  {
    id: 106,
    tmdbId: 157336,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    overview: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=2400&auto=format&fit=crop&q=95',
    rating: 9.7,
    voteCount: 9150,
    likes: 9150,
    runtime: 169,
    releaseDate: '2014-11-07',
    language: 'English',
    status: 'Top Rated',
    category: 'top_rated',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    formats: ['IMAX 70MM', 'Dolby Atmos'],
    cast: [
      { name: 'Christopher Nolan', role: 'Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Matthew McConaughey', role: 'As Cooper', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Anne Hathaway', role: 'As Brand', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
  },
  {
    id: 107,
    tmdbId: 569094,
    title: 'Spider-Man: Beyond the Spider-Verse',
    originalTitle: 'Beyond the Spider-Verse',
    tagline: 'The fate of the multiverse rests in his hands.',
    overview: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=2400&auto=format&fit=crop&q=95',
    rating: 9.6,
    voteCount: 4200,
    likes: 4200,
    runtime: 140,
    releaseDate: '2026-11-20',
    language: 'English',
    status: 'Upcoming',
    category: 'upcoming',
    genres: ['Animation', 'Action', 'Sci-Fi'],
    formats: ['IMAX 3D', 'Dolby Atmos'],
    cast: [
      { name: 'Joaquim Dos Santos', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Shameik Moore', role: 'As Miles Morales', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg'
  }
];

export const movieApi = {
  // Get Movies List with Category filter & Search
  getMovies: async (category = 'all', search = '') => {
    try {
      if (TMDB_API_KEY && TMDB_API_KEY !== 'fake_key_fallback') {
        const endpoint = category === 'now_showing' ? '/movie/now_playing' 
          : category === 'popular' ? '/movie/popular'
          : category === 'top_rated' ? '/movie/top_rated'
          : category === 'upcoming' ? '/movie/upcoming'
          : '/movie/now_playing';

        const response = await api.get(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        
        if (response.data && response.data.results) {
          const apiMovies = response.data.results.map((m) => ({
            id: m.id,
            tmdbId: m.id,
            title: m.title,
            originalTitle: m.original_title,
            overview: m.overview,
            poster: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : MOCK_MOVIES[0].poster,
            backdrop: m.backdrop_path ? `${TMDB_IMAGE_BASE}${m.backdrop_path}` : MOCK_MOVIES[0].backdrop,
            rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 8.5,
            voteCount: m.vote_count || 1200,
            likes: m.vote_count || 1200,
            runtime: 135,
            releaseDate: m.release_date || '2025-01-01',
            language: 'English',
            status: category === 'upcoming' ? 'Upcoming' : 'Now Showing',
            category: category,
            genres: ['Sci-Fi', 'Action', 'Drama'],
            formats: ['IMAX 3D', 'Dolby Atmos', 'VIP Lounge'],
            cast: MOCK_MOVIES[0].cast,
            trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
          }));

          if (search) {
            return apiMovies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
          }
          return apiMovies;
        }
      }
    } catch (error) {
      console.warn('TMDB API Unavailable, switching to local MOCK_MOVIES service');
    }

    // Fallback Mock Filtering
    let results = MOCK_MOVIES;
    if (category !== 'all') {
      results = results.filter((m) => m.category === category || m.status.toLowerCase().replace(' ', '_') === category);
    }
    if (search) {
      results = results.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
    }
    return results;
  },

  // Get single Movie by ID
  getMovieById: async (id) => {
    const numericId = Number(id);
    const mock = MOCK_MOVIES.find((m) => m.id === numericId || m.tmdbId === numericId);
    if (mock) return mock;

    try {
      if (TMDB_API_KEY && TMDB_API_KEY !== 'fake_key_fallback') {
        const response = await api.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
        const m = response.data;
        if (m) {
          return {
            id: m.id,
            tmdbId: m.id,
            title: m.title,
            originalTitle: m.original_title,
            overview: m.overview,
            poster: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : MOCK_MOVIES[0].poster,
            backdrop: m.backdrop_path ? `${TMDB_IMAGE_BASE}${m.backdrop_path}` : MOCK_MOVIES[0].backdrop,
            rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 9.0,
            voteCount: m.vote_count || 4000,
            likes: m.vote_count || 4000,
            runtime: m.runtime || 140,
            releaseDate: m.release_date || '2024-03-01',
            language: m.original_language?.toUpperCase() || 'English',
            status: 'Now Showing',
            category: 'now_showing',
            genres: m.genres ? m.genres.map(g => g.name) : ['Sci-Fi', 'Drama'],
            formats: ['IMAX 3D', 'Dolby Atmos', '4DX', 'VIP Lounge'],
            cast: MOCK_MOVIES[0].cast,
            trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
          };
        }
      }
    } catch (e) {
      console.warn('TMDB movie detail fetch failed, returning mock default');
    }

    return MOCK_MOVIES[0];
  }
};
