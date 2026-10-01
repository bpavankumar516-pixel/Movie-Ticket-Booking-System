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

// Standard Multi-Movie Showtimes Presets for BookMyShow realism
const STANDARD_THEATRE_SHOWS = (theatrePrefix, basePrice = 280) => [
  {
    id: `sh-${theatrePrefix}-1a`,
    movieId: 101,
    movieTitle: 'Dune: Part Two',
    time: '10:30 AM',
    screen: 'Audi 1 - IMAX 3D',
    format: 'IMAX 3D',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 40,
    totalSeats: 180,
    bookedCount: 32
  },
  {
    id: `sh-${theatrePrefix}-1b`,
    movieId: 101,
    movieTitle: 'Dune: Part Two',
    time: '02:15 PM',
    screen: 'Audi 1 - IMAX 3D',
    format: 'IMAX 3D',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 40,
    totalSeats: 180,
    bookedCount: 45
  },
  {
    id: `sh-${theatrePrefix}-1c`,
    movieId: 101,
    movieTitle: 'Dune: Part Two',
    time: '06:00 PM',
    screen: 'Audi 1 - IMAX 3D',
    format: 'IMAX 3D',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 50,
    totalSeats: 180,
    bookedCount: 55
  },
  {
    id: `sh-${theatrePrefix}-1d`,
    movieId: 101,
    movieTitle: 'Dune: Part Two',
    time: '09:45 PM',
    screen: 'Audi 1 - IMAX 3D',
    format: 'IMAX 3D',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 50,
    totalSeats: 180,
    bookedCount: 60
  },
  {
    id: `sh-${theatrePrefix}-2a`,
    movieId: 106,
    movieTitle: 'Interstellar',
    time: '11:15 AM',
    screen: 'Audi 2 - Laser 4K',
    format: 'Laser 4K',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 70,
    totalSeats: 160,
    bookedCount: 28
  },
  {
    id: `sh-${theatrePrefix}-2b`,
    movieId: 106,
    movieTitle: 'Interstellar',
    time: '03:30 PM',
    screen: 'Audi 2 - Laser 4K',
    format: 'Laser 4K',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 70,
    totalSeats: 160,
    bookedCount: 40
  },
  {
    id: `sh-${theatrePrefix}-2c`,
    movieId: 106,
    movieTitle: 'Interstellar',
    time: '07:15 PM',
    screen: 'Audi 2 - Laser 4K',
    format: 'Laser 4K',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 80,
    totalSeats: 160,
    bookedCount: 52
  },
  {
    id: `sh-${theatrePrefix}-3a`,
    movieId: 103,
    movieTitle: 'Kalki 2898 AD',
    time: '01:00 PM',
    screen: 'Audi 3 - 4DX 3D',
    format: '4DX 3D',
    poster: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 10,
    totalSeats: 150,
    bookedCount: 35
  },
  {
    id: `sh-${theatrePrefix}-3b`,
    movieId: 103,
    movieTitle: 'Kalki 2898 AD',
    time: '05:00 PM',
    screen: 'Audi 3 - 4DX 3D',
    format: '4DX 3D',
    poster: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 20,
    totalSeats: 150,
    bookedCount: 48
  },
  {
    id: `sh-${theatrePrefix}-3c`,
    movieId: 103,
    movieTitle: 'Kalki 2898 AD',
    time: '08:45 PM',
    screen: 'Audi 3 - 4DX 3D',
    format: '4DX 3D',
    poster: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 20,
    totalSeats: 150,
    bookedCount: 50
  },
  {
    id: `sh-${theatrePrefix}-4a`,
    movieId: 105,
    movieTitle: 'Avatar: The Way of Water',
    time: '09:45 AM',
    screen: 'Audi 4 - Dolby Atmos',
    format: 'Dolby Atmos',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 30,
    totalSeats: 190,
    bookedCount: 40
  },
  {
    id: `sh-${theatrePrefix}-4b`,
    movieId: 105,
    movieTitle: 'Avatar: The Way of Water',
    time: '05:15 PM',
    screen: 'Audi 4 - Dolby Atmos',
    format: 'Dolby Atmos',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    price: basePrice + 40,
    totalSeats: 190,
    bookedCount: 55
  }
];

export const INITIAL_THEATRES = [
  // BENGALURU THEATRES
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
    shows: STANDARD_THEATRE_SHOWS('109', 300)
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
    shows: STANDARD_THEATRE_SHOWS('115', 280)
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
    shows: STANDARD_THEATRE_SHOWS('116', 260)
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
    shows: STANDARD_THEATRE_SHOWS('117', 350)
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
    shows: STANDARD_THEATRE_SHOWS('118', 220)
  },
  {
    id: 'th-119',
    name: 'PVR Forum Mall Koramangala',
    city: 'Bengaluru',
    address: 'Hosur Rd, Koramangala, Bengaluru, Karnataka',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2900,
    screensCount: 4,
    totalSeats: 175,
    brandLogo: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=200&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=1000&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', 'VIP Recliners', 'Gourmet Food'],
    contact: { phone: '+91 80 4455 6677', email: 'koramangala@pvrcinemas.com' },
    screens: [
      { id: 'sc-119-1', name: 'Audi 1', type: 'IMAX 3D', totalSeats: 175 }
    ],
    shows: STANDARD_THEATRE_SHOWS('119', 300)
  },

  // HYDERABAD THEATRES
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
    shows: STANDARD_THEATRE_SHOWS('101', 290)
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
    shows: STANDARD_THEATRE_SHOWS('108', 320)
  },

  // REMAINING CITIES THEATRES
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
    shows: STANDARD_THEATRE_SHOWS('110', 400)
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
    shows: STANDARD_THEATRE_SHOWS('111', 250)
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
    shows: STANDARD_THEATRE_SHOWS('112', 450)
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
    shows: STANDARD_THEATRE_SHOWS('113', 200)
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
    shows: STANDARD_THEATRE_SHOWS('114', 190)
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
    shows: STANDARD_THEATRE_SHOWS('120', 310)
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
    shows: STANDARD_THEATRE_SHOWS('121', 340)
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
    shows: STANDARD_THEATRE_SHOWS('122', 270)
  }
];

export const theatreApi = {
  getTheatres: (cityFilter = 'All', search = '') => {
    const saved = localStorage.getItem('movtego_theatres_v9');
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
      shows: STANDARD_THEATRE_SHOWS(String(Date.now()).slice(-4), 280),
      ...newTheatre
    };
    const updatedList = [created, ...theatres];
    localStorage.setItem('movtego_theatres_v9', JSON.stringify(updatedList));
    return created;
  },

  updateTheatre: (id, updatedFields) => {
    const theatres = theatreApi.getTheatres();
    const index = theatres.findIndex(t => String(t.id) === String(id));
    if (index !== -1) {
      theatres[index] = { ...theatres[index], ...updatedFields };
      localStorage.setItem('movtego_theatres_v9', JSON.stringify(theatres));
      return theatres[index];
    }
    return null;
  },

  deleteTheatre: (id) => {
    const theatres = theatreApi.getTheatres();
    const filtered = theatres.filter(t => String(t.id) !== String(id));
    localStorage.setItem('movtego_theatres_v9', JSON.stringify(filtered));
    return true;
  },

  resetToDefaults: () => {
    localStorage.setItem('movtego_theatres_v9', JSON.stringify(INITIAL_THEATRES));
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
