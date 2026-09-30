// Theatre and Showtime Service Layer with authentic data matching UI specs

export const CITIES = [
  'All',
  'Hyderabad',
  'Bengaluru',
  'Mumbai',
  'Chennai',
  'Delhi',
  'Vijayawada',
  'Visakhapatnam',
  'Pune',
  'Kolkata',
  'Kochi'
];

export const AMENITIES_LIST = [
  'IMAX 3D',
  'Dolby Atmos',
  '4DX 3D',
  'VIP Recliners',
  'Laser 4K',
  'Gourmet Food',
  'Valet Parking'
];

export const INITIAL_THEATRES = [
  // BENGALURU THEATRES (6 Total - Majority)
  {
    id: 'th-109',
    name: 'PVR Orion Mall IMAX',
    city: 'Bengaluru',
    address: 'Dr Rajkumar Rd, Malleshwaram, Bengaluru, Karnataka',
    status: 'Active',
    type: 'IMAX',
    rating: 4.9,
    reviewsCount: 3100,
    screensCount: 4,
    totalSeats: 180,
    brandLogo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1000&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', '4DX 3D', 'VIP Recliners', 'Valet Parking'],
    contact: { phone: '+91 80 4123 4567', email: 'orion@pvrcinemas.com' },
    screens: [
      { id: 'sc-901', name: 'Audi 1 - IMAX 3D', type: 'IMAX 3D', totalSeats: 180 },
      { id: 'sc-902', name: 'Audi 2 - 4DX 3D', type: '4DX 3D', totalSeats: 150 }
    ],
    shows: [
      { id: 'sh-901', movieId: 101, movieTitle: 'Dune: Part Two', time: '11:00 AM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 350, totalSeats: 180, bookedCount: 32 },
      { id: 'sh-902', movieId: 106, movieTitle: 'Interstellar', time: '03:15 PM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 380, totalSeats: 180, bookedCount: 45 }
    ]
  },
  {
    id: 'th-115',
    name: 'INOX Mantri Square',
    city: 'Bengaluru',
    address: 'Sampige Rd, Malleshwaram, Bengaluru, Karnataka',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2680,
    screensCount: 3,
    totalSeats: 160,
    brandLogo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1000&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'VIP Recliners', 'Gourmet Food'],
    contact: { phone: '+91 80 2345 6789', email: 'mantri.inox@inoxmovies.com' },
    screens: [
      { id: 'sc-115-1', name: 'Screen 1 - Insignia', type: 'VIP Recliner', totalSeats: 160 }
    ],
    shows: [
      { id: 'sh-115-1', movieId: 101, movieTitle: 'Dune: Part Two', time: '01:30 PM', screen: 'Screen 1 - Insignia', format: 'Laser 4K', price: 320, totalSeats: 160, bookedCount: 28 }
    ]
  },
  {
    id: 'th-116',
    name: 'Cinepolis Forum Shantiniketan',
    city: 'Bengaluru',
    address: 'ITPL Main Rd, Whitefield, Bengaluru, Karnataka',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.7,
    reviewsCount: 2150,
    screensCount: 3,
    totalSeats: 150,
    brandLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'MacroXE', 'VIP Recliners'],
    contact: { phone: '+91 80 6789 0123', email: 'whitefield@cinepolis.com' },
    screens: [
      { id: 'sc-116-1', name: 'Screen 1 - MacroXE', type: 'Dolby Atmos', totalSeats: 150 }
    ],
    shows: [
      { id: 'sh-116-1', movieId: 105, movieTitle: 'Avatar: The Way of Water', time: '04:00 PM', screen: 'Screen 1 - MacroXE', format: 'Dolby Atmos', price: 290, totalSeats: 150, bookedCount: 36 }
    ]
  },
  {
    id: 'th-117',
    name: 'PVR Vega City Gold Class',
    city: 'Bengaluru',
    address: 'Bannerghatta Main Rd, BTM Layout, Bengaluru, Karnataka',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 3400,
    screensCount: 4,
    totalSeats: 180,
    brandLogo: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=1000&auto=format&fit=crop&q=80',
    amenities: ['VIP Recliners', 'Gourmet Food', 'Laser 4K', 'Valet Parking'],
    contact: { phone: '+91 80 9876 5432', email: 'vegacity@pvrcinemas.com' },
    screens: [
      { id: 'sc-117-1', name: 'Gold Class Audi 1', type: 'VIP Recliner', totalSeats: 180 }
    ],
    shows: [
      { id: 'sh-117-1', movieId: 106, movieTitle: 'Interstellar', time: '07:30 PM', screen: 'Gold Class Audi 1', format: 'Laser 4K', price: 450, totalSeats: 180, bookedCount: 40 }
    ]
  },
  {
    id: 'th-118',
    name: 'Urvashi Theatre 4K Dolby Atmos',
    city: 'Bengaluru',
    address: 'Lalbagh Main Rd, Sudhama Nagar, Bengaluru, Karnataka',
    status: 'Active',
    type: 'Single Screen',
    rating: 4.8,
    reviewsCount: 4100,
    screensCount: 1,
    totalSeats: 195,
    brandLogo: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1000&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'Laser 4K', '4K 3D'],
    contact: { phone: '+91 80 2222 3333', email: 'contact@urvashitheatre.in' },
    screens: [
      { id: 'sc-118-1', name: 'Main Screen 4K', type: 'Laser 4K', totalSeats: 195 }
    ],
    shows: [
      { id: 'sh-118-1', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:00 PM', screen: 'Main Screen 4K', format: 'Laser 4K', price: 220, totalSeats: 195, bookedCount: 42 }
    ]
  },
  {
    id: 'th-119',
    name: 'PVR Forum Mall Koramangala',
    city: 'Bengaluru',
    address: 'Hosur Rd, Koramangala, Bengaluru, Karnataka',
    status: 'Upcoming',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2900,
    screensCount: 4,
    totalSeats: 175,
    brandLogo: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=1000&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', 'VIP Recliners', 'Gourmet Food'],
    contact: { phone: '+91 80 4455 6677', email: 'koramangala@pvrcinemas.com' },
    screens: [],
    shows: []
  },

  // HYDERABAD THEATRES (2 Total - Exactly as requested)
  {
    id: 'th-101',
    name: 'PVR Cinemas - Nexus Mall',
    city: 'Hyderabad',
    address: 'Kukatpally, Hyderabad, Telangana',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2890,
    screensCount: 4,
    totalSeats: 180,
    brandLogo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', 'Gourmet Food'],
    contact: {
      phone: '+91 40 4567 8901',
      email: 'nexus.pvr@pvrcinemas.com',
      website: 'https://pvrcinemas.com',
      mapUrl: 'https://maps.google.com/?q=PVR+Nexus+Mall+Hyderabad'
    },
    screens: [
      { id: 'sc-101', name: 'Audi 1 - IMAX 3D', type: 'IMAX 3D', totalSeats: 180 },
      { id: 'sc-102', name: 'Audi 2 - Dolby Atmos VIP', type: 'VIP Recliner', totalSeats: 160 }
    ],
    shows: [
      { id: 'sh-101', movieId: 101, movieTitle: 'Dune: Part Two', time: '10:30 AM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 290, totalSeats: 180, bookedCount: 32 },
      { id: 'sh-103', movieId: 106, movieTitle: 'Interstellar', time: '06:00 PM', screen: 'Audi 2 - Dolby Atmos VIP', format: 'Dolby Atmos', price: 350, totalSeats: 160, bookedCount: 25 }
    ]
  },
  {
    id: 'th-108',
    name: 'AMB Cinemas - Gachibowli',
    city: 'Hyderabad',
    address: 'Gachibowli, Hyderabad, Telangana',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 3900,
    screensCount: 4,
    totalSeats: 190,
    brandLogo: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1000&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', 'Gourmet Food'],
    contact: {
      phone: '+91 40 2345 6789',
      email: 'support@ambcinemas.com',
      website: 'https://ambcinemas.com',
      mapUrl: 'https://maps.google.com/?q=AMB+Cinemas+Gachibowli'
    },
    screens: [
      { id: 'sc-801', name: 'Audi 1 - Superplex', type: 'IMAX 3D', totalSeats: 190 }
    ],
    shows: [
      { id: 'sh-801', movieId: 101, movieTitle: 'Dune: Part Two', time: '03:00 PM', screen: 'Audi 1 - Superplex', format: 'IMAX 3D', price: 320, totalSeats: 190, bookedCount: 38 }
    ]
  },

  // REMAINING CITIES (1 Theatre Each - Exactly as requested)
  {
    id: 'th-110',
    name: 'PVR Maison JWO BKC',
    city: 'Mumbai',
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 2950,
    screensCount: 3,
    totalSeats: 160,
    brandLogo: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1000&auto=format&fit=crop&q=80',
    amenities: ['VIP Recliners', 'Laser 4K', 'Gourmet Food'],
    contact: { phone: '+91 22 6789 0123', email: 'bkc@pvrcinemas.com' },
    shows: [
      { id: 'sh-1001', movieId: 106, movieTitle: 'Interstellar', time: '02:00 PM', screen: 'Luxe Screen 1', format: 'Laser 4K', price: 420, totalSeats: 160, bookedCount: 30 }
    ]
  },
  {
    id: 'th-111',
    name: 'SPI Sathyam Cinemas',
    city: 'Chennai',
    address: 'Royapettah, Chennai, Tamil Nadu',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 4200,
    screensCount: 4,
    totalSeats: 185,
    brandLogo: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1000&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'Laser 4K', 'Gourmet Food'],
    contact: { phone: '+91 44 2811 1111', email: 'support@spicinemas.in' },
    shows: [
      { id: 'sh-1101', movieId: 101, movieTitle: 'Dune: Part Two', time: '06:30 PM', screen: 'Sathyam Main Audi', format: 'Dolby Atmos', price: 250, totalSeats: 185, bookedCount: 35 }
    ]
  },
  {
    id: 'th-112',
    name: 'PVR Director\'s Cut Vasant Kunj',
    city: 'Delhi',
    address: 'Vasant Kunj, New Delhi, Delhi',
    status: 'Active',
    type: 'IMAX',
    rating: 4.9,
    reviewsCount: 3500,
    screensCount: 2,
    totalSeats: 140,
    brandLogo: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=1000&auto=format&fit=crop&q=80',
    amenities: ['VIP Recliners', 'Gourmet Food', 'Valet Parking'],
    contact: { phone: '+91 11 4567 8900', email: 'directorscut@pvrcinemas.com' },
    shows: [
      { id: 'sh-1201', movieId: 106, movieTitle: 'Interstellar', time: '08:00 PM', screen: 'Director Audi 1', format: 'Laser 4K', price: 500, totalSeats: 140, bookedCount: 22 }
    ]
  },
  {
    id: 'th-113',
    name: 'Inox Leawood Trendset Mall',
    city: 'Vijayawada',
    address: 'MG Road, Vijayawada, Andhra Pradesh',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.7,
    reviewsCount: 1890,
    screensCount: 3,
    totalSeats: 150,
    brandLogo: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1000&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'VIP Recliners'],
    contact: { phone: '+91 866 2434 567', email: 'vijayawada@inoxmovies.com' },
    shows: [
      { id: 'sh-1301', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:30 PM', screen: 'Audi 1', format: 'Dolby Atmos', price: 190, totalSeats: 150, bookedCount: 28 }
    ]
  },
  {
    id: 'th-114',
    name: 'CMR Inox Maddilapalem',
    city: 'Visakhapatnam',
    address: 'Maddilapalem, Visakhapatnam, Andhra Pradesh',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2200,
    screensCount: 4,
    totalSeats: 165,
    brandLogo: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'Gourmet Food'],
    contact: { phone: '+91 891 2545 678', email: 'vizag@inoxmovies.com' },
    shows: [
      { id: 'sh-1401', movieId: 101, movieTitle: 'Dune: Part Two', time: '06:15 PM', screen: 'Audi 2', format: 'Dolby Atmos', price: 180, totalSeats: 165, bookedCount: 30 }
    ]
  },
  {
    id: 'th-120',
    name: 'PVR Phoenix Marketcity',
    city: 'Pune',
    address: 'Viman Nagar, Pune, Maharashtra',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2750,
    screensCount: 4,
    totalSeats: 180,
    brandLogo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1000&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', '4DX 3D', 'VIP Recliners'],
    contact: { phone: '+91 20 6677 8899', email: 'pune@pvrcinemas.com' },
    shows: [
      { id: 'sh-120-1', movieId: 101, movieTitle: 'Dune: Part Two', time: '05:00 PM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 340, totalSeats: 180, bookedCount: 35 }
    ]
  },
  {
    id: 'th-121',
    name: 'INOX Quest Mall',
    city: 'Kolkata',
    address: 'Park Circus, Kolkata, West Bengal',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 3100,
    screensCount: 3,
    totalSeats: 155,
    brandLogo: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1000&auto=format&fit=crop&q=80',
    amenities: ['Insignia VIP', 'Laser 4K', 'Dolby Atmos'],
    contact: { phone: '+91 33 2288 9900', email: 'quest.inox@inoxmovies.com' },
    shows: [
      { id: 'sh-121-1', movieId: 106, movieTitle: 'Interstellar', time: '03:45 PM', screen: 'Insignia Audi 1', format: 'Laser 4K', price: 390, totalSeats: 155, bookedCount: 26 }
    ]
  },
  {
    id: 'th-122',
    name: 'Cinepolis Centre Square Mall',
    city: 'Kochi',
    address: 'MG Road, Kochi, Kerala',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2900,
    screensCount: 4,
    totalSeats: 190,
    brandLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80',
    amenities: ['VIP Recliners', 'MacroXE', 'Dolby Atmos'],
    contact: { phone: '+91 484 4567 890', email: 'kochi@cinepolis.com' },
    shows: [
      { id: 'sh-122-1', movieId: 101, movieTitle: 'Dune: Part Two', time: '06:00 PM', screen: 'Screen 1 - VIP', format: 'Dolby Atmos', price: 280, totalSeats: 190, bookedCount: 34 }
    ]
  }
];

