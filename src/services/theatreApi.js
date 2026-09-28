// Theatre and Showtime Service Layer with Rich Mock Data for Module 4
export const CITIES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'London',
  'San Francisco',
  'Dallas',
  'Miami',
];

export const MOCK_THEATRES = [
  {
    id: 'th-101',
    name: 'MOVIEGO IMAX Grand Cinema',
    city: 'New York',
    address: 'Broadway & 45th St, Times Square, New York, NY 10036',
    rating: 4.9,
    reviewsCount: 1420,
    screensCount: 8,
    amenities: ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', '4K Laser', 'Gourmet Food'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    shows: [
      { id: 'sh-101', movieId: 101, movieTitle: 'Dune: Part Two', time: '10:30 AM', screen: 'Screen 1 - IMAX 3D', format: 'IMAX 3D', price: 22, totalSeats: 96, bookedCount: 38 },
      { id: 'sh-102', movieId: 101, movieTitle: 'Dune: Part Two', time: '01:45 PM', screen: 'Screen 1 - IMAX 3D', format: 'IMAX 3D', price: 22, totalSeats: 96, bookedCount: 64 },
      { id: 'sh-103', movieId: 101, movieTitle: 'Dune: Part Two', time: '05:30 PM', screen: 'Screen 2 - Dolby Atmos', format: 'Dolby Atmos', price: 18, totalSeats: 96, bookedCount: 88 },
      { id: 'sh-104', movieId: 101, movieTitle: 'Dune: Part Two', time: '09:15 PM', screen: 'VIP Lounge 1', format: 'VIP Recliner', price: 28, totalSeats: 48, bookedCount: 40 },
      { id: 'sh-105', movieId: 102, movieTitle: 'Doctor Strange in the Multiverse of Madness', time: '11:15 AM', screen: 'Screen 3 - 4DX', format: '4DX 3D', price: 20, totalSeats: 96, bookedCount: 45 },
      { id: 'sh-106', movieId: 102, movieTitle: 'Doctor Strange in the Multiverse of Madness', time: '04:00 PM', screen: 'Screen 3 - 4DX', format: '4DX 3D', price: 20, totalSeats: 96, bookedCount: 70 },
      { id: 'sh-107', movieId: 103, movieTitle: 'Oppenheimer', time: '02:00 PM', screen: 'Screen 4 - 70MM IMAX', format: '70MM IMAX', price: 24, totalSeats: 96, bookedCount: 90 },
      { id: 'sh-108', movieId: 103, movieTitle: 'Oppenheimer', time: '07:00 PM', screen: 'Screen 4 - 70MM IMAX', format: '70MM IMAX', price: 24, totalSeats: 96, bookedCount: 96 },
    ]
  },
  {
    id: 'th-102',
    name: 'Cineplex Paragon Lounge',
    city: 'New York',
    address: '234 W 42nd St, Midtown, New York, NY 10036',
    rating: 4.8,
    reviewsCount: 980,
    screensCount: 6,
    amenities: ['Dolby Atmos', '4DX 3D', 'Recliners', 'Bar & Cafe'],
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    shows: [
      { id: 'sh-201', movieId: 101, movieTitle: 'Dune: Part Two', time: '11:00 AM', screen: 'Screen A - Dolby', format: 'Dolby Atmos', price: 18, totalSeats: 96, bookedCount: 22 },
      { id: 'sh-202', movieId: 101, movieTitle: 'Dune: Part Two', time: '03:15 PM', screen: 'Screen A - Dolby', format: 'Dolby Atmos', price: 18, totalSeats: 96, bookedCount: 50 },
      { id: 'sh-203', movieId: 101, movieTitle: 'Dune: Part Two', time: '07:45 PM', screen: 'Screen B - VIP', format: 'VIP Recliner', price: 26, totalSeats: 48, bookedCount: 30 },
      { id: 'sh-204', movieId: 104, movieTitle: 'Avengers: Endgame', time: '06:00 PM', screen: 'Screen C - 4DX', format: '4DX 3D', price: 20, totalSeats: 96, bookedCount: 82 },
      { id: 'sh-205', movieId: 105, movieTitle: 'Avatar: The Way of Water', time: '08:30 PM', screen: 'Screen D - IMAX 3D', format: 'IMAX 3D', price: 22, totalSeats: 96, bookedCount: 60 }
    ]
  },
  {
    id: 'th-103',
    name: 'StarLight Multiplex Centre',
    city: 'Los Angeles',
    address: '6801 Hollywood Blvd, Hollywood, Los Angeles, CA 90028',
    rating: 4.7,
    reviewsCount: 1150,
    screensCount: 10,
    amenities: ['IMAX 3D', 'Dolby Atmos', 'Laser 4K', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    shows: [
      { id: 'sh-301', movieId: 101, movieTitle: 'Dune: Part Two', time: '12:00 PM', screen: 'Screen 1 - IMAX', format: 'IMAX 3D', price: 20, totalSeats: 96, bookedCount: 40 },
      { id: 'sh-302', movieId: 101, movieTitle: 'Dune: Part Two', time: '04:30 PM', screen: 'Screen 1 - IMAX', format: 'IMAX 3D', price: 20, totalSeats: 96, bookedCount: 75 },
      { id: 'sh-303', movieId: 106, movieTitle: 'Interstellar', time: '08:00 PM', screen: 'Screen 2 - Dolby', format: 'Dolby Atmos', price: 16, totalSeats: 96, bookedCount: 85 }
    ]
  },
  {
    id: 'th-104',
    name: 'Apex Horizon Cinema',
    city: 'Chicago',
    address: '600 E Grand Ave, Navy Pier, Chicago, IL 60611',
    rating: 4.9,
    reviewsCount: 840,
    screensCount: 5,
    amenities: ['IMAX 70mm', 'VIP Suites', 'Dolby Atmos', 'Recliners'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    shows: [
      { id: 'sh-401', movieId: 101, movieTitle: 'Dune: Part Two', time: '01:00 PM', screen: 'Screen 1 - IMAX 70mm', format: 'IMAX 70mm', price: 24, totalSeats: 96, bookedCount: 30 },
      { id: 'sh-402', movieId: 103, movieTitle: 'Oppenheimer', time: '06:30 PM', screen: 'Screen 1 - IMAX 70mm', format: 'IMAX 70mm', price: 24, totalSeats: 96, bookedCount: 92 }
    ]
  },
  {
    id: 'th-105',
    name: 'Odeon Royal Cinema',
    city: 'London',
    address: 'Leicester Square, West End, London WC2H 7NA',
    rating: 4.8,
    reviewsCount: 1600,
    screensCount: 7,
    amenities: ['Royal Recliners', 'Dolby Cinema', 'IMAX 3D', 'Champagne Bar'],
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=80',
    shows: [
      { id: 'sh-501', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:30 PM', screen: 'Royal Screen 1', format: 'Dolby Cinema', price: 22, totalSeats: 96, bookedCount: 55 },
      { id: 'sh-502', movieId: 101, movieTitle: 'Dune: Part Two', time: '07:15 PM', screen: 'Royal Screen 1', format: 'Dolby Cinema', price: 22, totalSeats: 96, bookedCount: 94 }
    ]
  }
];

export const theatreApi = {
  getCities: () => CITIES,

  getTheatres: (city = 'New York', search = '') => {
    let result = MOCK_THEATRES;
    if (city && city !== 'All') {
      result = result.filter(t => t.city.toLowerCase() === city.toLowerCase());
    }
    if (search) {
      result = result.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) || 
        t.address.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  },

  getTheatreById: (id) => {
    return MOCK_THEATRES.find(t => t.id === id) || MOCK_THEATRES[0];
  },

  getShowById: (showId) => {
    for (const theatre of MOCK_THEATRES) {
      const foundShow = theatre.shows.find(s => s.id === showId);
      if (foundShow) {
        return { ...foundShow, theatre };
      }
    }
    return {
      ...MOCK_THEATRES[0].shows[0],
      theatre: MOCK_THEATRES[0]
    };
  }
};
