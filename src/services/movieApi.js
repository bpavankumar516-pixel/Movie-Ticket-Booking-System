import { api } from './api';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'fake_key_fallback';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

// Comprehensive Authentic Movie Database matching MOVTEGO Design System & Reference Screenshot
export const MOCK_MOVIES = [
  {
    id: 1,
    tmdbId: 76600,
    title: 'Avatar',
    originalTitle: 'Avatar: The Way of Water',
    tagline: 'Return to Pandora in IMAX 3D.',
    overview: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    rating: 7.8,
    voteCount: 18400,
    likes: 18400,
    runtime: 162,
    releaseDate: '2009-12-18',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 12,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'James Cameron', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sam Worthington', role: 'As Jake Sully', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Zoe Saldana', role: 'As Neytiri', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/5PSNL1qE6VY'
  },
  {
    id: 2,
    tmdbId: 693134,
    title: 'Dune 2',
    originalTitle: 'Dune: Part Two',
    tagline: 'Long live the fighters across the desert sands.',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between love and fate.',
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
    tmdbId: 889737,
    title: 'Joker: Folie à Deux',
    originalTitle: 'Joker 2',
    tagline: 'The world is a stage for chaos.',
    overview: 'Failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=95',
    rating: 5.6,
    voteCount: 3200,
    likes: 3200,
    runtime: 138,
    releaseDate: '2024-10-04',
    language: 'French',
    status: 'Upcoming',
    category: 'upcoming',
    activeShows: 6,
    genres: ['Drama', 'Crime', 'Thriller'],
    formats: ['Dolby Cinema', 'Standard 2D'],
    cast: [
      { name: 'Todd Phillips', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Joaquin Phoenix', role: 'As Arthur Fleck / Joker', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Lady Gaga', role: 'As Harleen Quinzel', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/_OKAwz22TYg'
  },
  {
    id: 4,
    tmdbId: 558449,
    title: 'Gladiator II',
    tagline: 'What we do in life echoes in eternity.',
    overview: 'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by tyrant emperors.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&auto=format&fit=crop&q=95',
    rating: 7.2,
    voteCount: 4100,
    likes: 4100,
    runtime: 148,
    releaseDate: '2024-11-22',
    language: 'English',
    status: 'Published',
    category: 'published',
    activeShows: 14,
    genres: ['Action', 'Drama', 'History'],
    formats: ['IMAX 3D', '4DX', 'Dolby Atmos'],
    cast: [
      { name: 'Ridley Scott', role: 'Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Paul Mescal', role: 'As Lucius Verus', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Pedro Pascal', role: 'As Marcus Acacius', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/4rgYUipGJNo'
  },
  {
    id: 5,
    tmdbId: 533535,
    title: 'Deadpool & Wolverine',
    tagline: 'Everyone deserves a happy ending.',
    overview: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=95',
    rating: 8.1,
    voteCount: 9400,
    likes: 9400,
    runtime: 128,
    releaseDate: '2024-07-26',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 16,
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    formats: ['IMAX 3D', 'Dolby Atmos'],
    cast: [
      { name: 'Shawn Levy', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ryan Reynolds', role: 'As Wade Wilson / Deadpool', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Hugh Jackman', role: 'As Logan / Wolverine', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/73_1biulkYk'
  },
  {
    id: 6,
    tmdbId: 414906,
    title: 'The Batman',
    tagline: 'Unmask the truth.',
    overview: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city hidden corruption.',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=95',
    rating: 7.8,
    voteCount: 7800,
    likes: 7800,
    runtime: 176,
    releaseDate: '2022-03-04',
    language: 'English',
    status: 'Unpublished',
    category: 'unpublished',
    activeShows: 8,
    genres: ['Thriller', 'Crime', 'Action'],
    formats: ['Dolby Atmos', 'Standard 2D'],
    cast: [
      { name: 'Matt Reeves', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Robert Pattinson', role: 'As Bruce Wayne / Batman', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4'
  },
  {
    id: 7,
    tmdbId: 299536,
    title: 'Avengers: Endgame',
    tagline: 'Part of the journey is the end.',
    overview: 'After devastating events of Infinity War, the universe is in ruins. With remaining allies, the Avengers assemble once more to undo Thanos actions.',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=95',
    rating: 8.4,
    voteCount: 22000,
    likes: 22000,
    runtime: 181,
    releaseDate: '2019-04-26',
    language: 'English',
    status: 'Published',
    category: 'published',
    activeShows: 20,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'Anthony Russo', role: 'Director', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Robert Downey Jr.', role: 'As Tony Stark / Iron Man', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c'
  },
  {
    id: 8,
    tmdbId: 157336,
    title: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival as Earth resources deplete.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/pbrkL8a4c8yF4vBwFToKC7vg2x.jpg',
    rating: 8.6,
    voteCount: 16900,
    likes: 16900,
    runtime: 169,
    releaseDate: '2014-11-07',
    language: 'English',
    status: 'Archived',
    category: 'archived',
    activeShows: 4,
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    formats: ['70MM IMAX', 'Dolby Cinema'],
    cast: [
      { name: 'Christopher Nolan', role: 'Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Matthew McConaughey', role: 'As Cooper', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
  },
  {
    id: 9,
    tmdbId: 155,
    title: 'The Dark Knight',
    tagline: 'Welcome to a world without rules.',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&auto=format&fit=crop&q=95',
    rating: 9.0,
    voteCount: 28900,
    likes: 28900,
    runtime: 152,
    releaseDate: '2008-07-18',
    language: 'English',
    status: 'Published',
    category: 'published',
    activeShows: 15,
    genres: ['Action', 'Crime', 'Drama'],
    formats: ['IMAX 70MM', 'Dolby Atmos'],
    cast: [
      { name: 'Christopher Nolan', role: 'Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Christian Bale', role: 'As Bruce Wayne / Batman', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY'
  },
  {
    id: 10,
    tmdbId: 634649,
    title: 'Spider-Man: No Way Home',
    tagline: 'The Multiverse unleashed.',
    overview: 'With Spider-Man identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1920&auto=format&fit=crop&q=95',
    rating: 8.2,
    voteCount: 15200,
    likes: 15200,
    runtime: 148,
    releaseDate: '2021-12-17',
    language: 'English',
    status: 'Draft',
    category: 'draft',
    activeShows: 3,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    formats: ['IMAX 3D', '4DX'],
    cast: [
      { name: 'Jon Watts', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Tom Holland', role: 'As Peter Parker / Spider-Man', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/RmX-w16Lnhg'
  },
  {
    id: 11,
    tmdbId: 475557,
    title: 'Joker',
    tagline: 'Put on a happy face.',
    overview: 'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous figure.',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=95',
    rating: 8.5,
    voteCount: 19800,
    likes: 19800,
    runtime: 122,
    releaseDate: '2019-10-03',
    language: 'English',
    status: 'Published',
    category: 'published',
    activeShows: 11,
    genres: ['Thriller', 'Crime', 'Drama'],
    formats: ['Dolby Cinema', 'Standard 2D'],
    cast: [
      { name: 'Todd Phillips', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Joaquin Phoenix', role: 'As Arthur Fleck / Joker', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY'
  },
  {
    id: 12,
    tmdbId: 361743,
    title: 'Top Gun: Maverick',
    tagline: 'Feel the need for speed.',
    overview: 'After thirty years of service as a top naval aviator, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=95',
    rating: 8.3,
    voteCount: 11400,
    likes: 11400,
    runtime: 130,
    releaseDate: '2022-05-27',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 17,
    genres: ['Action', 'Drama'],
    formats: ['IMAX 4DX', 'Dolby Cinema'],
    cast: [
      { name: 'Joseph Kosinski', role: 'Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Tom Cruise', role: 'As Pete Maverick Mitchell', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/giXco2jaZ_4'
  },
  {
    id: 13,
    tmdbId: 823464,
    title: 'Kalki 2898 AD',
    tagline: 'When the world is consumed by darkness, a hero rises.',
    overview: 'A modern avatar of Lord Vishnu, believed to have descended to Earth to protect the world from evil forces in the post-apocalyptic year 2898 AD.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&auto=format&fit=crop&q=95',
    rating: 8.4,
    voteCount: 8900,
    likes: 8900,
    runtime: 180,
    releaseDate: '2024-06-27',
    language: 'Telugu',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 25,
    genres: ['Sci-Fi', 'Action', 'Mythology'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'Nag Ashwin', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Prabhas', role: 'As Bhairava / Karna', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Amitabh Bachchan', role: 'As Ashwatthama', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/kQDd1AhGIHk'
  },
  {
    id: 14,
    tmdbId: 912649,
    title: 'Pushpa 2: The Rule',
    tagline: 'Wildfire spreads across the nation.',
    overview: 'The clash continues between Pushpa Raj and Bhanwar Singh Shekhawat in the red sandalwood smuggling empire of Seshachalam.',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop&q=95',
    rating: 8.9,
    voteCount: 14500,
    likes: 14500,
    runtime: 175,
    releaseDate: '2024-12-05',
    language: 'Telugu',
    status: 'Upcoming',
    category: 'upcoming',
    activeShows: 30,
    genres: ['Action', 'Crime', 'Drama'],
    formats: ['IMAX', 'Dolby Atmos'],
    cast: [
      { name: 'Sukumar', role: 'Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Allu Arjun', role: 'As Pushpa Raj', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rashmika Mandanna', role: 'As Srivalli', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/1kGLUGAXm0w'
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
        
        if (response.data && response.data.results && response.data.results.length > 0) {
          const apiMovies = response.data.results.map((m, idx) => ({
            id: m.id,
            tmdbId: m.id,
            title: m.title,
            originalTitle: m.original_title,
            overview: m.overview,
            poster: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : MOCK_MOVIES[idx % MOCK_MOVIES.length].poster,
            backdrop: m.backdrop_path ? `${TMDB_IMAGE_BASE}${m.backdrop_path}` : MOCK_MOVIES[idx % MOCK_MOVIES.length].backdrop,
            rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 8.2,
            voteCount: m.vote_count || 1400,
            likes: m.vote_count || 1400,
            runtime: 142,
            releaseDate: m.release_date || '2024-03-01',
            language: m.original_language === 'te' ? 'Telugu' : m.original_language === 'hi' ? 'Hindi' : 'English',
            status: category === 'upcoming' ? 'Upcoming' : idx % 2 === 0 ? 'Now Showing' : 'Published',
            category: category,
            activeShows: (idx % 12) + 6,
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
    let results = [...MOCK_MOVIES];
    if (category !== 'all') {
      results = results.filter((m) => m.category === category || m.status.toLowerCase().replace(/\s+/g, '_') === category);
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
            rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 8.5,
            voteCount: m.vote_count || 4000,
            likes: m.vote_count || 4000,
            runtime: m.runtime || 150,
            releaseDate: m.release_date || '2024-03-01',
            language: m.original_language?.toUpperCase() || 'English',
            status: 'Now Showing',
            category: 'now_showing',
            activeShows: 12,
            genres: m.genres ? m.genres.map(g => g.name) : ['Sci-Fi', 'Drama'],
            formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
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
