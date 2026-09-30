import { api } from './api';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';
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
  Japanese: 'ja'
};

// Authentic Multilingual Movie Catalog (English, Telugu, Hindi, Tamil, French) with Official Posters
export const MOCK_MOVIES = [
  // 1. Avatar: The Way of Water (English Blockbuster)
  {
    id: 1,
    tmdbId: 76600,
    title: 'Avatar: The Way of Water',
    originalTitle: 'Avatar 2',
    tagline: 'Return to Pandora in IMAX 3D.',
    overview: 'Jake Sully lives with his family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri.',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIfvMGNVChLEoPJ3z212iYyN3.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s16H6WHAWn2vFBhMCUtwqF8Phzp.jpg',
    rating: 8.9,
    voteCount: 32000,
    likes: 32000,
    runtime: 192,
    releaseDate: '2022-12-16',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 28,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'James Cameron', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sam Worthington', role: 'As Jake Sully', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Zoe Saldana', role: 'As Neytiri', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0'
  },
  // 2. Avengers: Endgame (English Blockbuster)
  {
    id: 601,
    tmdbId: 299534,
    title: 'Avengers: Endgame',
    originalTitle: 'Avengers Endgame',
    tagline: 'Part of the journey is the end.',
    overview: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions.',
    poster: 'https://image.tmdb.org/t/p/w500/or06tUkWStQZ2bseZ2fYtBd3BhL.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7RyGkoB9RyP1vOHMOKbUkjZ7T5b.jpg',
    rating: 8.9,
    voteCount: 35000,
    likes: 35000,
    runtime: 181,
    releaseDate: '2019-04-26',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 32,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    formats: ['IMAX 3D', 'Dolby Cinema', '4DX'],
    cast: [
      { name: 'Anthony & Joe Russo', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Robert Downey Jr.', role: 'As Tony Stark / Iron Man', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Chris Evans', role: 'As Steve Rogers / Captain America', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c'
  },
  // 3. Salaar: Part 1 – Ceasefire (Telugu Blockbuster)
  {
    id: 602,
    tmdbId: 778000,
    title: 'Salaar: Part 1 – Ceasefire',
    originalTitle: 'Salaar',
    tagline: 'The most violent man. A promise made to a friend.',
    overview: 'A gang leader tries to keep a promise made to his dying friend and takes on other criminal gangs in the dystopian city-state of Khansaar.',
    poster: 'https://image.tmdb.org/t/p/w500/4n2gECLy65j2eC226n9n4S61483.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/m99A3s1k8p3f3f22n5H6e3Z5g1.jpg',
    rating: 8.8,
    voteCount: 22000,
    likes: 22000,
    runtime: 175,
    releaseDate: '2023-12-22',
    language: 'Telugu',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 30,
    genres: ['Action', 'Crime', 'Drama'],
    formats: ['IMAX 4K', 'Dolby Atmos', '4DX'],
    cast: [
      { name: 'Prashanth Neel', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Prabhas', role: 'As Deva / Salaar', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Prithviraj Sukumaran', role: 'As Varadha Raja Mannaar', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/HihakFi632Q'
  },
  // 2. Dune: Part Two (English Blockbuster)
  {
    id: 2,
    tmdbId: 693134,
    title: 'Dune: Part Two',
    originalTitle: 'Dune 2',
    tagline: 'Long live the fighters across the desert sands.',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=95',
    rating: 8.7,
    voteCount: 18920,
    likes: 18920,
    runtime: 166,
    releaseDate: '2024-03-01',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
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
  // 3. Baahubali 2: The Conclusion (Telugu Blockbuster)
  {
    id: 104,
    tmdbId: 350312,
    title: 'Baahubali 2: The Conclusion',
    originalTitle: 'Baahubali 2',
    tagline: 'The king has returned to reclaim his rightful throne.',
    overview: 'Shiva, the son of Bahubali, begins to search for answers after learning about his heritage in the kingdom of Mahishmati.',
    poster: 'https://image.tmdb.org/t/p/w500/21sC2assImQIYCEDA84Qh9d1RsK.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/whNjsTOUVg2lZLCKgGhnACnmV8E.jpg',
    rating: 8.8,
    voteCount: 25000,
    likes: 25000,
    runtime: 167,
    releaseDate: '2017-04-28',
    language: 'Telugu',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 22,
    genres: ['Action', 'Adventure', 'Drama'],
    formats: ['IMAX 4K', 'Dolby Cinema'],
    cast: [
      { name: 'S.S. Rajamouli', role: 'Director', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Prabhas', role: 'As Amarendra Baahubali', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rana Daggubati', role: 'As Bhallaladeva', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/qD-6d8Wo3do'
  },
  // 4. Interstellar (English Blockbuster)
  {
    id: 3,
    tmdbId: 157336,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
    poster: 'https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/8sNiAPPYU14PUepFNeSNGUTiHW.jpg',
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
  // 5. Vikram (Tamil Blockbuster)
  {
    id: 301,
    tmdbId: 743563,
    title: 'Vikram',
    originalTitle: 'Vikram',
    tagline: 'Once upon a time there lived a ghost.',
    overview: 'A special agent investigates a murder committed by a masked group of serial killers. However, a tangled maze of clues leads him to the drug kingpin of Chennai.',
    poster: 'https://image.tmdb.org/t/p/w500/774UV1aCURb4s4JfEFg3IEMu5Zj.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/dkIX4dSMuVqjfrPGunBJUR7K3LQ.jpg',
    rating: 8.6,
    voteCount: 18000,
    likes: 18000,
    runtime: 174,
    releaseDate: '2022-06-03',
    language: 'Tamil',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 20,
    genres: ['Action', 'Crime', 'Thriller'],
    formats: ['IMAX 2D', 'Dolby Atmos'],
    cast: [
      { name: 'Lokesh Kanagaraj', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kamal Haasan', role: 'As Vikram', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Vijay Sethupathi', role: 'As Santhanam', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/OKBMCL-frPU'
  },
  // 6. Jawan (Hindi Blockbuster)
  {
    id: 201,
    tmdbId: 872906,
    title: 'Jawan',
    originalTitle: 'Jawan',
    tagline: 'Ready or not, here comes the vigilante.',
    overview: 'A driven jailer driven by a personal vendetta sets out to rectify the wrongs in society while keeping a promise made years ago.',
    poster: 'https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/5LtSjMNw6j3LkG29Oa4O0iY5U8.jpg',
    rating: 8.5,
    voteCount: 19000,
    likes: 19000,
    runtime: 169,
    releaseDate: '2023-09-07',
    language: 'Hindi',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 25,
    genres: ['Action', 'Thriller', 'Drama'],
    formats: ['IMAX 4K', 'Dolby Atmos'],
    cast: [
      { name: 'Atlee', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Shah Rukh Khan', role: 'As Vikram Rathore / Azad', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Nayanthara', role: 'As Narmada Rai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/COv52Qyctws'
  },
  // 7. Kalki 2898 AD (Telugu Blockbuster)
  {
    id: 102,
    tmdbId: 801688,
    title: 'Kalki 2898 AD',
    originalTitle: 'Kalki 2898 AD',
    tagline: 'The future of humanity begins in Kashi.',
    overview: 'A modern avatar of Lord Vishnu, believed to have descended to Earth to protect the world from evil forces in a dystopian world.',
    poster: 'https://image.tmdb.org/t/p/w500/rstcAnBeCkxNQjNp3YXrF6IP1tW.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/o8XSR1SONnjcsv84NRu6Mwsl5io.jpg',
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
  // 8. Leo (Tamil Blockbuster)
  {
    id: 302,
    tmdbId: 949229,
    title: 'Leo',
    originalTitle: 'Leo',
    tagline: 'Bloody Sweet.',
    overview: 'A mild-mannered cafe owner in Himachal Pradesh becomes a local hero through an act of violence, triggering ghosts from his hidden past.',
    poster: 'https://image.tmdb.org/t/p/w500/2XUHC4lp3tDsgfFLFygNZ2x2Um9.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/zXuGXX6IjWRVjHQqMaxaobqzD8O.jpg',
    rating: 8.4,
    voteCount: 16000,
    likes: 16000,
    runtime: 164,
    releaseDate: '2023-10-19',
    language: 'Tamil',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 22,
    genres: ['Action', 'Thriller', 'Crime'],
    formats: ['IMAX 2D', 'Dolby Cinema'],
    cast: [
      { name: 'Lokesh Kanagaraj', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Thalapathy Vijay', role: 'As Parthiban / Leo Das', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sanjay Dutt', role: 'As Antony Das', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/Po3jStA673E'
  },
  // 9. Animal (Hindi Blockbuster)
  {
    id: 202,
    tmdbId: 781732,
    title: 'Animal',
    originalTitle: 'Animal',
    tagline: 'A father-son conflict of feral proportions.',
    overview: 'A son\'s obsessive love for his father leads him down a dark and violent path of revenge against those who threatened his father\'s life.',
    poster: 'https://image.tmdb.org/t/p/w500/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/lprsAHkwMxk2iC6VZxNmV0H7g1t.jpg',
    rating: 8.3,
    voteCount: 17000,
    likes: 17000,
    runtime: 201,
    releaseDate: '2023-12-01',
    language: 'Hindi',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 20,
    genres: ['Action', 'Drama', 'Crime'],
    formats: ['Dolby Atmos', 'VIP Lounge'],
    cast: [
      { name: 'Sandeep Reddy Vanga', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ranbir Kapoor', role: 'As Ranvijay Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Anil Kapoor', role: 'As Balbir Singh', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/Dydmpfo68DA'
  },
  // 10. Avatar: The Way of Water (English Blockbuster)
  {
    id: 1,
    tmdbId: 76600,
    title: 'Avatar: The Way of Water',
    originalTitle: 'Avatar 2',
    tagline: 'Return to Pandora in IMAX 3D.',
    overview: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri.',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/kJsPVzdyBrYHLomuNv5SJDXUQ2f.jpg',
    rating: 8.2,
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
  // 11. Oppenheimer (English Blockbuster)
  {
    id: 4,
    tmdbId: 872585,
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    tagline: 'The story of American scientist J. Robert Oppenheimer.',
    overview: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg',
    rating: 8.6,
    voteCount: 28000,
    likes: 28000,
    runtime: 180,
    releaseDate: '2023-07-21',
    language: 'English',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 18,
    genres: ['Drama', 'History', 'Biography'],
    formats: ['IMAX 70MM', 'Dolby Cinema'],
    cast: [
      { name: 'Christopher Nolan', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Cillian Murphy', role: 'As J. Robert Oppenheimer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Emily Blunt', role: 'As Katherine Oppenheimer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg'
  },
  // 12. Pushpa 2: The Rule (Telugu Upcoming)
  {
    id: 103,
    tmdbId: 857598,
    title: 'Pushpa 2: The Rule',
    originalTitle: 'Pushpa 2: The Rule',
    tagline: 'Wildfire takes over the syndicate.',
    overview: 'The clash between Pushpa Raj and Bhanwar Singh Shekhawat continues as Pushpa consolidates his sandalwood smuggling empire.',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=95',
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
  },
  // 13. Deadpool & Wolverine (Upcoming Release)
  {
    id: 501,
    tmdbId: 533535,
    title: 'Deadpool & Wolverine',
    originalTitle: 'Deadpool & Wolverine',
    tagline: 'Everyone deserves a happy ending.',
    overview: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=95',
    rating: 8.6,
    voteCount: 14000,
    likes: 14000,
    runtime: 128,
    releaseDate: '2024-07-26',
    language: 'English',
    status: 'Upcoming',
    category: 'upcoming',
    activeShows: 25,
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    formats: ['IMAX 3D', '4DX', 'Dolby Cinema'],
    cast: [
      { name: 'Shawn Levy', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ryan Reynolds', role: 'As Wade Wilson / Deadpool', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Hugh Jackman', role: 'As Logan / Wolverine', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/73_1biulk6s'
  },
  // 14. Joker: Folie à Deux (Upcoming Release)
  {
    id: 502,
    tmdbId: 889737,
    title: 'Joker: Folie à Deux',
    originalTitle: 'Joker 2',
    tagline: 'The world is a stage.',
    overview: 'Failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=95',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=95',
    rating: 8.5,
    voteCount: 12500,
    likes: 12500,
    runtime: 138,
    releaseDate: '2024-10-04',
    language: 'English',
    status: 'Upcoming',
    category: 'upcoming',
    activeShows: 20,
    genres: ['Thriller', 'Drama', 'Crime'],
    formats: ['IMAX 70MM', 'Dolby Cinema'],
    cast: [
      { name: 'Todd Phillips', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Joaquin Phoenix', role: 'As Arthur Fleck / Joker', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Lady Gaga', role: 'As Harleen Quinzel / Harley Quinn', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/_OKAwz223lU'
  },
  // 13. Pathaan (Hindi Blockbuster)
  {
    id: 203,
    tmdbId: 864692,
    title: 'Pathaan',
    originalTitle: 'Pathaan',
    tagline: 'An exiled RAW agent takes on a ruthless mercenary syndicate.',
    overview: 'An Indian secret agent takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.',
    poster: 'https://image.tmdb.org/t/p/w500/arf00BkwvXo0CFKbaD9OpqdE4Nu.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9wRAIQeOv2qzcgpfvA4dYZKeezl.jpg',
    rating: 8.2,
    voteCount: 15000,
    likes: 15000,
    runtime: 146,
    releaseDate: '2023-01-25',
    language: 'Hindi',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 18,
    genres: ['Action', 'Adventure', 'Thriller'],
    formats: ['IMAX 2D', 'Dolby Atmos'],
    cast: [
      { name: 'Siddharth Anand', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Shah Rukh Khan', role: 'As Pathaan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Deepika Padukone', role: 'As Rubina Mohsin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/vqu4z34wENw'
  },
  // 14. Jailer (Tamil Blockbuster)
  {
    id: 303,
    tmdbId: 937020,
    title: 'Jailer',
    originalTitle: 'Jailer',
    tagline: 'Hukum - Tiger Ka Hukum.',
    overview: 'A retired jailer goes on a rampage to find his son\'s killers, unearthing a massive idol smuggling operation in the process.',
    poster: 'https://image.tmdb.org/t/p/w500/pTmMxAHqX4vsIDE6HPPxOR0Q6TN.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ownDZBS9ecoPbWjW5V5L8jknGF.jpg',
    rating: 8.3,
    voteCount: 15000,
    likes: 15000,
    runtime: 168,
    releaseDate: '2023-08-10',
    language: 'Tamil',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 22,
    genres: ['Action', 'Crime', 'Comedy'],
    formats: ['Dolby Cinema', 'VIP Lounge'],
    cast: [
      { name: 'Nelson Dilipkumar', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rajinikanth', role: 'As Tiger Muthuvel Pandian', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Mohanlal', role: 'As Mathew', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/xenOE1Tma0s'
  },
  // 15. Stree 2 (Hindi Blockbuster)
  {
    id: 204,
    tmdbId: 1112426,
    title: 'Stree 2',
    originalTitle: 'Stree 2: Sarkate Ka Aatank',
    tagline: 'O Stree Raksha Karna.',
    overview: 'The town of Chanderi is haunted again, this time by a headless entity named Sarkata who kidnaps women seeking independence.',
    poster: 'https://image.tmdb.org/t/p/w500/nfnhwfUEFuSOxxf4jDdBlY6Lccw.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fVV0A67kDjTTQ4CvUn8LoletRmI.jpg',
    rating: 8.4,
    voteCount: 14000,
    likes: 14000,
    runtime: 147,
    releaseDate: '2024-08-15',
    language: 'Hindi',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 20,
    genres: ['Comedy', 'Horror'],
    formats: ['Dolby Atmos', '4DX'],
    cast: [
      { name: 'Amar Kaushik', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Shraddha Kapoor', role: 'As Unknown Girl', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rajkummar Rao', role: 'As Vicky', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/KVnheXwqF0g'
  },
  // 16. Anatomy of a Fall (French Masterpiece)
  {
    id: 401,
    tmdbId: 915935,
    title: 'Anatomy of a Fall',
    originalTitle: 'Anatomie d\'une chute',
    tagline: 'Did he fall or was he pushed?',
    overview: 'A woman is suspected of murder after her husband\'s death, and their blind son faces a moral dilemma as the sole witness in court.',
    poster: 'https://image.tmdb.org/t/p/w500/kQs6keheMwCxJxrzV83VUwFtHkB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/lDVl2jf6VB8ODl1olZ6FLvOV1gX.jpg',
    rating: 8.3,
    voteCount: 12500,
    likes: 12500,
    runtime: 151,
    releaseDate: '2023-08-23',
    language: 'French',
    status: 'Now Showing',
    category: 'now_showing',
    activeShows: 10,
    genres: ['Drama', 'Crime', 'Mystery'],
    formats: ['Dolby Cinema', 'VIP Lounge'],
    cast: [
      { name: 'Justine Triet', role: 'Director', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sandra Hüller', role: 'As Sandra Voyter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Swann Arlaud', role: 'As Maître Vincent Renzi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/fTrsp5BMloA'
  },
  // 17. Amélie (French Masterpiece)
  {
    id: 402,
    tmdbId: 194,
    title: 'Amélie',
    originalTitle: 'Le Fabuleux Destin d\'Amélie Poulain',
    tagline: 'She\'ll change your life.',
    overview: 'Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.',
    poster: 'https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/6n53UI4mX9QMfe2S0Pgt8mGebY1.jpg',
    rating: 8.3,
    voteCount: 12000,
    likes: 12000,
    runtime: 122,
    releaseDate: '2001-04-25',
    language: 'French',
    status: 'Published',
    category: 'published',
    activeShows: 8,
    genres: ['Comedy', 'Romance'],
    formats: ['Dolby Cinema', 'VIP Lounge'],
    cast: [
      { name: 'Jean-Pierre Jeunet', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Audrey Tautou', role: 'As Amélie Poulain', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Mathieu Kassovitz', role: 'As Nino Quincampoix', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    trailerUrl: 'https://www.youtube.com/embed/HUECWi5pX7o'
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
          
          const flagship = MOCK_MOVIES.filter(m => m.language.toLowerCase() === language.toLowerCase());
          const existingIds = new Set(list.map(m => m.tmdbId));
          const toAdd = flagship.filter(m => !existingIds.has(m.tmdbId));
          list = [...toAdd, ...list];
          return list;
        }
      } else {
        // Fetch top rated / most famous movies globally
        const endpoint = '/movie/top_rated';
        const response = await api.get(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        
        if (response.data && response.data.results && response.data.results.length > 0) {
          let list = response.data.results.map((m) => movieApi.formatTmdbMovie(m, category));
          
          // Prepend famous mock movies from all languages
          const existingIds = new Set(list.map(m => m.tmdbId));
          const toAdd = MOCK_MOVIES.filter(m => !existingIds.has(m.tmdbId));
          let combined = [...toAdd, ...list];
          // Sort combined so famous blockbuster movies across all languages come first!
          combined.sort((a, b) => (b.rating * (b.voteCount || 1000)) - (a.rating * (a.voteCount || 1000)));
          return combined;
        }
      }
    } catch (error) {
      console.warn('TMDB Network API fallback triggered:', error);
    }

    // Fallback Mock Filtering if offline (sorted by rating & fame descending)
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
    results.sort((a, b) => (b.rating * (b.voteCount || 1000)) - (a.rating * (a.voteCount || 1000)));
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

  // Get single Movie by ID with real TMDB videos, credits, & details
  getMovieById: async (id) => {
    try {
      const response = await api.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos,credits,reviews`);
      const m = response.data;
      if (m) {
        const trailerObj = m.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        const trailerLink = trailerObj ? `https://www.youtube.com/embed/${trailerObj.key}` : 'https://www.youtube.com/embed/Way9Dexny3w';

        const directorObj = m.credits?.crew?.find(c => c.job === 'Director');
        const directorName = directorObj ? directorObj.name : 'Renowned Director';

        const castList = m.credits?.cast?.slice(0, 6).map(c => ({
          name: c.name,
          role: `As ${c.character}`,
          avatar: c.profile_path ? `${TMDB_IMAGE_BASE}${c.profile_path}` : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
        })) || MOCK_MOVIES[0].cast;

        const prodCompanies = m.production_companies ? m.production_companies.slice(0, 3).map(p => p.name) : ['Universal Pictures', 'Marvel Studios'];
        
        const reviewHighlights = m.reviews?.results?.slice(0, 2).map(r => ({
          author: r.author,
          rating: r.author_details?.rating || 9,
          content: r.content?.slice(0, 220) + '...'
        })) || [
          { author: 'Cinema Critic', rating: 9, content: 'A thrilling cinematic experience with spectacular visuals, powerful performances, and unmatched sound design.' },
          { author: 'Audience Reviewer', rating: 9.5, content: 'Absolute masterpiece! Must watch in IMAX 3D for the best immersive sound and visual treat.' }
        ];

        return {
          id: m.id,
          tmdbId: m.id,
          title: m.title,
          originalTitle: m.original_title,
          tagline: m.tagline || 'Experience the cinematic spectacle in theaters.',
          overview: m.overview || 'An epic cinematic journey designed for grand theater screens.',
          poster: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : MOCK_MOVIES[0].poster,
          backdrop: m.backdrop_path ? `${TMDB_IMAGE_ORIGINAL}${m.backdrop_path}` : MOCK_MOVIES[0].backdrop,
          rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 8.5,
          voteCount: m.vote_count || 4000,
          runtime: m.runtime || 150,
          releaseDate: m.release_date || '2024-03-01',
          language: m.spoken_languages?.[0]?.english_name || 'English',
          status: 'Now Showing',
          category: 'now_showing',
          activeShows: 16,
          genres: m.genres ? m.genres.map(g => g.name) : ['Sci-Fi', 'Action'],
          formats: ['IMAX 3D', 'Dolby Atmos', '4DX', 'VIP Lounge'],
          director: directorName,
          cast: castList,
          productionCompanies: prodCompanies,
          reviews: reviewHighlights,
          budget: m.budget ? `$${(m.budget / 1000000).toFixed(0)}M` : '$150M',
          revenue: m.revenue ? `$${(m.revenue / 1000000).toFixed(0)}M` : '$450M',
          trailerUrl: trailerLink
        };
      }
    } catch (e) {
      console.warn('TMDB movie detail fetch failed, returning mock default');
    }

    const numericId = Number(id);
    const mock = MOCK_MOVIES.find((m) => m.id === numericId || m.tmdbId === numericId) || MOCK_MOVIES[0];
    return {
      ...mock,
      director: mock.cast?.[0]?.name || 'Renowned Director',
      productionCompanies: ['Warner Bros.', 'Legendary Pictures'],
      reviews: [
        { author: 'Cinema Critic', rating: 9, content: 'A thrilling cinematic experience with spectacular visuals, powerful performances, and unmatched sound design.' },
        { author: 'Audience Reviewer', rating: 9.5, content: 'Absolute masterpiece! Must watch in IMAX 3D for the best immersive sound and visual treat.' }
      ],
      budget: '$180M',
      revenue: '$650M'
    };
  }
};
