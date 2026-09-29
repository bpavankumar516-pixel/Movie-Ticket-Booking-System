import { api } from './api';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original';

const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const LANG_CODE_MAP = {
  Telugu: 'te',
  Hindi: 'hi',
  Tamil: 'ta',
  French: 'fr',
  English: 'en',
  Spanish: 'es',
  Japanese: 'ja'
};

// Authentic Multilingual Movie Catalog (English, Telugu, Hindi, Tamil, French)
export const MOCK_MOVIES = [
  // ENGLISH FLAGSHIP FAMOUS MOVIES
  {
    id: 1,
    tmdbId: 76600,
    title: 'Avatar: The Way of Water',
    originalTitle: 'Avatar 2',
    tagline: 'Return to Pandora in IMAX 3D.',
    overview: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race.',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    rating: 7.8,
    voteCount: 18400,
    likes: 18400,
    runtime: 192,
    releaseDate: '2022-12-16',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 16,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'James Cameron', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sam Worthington', role: 'As Jake Sully', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Zoe Saldana', role: 'As Neytiri', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0'
  },
  {
    id: 2,
    tmdbId: 693134,
    title: 'Dune: Part Two',
    originalTitle: 'Dune 2',
    tagline: 'Long live the fighters across the desert sands.',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjxh2CZjjYroq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    rating: 8.7,
    voteCount: 8920,
    likes: 8920,
    runtime: 166,
    releaseDate: '2024-03-01',
    language: 'English',
    status: 'Published',
    category: 'published',
    activeShows: 18,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    formats: ['IMAX 70MM', 'Dolby Atmos', 'VIP Lounge'],
    cast: [
      { name: 'Denis Villeneuve', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Timothée Chalamet', role: 'As Paul Atreides', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Zendaya', role: 'As Chani', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
  },
  {
    id: 3,
    tmdbId: 157336,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fKSuVQwio.jpg',
    rating: 8.6,
    voteCount: 34000,
    likes: 34000,
    runtime: 169,
    releaseDate: '2014-11-05',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 14,
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    formats: ['IMAX 70MM', 'Dolby Cinema', 'VIP Lounge'],
    cast: [
      { name: 'Christopher Nolan', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Matthew McConaughey', role: 'As Cooper', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Anne Hathaway', role: 'As Brand', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
  },

  // TELUGU FAMOUS MOVIES
  {
    id: 101,
    tmdbId: 579974,
    title: 'RRR',
    originalTitle: 'RRR',
    tagline: 'Rise, Roar, Revolt.',
    overview: 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.',
    poster: 'https://image.tmdb.org/t/p/w500/nEuF0D9ZwaMyfiAHbaH9y89C3hT.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/m2vFuG2yG63q0u1d2s0Zp0y44mY.jpg',
    rating: 8.9,
    voteCount: 22000,
    likes: 22000,
    runtime: 187,
    releaseDate: '2022-03-25',
    language: 'Telugu',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 28,
    genres: ['Action', 'Drama', 'History'],
    formats: ['IMAX 3D', 'Dolby Cinema'],
    cast: [
      { name: 'S.S. Rajamouli', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'N.T. Rama Rao Jr.', role: 'As Komaram Bheem', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ram Charan', role: 'As Alluri Sitarama Raju', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/NgBoT17G0hI'
  },
  {
    id: 102,
    tmdbId: 822119,
    title: 'Kalki 2898 AD',
    originalTitle: 'Kalki 2898 AD',
    tagline: 'The future of humanity begins in Kashi.',
    overview: 'A modern avatar of Lord Vishnu, believed to have descended to Earth to protect the world from evil forces in a dystopian world.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=95',
    rating: 8.4,
    voteCount: 14200,
    likes: 14200,
    runtime: 180,
    releaseDate: '2024-06-27',
    language: 'Telugu',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 24,
    genres: ['Sci-Fi', 'Action', 'Fantasy'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'Nag Ashwin', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Prabhas', role: 'As Bhairava', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Amitabh Bachchan', role: 'As Ashwatthama', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/kQDd1AhGIHk'
  },
  {
    id: 103,
    tmdbId: 940551,
    title: 'Pushpa 2: The Rule',
    originalTitle: 'Pushpa 2: The Rule',
    tagline: 'Wildfire takes over the syndicate.',
    overview: 'The clash between Pushpa Raj and Bhanwar Singh Shekhawat continues as Pushpa consolidates his sandalwood smuggling empire.',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=95',
    rating: 8.8,
    voteCount: 16500,
    likes: 16500,
    runtime: 175,
    releaseDate: '2024-12-05',
    language: 'Telugu',
    status: 'Upcoming',
    category: 'upcoming',
    activeShows: 30,
    genres: ['Action', 'Crime', 'Drama'],
    formats: ['IMAX', 'Dolby Atmos'],
    cast: [
      { name: 'Sukumar', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Allu Arjun', role: 'As Pushpa Raj', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rashmika Mandanna', role: 'As Srivalli', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/1kGLUGAXm0w'
  }
];

export const movieApi = {
  // Fetch Most Famous Blockbuster Movies sorted by popularity and high vote count
  getMovies: async (category = 'all', search = '', language = 'All') => {
    try {
      if (search && search.trim()) {
        const response = await api.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(search)}&page=1`);
        if (response.data && response.data.results && response.data.results.length > 0) {
          let list = response.data.results.map((m) => movieApi.formatTmdbMovie(m));
          if (language && language !== 'All') {
            const langCode = LANG_CODE_MAP[language];
            if (langCode) {
              list = list.filter(m => m.language === language || m.originalLanguage === langCode);
            }
          }
          return list;
        }
      } else if (language && language !== 'All') {
        const langCode = LANG_CODE_MAP[language] || 'en';
        // Discover by vote_count.desc to get the MOST FAMOUS blockbuster movies first!
        const response = await api.get(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=${langCode}&sort_by=vote_count.desc&page=1`);
        if (response.data && response.data.results && response.data.results.length > 0) {
          let list = response.data.results.map((m) => movieApi.formatTmdbMovie(m, category, language));
          
          if (language === 'English') {
            const flagship = MOCK_MOVIES.filter(m => m.language === 'English');
            const existingIds = new Set(list.map(m => m.tmdbId));
            const toAdd = flagship.filter(m => !existingIds.has(m.tmdbId));
            list = [...toAdd, ...list];
          }
          return list;
        }
      } else {
        // Fetch top rated / most famous movies globally
        const endpoint = '/movie/top_rated';
        const response = await api.get(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        
        if (response.data && response.data.results && response.data.results.length > 0) {
          let list = response.data.results.map((m) => movieApi.formatTmdbMovie(m, category));
          
          // Prepend flagship movies (Avatar 2, Dune 2, Interstellar)
          const flagship = MOCK_MOVIES.filter(m => [76600, 693134, 157336].includes(m.tmdbId));
          const existingIds = new Set(list.map(m => m.tmdbId));
          const toAdd = flagship.filter(m => !existingIds.has(m.tmdbId));
          return [...toAdd, ...list];
        }
      }
    } catch (error) {
      console.warn('TMDB Network API fallback triggered:', error);
    }

    // Fallback Mock Filtering if offline (sorted by rating descending)
    let results = [...MOCK_MOVIES];
    if (category !== 'all') {
      results = results.filter((m) => m.category === category || m.status.toLowerCase().replace(/\s+/g, '_') === category);
    }
    if (language !== 'All') {
      results = results.filter((m) => m.language.toLowerCase() === language.toLowerCase());
    }
    if (search) {
      results = results.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
    }
    results.sort((a, b) => b.rating - a.rating);
    return results;
  },

  // Helper to format TMDB JSON response to app model
  formatTmdbMovie: (m, category = 'popular', enforcedLanguage = null) => {
    const genreNames = m.genre_ids ? m.genre_ids.map(id => GENRE_MAP[id]).filter(Boolean) : [];
    if (genreNames.length === 0) genreNames.push('Sci-Fi', 'Action');

    const posterUrl = m.poster_path 
      ? `${TMDB_IMAGE_BASE}${m.poster_path}` 
      : 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg';

    const backdropUrl = m.backdrop_path 
      ? `${TMDB_IMAGE_ORIGINAL}${m.backdrop_path}` 
      : 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg';

    const langMap = {
      te: 'Telugu',
      hi: 'Hindi',
      ta: 'Tamil',
      fr: 'French',
      en: 'English',
      es: 'Spanish',
      ja: 'Japanese',
      ko: 'Korean'
    };

    const movieLang = enforcedLanguage || langMap[m.original_language] || 'English';

    return {
      id: m.id,
      tmdbId: m.id,
      title: m.title,
      originalTitle: m.original_title || m.title,
      overview: m.overview || 'Experience this remarkable cinematic masterpiece in theaters and IMAX formats.',
      poster: posterUrl,
      backdrop: backdropUrl,
      rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 8.2,
      voteCount: m.vote_count || 3200,
      likes: m.vote_count || 3200,
      runtime: 135 + (m.id % 35),
      releaseDate: m.release_date || '2024-03-01',
      language: movieLang,
      originalLanguage: m.original_language,
      status: category === 'upcoming' ? 'Upcoming' : m.vote_average > 7.5 ? 'Now Showing' : 'Published',
      category: category,
      activeShows: (m.id % 15) + 6,
      genres: genreNames,
      formats: ['IMAX 3D', 'Dolby Atmos', '4DX', 'VIP Lounge'],
      cast: [
        { name: 'Lead Director', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
        { name: 'Featured Star', role: 'Protagonist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
        { name: 'Co-Star', role: 'Supporting', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
      ],
      trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0'
    };
  },

  // Get single Movie by ID with real TMDB videos & credits
  getMovieById: async (id) => {
    try {
      const response = await api.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos,credits`);
      const m = response.data;
      if (m) {
        const trailerObj = m.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        const trailerLink = trailerObj ? `https://www.youtube.com/embed/${trailerObj.key}` : 'https://www.youtube.com/embed/Way9Dexny3w';

        const castList = m.credits?.cast?.slice(0, 4).map(c => ({
          name: c.name,
          role: `As ${c.character}`,
          avatar: c.profile_path ? `${TMDB_IMAGE_BASE}${c.profile_path}` : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
        })) || MOCK_MOVIES[0].cast;

        return {
          id: m.id,
          tmdbId: m.id,
          title: m.title,
          originalTitle: m.original_title,
          tagline: m.tagline || 'Experience the cinematic spectacle.',
          overview: m.overview,
          poster: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : MOCK_MOVIES[0].poster,
          backdrop: m.backdrop_path ? `${TMDB_IMAGE_ORIGINAL}${m.backdrop_path}` : MOCK_MOVIES[0].backdrop,
          rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 8.5,
          voteCount: m.vote_count || 4000,
          likes: m.vote_count || 4000,
          runtime: m.runtime || 150,
          releaseDate: m.release_date || '2024-03-01',
          language: m.spoken_languages?.[0]?.english_name || 'English',
          status: 'Now Showing',
          category: 'now_showing',
          activeShows: 14,
          genres: m.genres ? m.genres.map(g => g.name) : ['Sci-Fi', 'Action'],
          formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
          cast: castList,
          trailerUrl: trailerLink
        };
      }
    } catch (e) {
      console.warn('TMDB movie detail fetch failed, returning mock default');
    }

    const numericId = Number(id);
    return MOCK_MOVIES.find((m) => m.id === numericId || m.tmdbId === numericId) || MOCK_MOVIES[0];
  }
};
