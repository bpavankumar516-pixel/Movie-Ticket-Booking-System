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
  {
    id: 'th-101',
    name: 'PVR Cinemas - Nexus Mall',
    city: 'Hyderabad',
    address: 'Kukatpally, Hyderabad, Telangana',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.8,
    reviewsCount: 2890,
    screensCount: 6,
    totalSeats: 1856,
    brandLogo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', 'Gourmet Food'],
    contact: {
      phone: '+91 40 4567 8901',
      email: 'nexus.pvr@pvrcinemas.com',
      website: 'https://pvrcinemas.com',
      mapUrl: 'https://maps.google.com/?q=PVR+Nexus+Mall+Hyderabad'
    },
    screens: [
      { id: 'sc-101', name: 'Audi 1 - IMAX 3D', type: 'IMAX 3D', totalSeats: 350 },
      { id: 'sc-102', name: 'Audi 2 - Dolby Atmos VIP', type: 'VIP Recliner', totalSeats: 220 },
      { id: 'sc-103', name: 'Audi 3 - Premium Screen', type: 'Dolby Atmos', totalSeats: 280 }
    ],
    shows: [
      { id: 'sh-101', movieId: 101, movieTitle: 'Dune: Part Two', time: '10:30 AM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 290, totalSeats: 120, bookedCount: 45 },
      { id: 'sh-102', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:15 PM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 290, totalSeats: 120, bookedCount: 98 },
      { id: 'sh-103', movieId: 106, movieTitle: 'Interstellar', time: '06:00 PM', screen: 'Audi 2 - Dolby Atmos VIP', format: 'Dolby Atmos', price: 350, totalSeats: 60, bookedCount: 58 }
    ]
  },
  {
    id: 'th-102',
    name: 'Cinepolis - Manjeera Mall',
    city: 'Hyderabad',
    address: 'Kukatpally, Hyderabad, Telangana',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.7,
    reviewsCount: 2410,
    screensCount: 5,
    totalSeats: 1240,
    brandLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'VIP Recliners', 'Gourmet Food'],
    contact: {
      phone: '+91 40 2345 6789',
      email: 'manjeera@cinepolis.com',
      website: 'https://cinepolisindia.com',
      mapUrl: 'https://maps.google.com/?q=Cinepolis+Manjeera+Mall+Hyderabad'
    },
    screens: [
      { id: 'sc-201', name: 'Screen 1 - MacroXE', type: 'Dolby Atmos', totalSeats: 300 },
      { id: 'sc-202', name: 'Screen 2 - VIP Lounge', type: 'VIP Recliner', totalSeats: 120 }
    ],
    shows: [
      { id: 'sh-201', movieId: 101, movieTitle: 'Dune: Part Two', time: '11:00 AM', screen: 'Screen 1 - MacroXE', format: 'Dolby Atmos', price: 260, totalSeats: 100, bookedCount: 42 },
      { id: 'sh-202', movieId: 105, movieTitle: 'Avatar: The Way of Water', time: '03:15 PM', screen: 'Screen 1 - MacroXE', format: 'Dolby Atmos', price: 260, totalSeats: 100, bookedCount: 78 }
    ]
  },
  {
    id: 'th-103',
    name: 'INOX - GVK One',
    city: 'Hyderabad',
    address: 'Banjara Hills, Hyderabad, Telangana',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 3820,
    screensCount: 8,
    totalSeats: 2368,
    brandLogo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', '4DX 3D', 'VIP Recliners', 'Valet Parking'],
    contact: {
      phone: '+91 40 3987 6543',
      email: 'gvk.inox@inoxmovies.com',
      website: 'https://inoxmovies.com',
      mapUrl: 'https://maps.google.com/?q=INOX+GVK+One+Hyderabad'
    },
    screens: [
      { id: 'sc-301', name: 'Screen 1 - Insignia', type: 'VIP Recliner', totalSeats: 80 },
      { id: 'sc-302', name: 'Screen 2 - MX4D', type: '4DX 3D', totalSeats: 140 }
    ],
    shows: [
      { id: 'sh-301', movieId: 106, movieTitle: 'Interstellar', time: '11:30 AM', screen: 'Screen 1 - Insignia', format: 'Laser 4K', price: 380, totalSeats: 80, bookedCount: 76 }
    ]
  },
  {
    id: 'th-104',
    name: 'Asian Cinemas - Ameerpet',
    city: 'Hyderabad',
    address: 'Ameerpet, Hyderabad, Telangana',
    status: 'Inactive',
    type: 'Single Screen',
    rating: 4.2,
    reviewsCount: 1120,
    screensCount: 4,
    totalSeats: 892,
    brandLogo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'Gourmet Food'],
    contact: {
      phone: '+91 40 2233 4455',
      email: 'contact@asiancinemas.in',
      website: 'https://asiancinemas.in',
      mapUrl: 'https://maps.google.com/?q=Asian+Cinemas+Ameerpet+Hyderabad'
    },
    screens: [
      { id: 'sc-401', name: 'Screen 1', type: 'Dolby 7.1', totalSeats: 400 }
    ],
    shows: []
  },
  {
    id: 'th-105',
    name: 'SSS Cinemas - Kukatpally',
    city: 'Hyderabad',
    address: 'Kukatpally, Hyderabad, Telangana',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.6,
    reviewsCount: 1650,
    screensCount: 5,
    totalSeats: 1050,
    brandLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'Laser 4K'],
    contact: {
      phone: '+91 40 6677 8899',
      email: 'info@ssscinemas.com',
      website: 'https://ssscinemas.com',
      mapUrl: 'https://maps.google.com/?q=SSS+Cinemas+Kukatpally+Hyderabad'
    },
    screens: [
      { id: 'sc-501', name: 'Audi 1', type: 'Dolby Atmos', totalSeats: 250 }
    ],
    shows: [
      { id: 'sh-501', movieId: 101, movieTitle: 'Dune: Part Two', time: '01:00 PM', screen: 'Audi 1', format: 'Dolby Atmos', price: 200, totalSeats: 100, bookedCount: 55 }
    ]
  },
  {
    id: 'th-106',
    name: 'Sudarshan 35mm',
    city: 'Hyderabad',
    address: 'RTC Cross Roads, Hyderabad, Telangana',
    status: 'Active',
    type: 'Single Screen',
    rating: 4.7,
    reviewsCount: 2900,
    screensCount: 3,
    totalSeats: 620,
    brandLogo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    amenities: ['Laser 4K', 'Dolby 7.1'],
    contact: {
      phone: '+91 40 2765 4321',
      email: 'sudarshan35mm@gmail.com',
      website: 'https://sudarshancinemas.com',
      mapUrl: 'https://maps.google.com/?q=Sudarshan+35mm+RTC+Cross+Roads'
    },
    screens: [
      { id: 'sc-601', name: 'Main Screen 35mm', type: 'Laser 4K', totalSeats: 620 }
    ],
    shows: [
      { id: 'sh-601', movieId: 101, movieTitle: 'Dune: Part Two', time: '11:15 AM', screen: 'Main Screen 35mm', format: 'Laser 4K', price: 180, totalSeats: 200, bookedCount: 180 }
    ]
  },
  {
    id: 'th-107',
    name: 'Prasads IMAX',
    city: 'Hyderabad',
    address: 'NRT, Hyderabad, Telangana',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 4500,
    screensCount: 7,
    totalSeats: 1892,
    brandLogo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', 'Laser 4K', 'Dolby Atmos', 'Valet Parking'],
    contact: {
      phone: '+91 40 2322 1122',
      email: 'contact@prasads.net',
      website: 'https://prasads.net',
      mapUrl: 'https://maps.google.com/?q=Prasads+IMAX+Hyderabad'
    },
    screens: [
      { id: 'sc-701', name: 'IMAX Large Screen 70mm', type: 'Laser 4K 70MM', totalSeats: 500 }
    ],
    shows: [
      { id: 'sh-701', movieId: 106, movieTitle: 'Interstellar', time: '02:30 PM', screen: 'IMAX Large Screen 70mm', format: 'Laser 4K', price: 300, totalSeats: 200, bookedCount: 195 }
    ]
  },
  {
    id: 'th-108',
    name: 'AMB Cinemas - Gachibowli',
    city: 'Hyderabad',
    address: 'Gachibowli, Hyderabad, Telangana',
    status: 'Upcoming',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 3900,
    screensCount: 6,
    totalSeats: 1450,
    brandLogo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', 'Gourmet Food'],
    contact: {
      phone: '+91 40 2345 6789',
      email: 'support@ambcinemas.com',
      website: 'https://ambcinemas.com',
      mapUrl: 'https://maps.google.com/?q=AMB+Cinemas+Gachibowli'
    },
    screens: [
      { id: 'sc-801', name: 'Audi 1 - Superplex', type: 'IMAX 3D', totalSeats: 350 }
    ],
    shows: []
  },
  {
    id: 'th-109',
    name: 'PVR Orion Mall IMAX',
    city: 'Bengaluru',
    address: 'Dr Rajkumar Rd, Malleshwaram, Bengaluru, Karnataka',
    status: 'Active',
    type: 'IMAX',
    rating: 4.9,
    reviewsCount: 3100,
    screensCount: 11,
    totalSeats: 2450,
    brandLogo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    amenities: ['IMAX 3D', '4DX 3D', 'VIP Recliners', 'Valet Parking'],
    contact: { phone: '+91 80 4123 4567', email: 'orion@pvrcinemas.com' },
    shows: [
      { id: 'sh-901', movieId: 101, movieTitle: 'Dune: Part Two', time: '11:00 AM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 350, totalSeats: 150, bookedCount: 90 }
    ]
  },
  {
    id: 'th-110',
    name: 'PVR Maison JWO BKC',
    city: 'Mumbai',
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.9,
    reviewsCount: 2950,
    screensCount: 6,
    totalSeats: 1600,
    brandLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    amenities: ['VIP Recliners', 'Laser 4K', 'Gourmet Food'],
    contact: { phone: '+91 22 6789 0123', email: 'bkc@pvrcinemas.com' },
    shows: [
      { id: 'sh-1001', movieId: 106, movieTitle: 'Interstellar', time: '02:00 PM', screen: 'Luxe Screen 1', format: 'Laser 4K', price: 420, totalSeats: 100, bookedCount: 80 }
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
    screensCount: 6,
    totalSeats: 1950,
    brandLogo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'Laser 4K', 'Gourmet Food'],
    contact: { phone: '+91 44 2811 1111', email: 'support@spicinemas.in' },
    shows: [
      { id: 'sh-1101', movieId: 101, movieTitle: 'Dune: Part Two', time: '06:30 PM', screen: 'Sathyam Main Audi', format: 'Dolby Atmos', price: 250, totalSeats: 250, bookedCount: 220 }
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
    screensCount: 4,
    totalSeats: 650,
    brandLogo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    amenities: ['VIP Recliners', 'Gourmet Food', 'Valet Parking'],
    contact: { phone: '+91 11 4567 8900', email: 'directorscut@pvrcinemas.com' },
    shows: [
      { id: 'sh-1201', movieId: 106, movieTitle: 'Interstellar', time: '08:00 PM', screen: 'Director Audi 1', format: 'Laser 4K', price: 500, totalSeats: 80, bookedCount: 78 }
    ]
  },
  {
    id: 'th-113',
    name: 'Inox Leawood Vijayawada',
    city: 'Vijayawada',
    address: 'MG Road, Vijayawada, Andhra Pradesh',
    status: 'Active',
    type: 'Multiplex',
    rating: 4.7,
    reviewsCount: 1890,
    screensCount: 5,
    totalSeats: 1200,
    brandLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'VIP Recliners'],
    contact: { phone: '+91 866 2434 567', email: 'vijayawada@inoxmovies.com' },
    shows: [
      { id: 'sh-1301', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:30 PM', screen: 'Audi 1', format: 'Dolby Atmos', price: 190, totalSeats: 150, bookedCount: 95 }
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
    screensCount: 6,
    totalSeats: 1400,
    brandLogo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    amenities: ['Dolby Atmos', 'Gourmet Food'],
    contact: { phone: '+91 891 2545 678', email: 'vizag@inoxmovies.com' },
    shows: [
      { id: 'sh-1401', movieId: 101, movieTitle: 'Dune: Part Two', time: '06:15 PM', screen: 'Audi 2', format: 'Dolby Atmos', price: 180, totalSeats: 160, bookedCount: 120 }
    ]
  }
];

export const theatreApi = {
  getTheatres: (cityFilter = 'All', search = '') => {
    const saved = localStorage.getItem('movtego_theatres');
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
        { id: `sc-${Date.now()}-1`, name: 'Audi 1', type: 'Dolby Atmos', totalSeats: 200 }
      ],
      shows: [],
      ...newTheatre
    };
    const updatedList = [created, ...theatres];
    localStorage.setItem('movtego_theatres', JSON.stringify(updatedList));
    return created;
  },

  updateTheatre: (id, updatedFields) => {
    const theatres = theatreApi.getTheatres();
    const index = theatres.findIndex(t => String(t.id) === String(id));
    if (index !== -1) {
      theatres[index] = { ...theatres[index], ...updatedFields };
      localStorage.setItem('movtego_theatres', JSON.stringify(theatres));
      return theatres[index];
    }
    return null;
  },

  deleteTheatre: (id) => {
    const theatres = theatreApi.getTheatres();
    const filtered = theatres.filter(t => String(t.id) !== String(id));
    localStorage.setItem('movtego_theatres', JSON.stringify(filtered));
    return true;
  },

  resetToDefaults: () => {
    localStorage.setItem('movtego_theatres', JSON.stringify(INITIAL_THEATRES));
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