export const theatreApi = {
  getTheatres: (cityFilter = 'All', search = '') => {
    const saved = localStorage.getItem('movtego_theatres_v7');
    let list = INITIAL_THEATRES;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      } catch (e) {
        console.warn('Failed to load theatres from localStorage', e);
      }
    }

    if (cityFilter && cityFilter !== 'All') {
      list = list.filter(t => t.city.toLowerCase() === cityFilter.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q)
      );
    }

    return list;
  },

  getTheatreById: (id) => {
    const theatres = theatreApi.getTheatres();
    return theatres.find(t => String(t.id) === String(id)) || null;
  },

  addTheatre: (newTheatre) => {
    const theatres = theatreApi.getTheatres();
    const id = `th-${Date.now()}`;
    const created = {
      id,
      rating: 4.8,
      reviewsCount: 100,
      status: 'Active',
      type: 'Multiplex',
      amenities: ['Dolby Atmos', 'VIP Recliners'],
      screens: [
        { id: `sc-${Date.now()}-1`, name: 'Audi 1', type: 'Dolby Atmos', totalSeats: 180 }
      ],
      shows: [],
      ...newTheatre
    };
    const updatedList = [created, ...theatres];
    localStorage.setItem('movtego_theatres_v7', JSON.stringify(updatedList));
    return created;
  },

  updateTheatre: (id, updatedFields) => {
    const theatres = theatreApi.getTheatres();
    const index = theatres.findIndex(t => String(t.id) === String(id));
    if (index !== -1) {
      theatres[index] = { ...theatres[index], ...updatedFields };
      localStorage.setItem('movtego_theatres_v7', JSON.stringify(theatres));
      return theatres[index];
    }
    return null;
  },

  deleteTheatre: (id) => {
    const theatres = theatreApi.getTheatres();
    const filtered = theatres.filter(t => String(t.id) !== String(id));
    localStorage.setItem('movtego_theatres_v7', JSON.stringify(filtered));
    return true;
  },

  resetToDefaults: () => {
    localStorage.setItem('movtego_theatres_v7', JSON.stringify(INITIAL_THEATRES));
    return INITIAL_THEATRES;
  },

  getShowById: (showId) => {
    const theatres = theatreApi.getTheatres();
    for (const t of theatres) {
      if (t.shows) {
        const found = t.shows.find(s => String(s.id) === String(showId));
        if (found) return { ...found, theatreName: t.name, theatreAddress: t.address };
      }
    }
    return null;
  }
};
