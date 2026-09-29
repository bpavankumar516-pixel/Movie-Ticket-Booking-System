// Theatre and Showtime Service Layer with authentic data and localStorage CRUD support

export const CITIES = [
  'All',
  'Hyderabad',
  'Bengaluru',
  'Mumbai',
  'Chennai',
  'Delhi',
  'Vijayawada',
  'Visakhapatnam'
];

export const AMENITIES_LIST = [
  'IMAX 3D',
  'Dolby Atmos',
  '4DX 3D',
  'VIP Recliners',
  'Laser 4K',
  'Gourmet Food',
  'PlayHouse',
  'Valet Parking'
];

export const INITIAL_THEATRES = [
  {
    id: 'th-101',
    name: 'AMB Cinemas Multiplex',
    city: 'Hyderabad',
    address: 'Gachibowli - Miyapur Rd, Whitefields, Gachibowli, Hyderabad, Telangana 500084',
    rating: 4.9,
    reviewsCount: 3420,
    screensCount: 7,
    amenities: ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', 'Laser 4K', 'Gourmet Food', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 40 2345 6789',
      email: 'support@ambcinemas.com',
      website: 'https://ambcinemas.com',
      mapUrl: 'https://maps.google.com/?q=AMB+Cinemas+Hyderabad'
    },
    screens: [
      { id: 'sc-101', name: 'Audi 1 - Laser 4K IMAX', type: 'IMAX 3D', totalSeats: 350 },
      { id: 'sc-102', name: 'Audi 2 - Dolby Atmos VIP', type: 'VIP Recliner', totalSeats: 120 },
      { id: 'sc-103', name: 'Audi 3 - Premium Screen', type: 'Dolby Atmos', totalSeats: 220 },
      { id: 'sc-104', name: 'Audi 4 - Lounge Screen', type: 'Dolby 7.1', totalSeats: 180 },
      { id: 'sc-105', name: 'Audi 5 - 4DX Dynamic', type: '4DX 3D', totalSeats: 140 },
      { id: 'sc-106', name: 'Audi 6 - Family Screen', type: 'Laser 4K', totalSeats: 200 },
      { id: 'sc-107', name: 'Audi 7 - Executive Suite', type: 'VIP Recliner', totalSeats: 90 }
    ],
    shows: [
      { id: 'sh-101', movieId: 101, movieTitle: 'Dune: Part Two', time: '10:30 AM', screen: 'Audi 1 - Laser 4K IMAX', format: 'IMAX 3D', price: 290, totalSeats: 120, bookedCount: 45 },
      { id: 'sh-102', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:15 PM', screen: 'Audi 1 - Laser 4K IMAX', format: 'IMAX 3D', price: 290, totalSeats: 120, bookedCount: 98 },
      { id: 'sh-103', movieId: 101, movieTitle: 'Dune: Part Two', time: '06:00 PM', screen: 'Audi 2 - Dolby Atmos VIP', format: 'VIP Recliner', price: 350, totalSeats: 60, bookedCount: 58 },
      { id: 'sh-104', movieId: 101, movieTitle: 'Dune: Part Two', time: '09:45 PM', screen: 'Audi 1 - Laser 4K IMAX', format: 'IMAX 3D', price: 290, totalSeats: 120, bookedCount: 110 },
      { id: 'sh-105', movieId: 106, movieTitle: 'Interstellar', time: '01:30 PM', screen: 'Audi 3 - Premium Screen', format: 'Dolby Atmos', price: 250, totalSeats: 100, bookedCount: 82 },
      { id: 'sh-106', movieId: 106, movieTitle: 'Interstellar', time: '07:30 PM', screen: 'Audi 3 - Premium Screen', format: 'Dolby Atmos', price: 250, totalSeats: 100, bookedCount: 95 },
      { id: 'sh-107', movieId: 105, movieTitle: 'Avatar: The Way of Water', time: '04:00 PM', screen: 'Audi 5 - 4DX Dynamic', format: '4DX 3D', price: 320, totalSeats: 80, bookedCount: 72 }
    ]
  },
  {
    id: 'th-102',
    name: 'PVR Forum Mall Multiplex',
    city: 'Hyderabad',
    address: 'Forum Sujana Mall, KPHB Phase 9, Kukatpally, Hyderabad, Telangana 500072',
    rating: 4.8,
    reviewsCount: 2890,
    screensCount: 9,
    amenities: ['4DX 3D', 'PlayHouse', 'Dolby Atmos', 'Gourmet Food', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 40 4567 8901',
      email: 'hyderabad.forum@pvrcinemas.com',
      website: 'https://pvrcinemas.com',
      mapUrl: 'https://maps.google.com/?q=PVR+Forum+Mall+Kukatpally+Hyderabad'
    },
    screens: [
      { id: 'sc-201', name: 'Audi 1 - P[XL] Large Screen', type: 'Dolby Atmos', totalSeats: 320 },
      { id: 'sc-202', name: 'Audi 2 - 4DX Motion', type: '4DX 3D', totalSeats: 130 },
      { id: 'sc-203', name: 'Audi 3 - Playhouse Kids', type: 'PlayHouse', totalSeats: 100 },
      { id: 'sc-204', name: 'Audi 4 - Recliner VIP', type: 'VIP Recliner', totalSeats: 80 }
    ],
    shows: [
      { id: 'sh-201', movieId: 101, movieTitle: 'Dune: Part Two', time: '11:00 AM', screen: 'Audi 1 - P[XL] Large Screen', format: 'Dolby Atmos', price: 260, totalSeats: 100, bookedCount: 42 },
      { id: 'sh-202', movieId: 101, movieTitle: 'Dune: Part Two', time: '03:15 PM', screen: 'Audi 1 - P[XL] Large Screen', format: 'Dolby Atmos', price: 260, totalSeats: 100, bookedCount: 78 },
      { id: 'sh-203', movieId: 105, movieTitle: 'Avatar: The Way of Water', time: '06:45 PM', screen: 'Audi 2 - 4DX Motion', format: '4DX 3D', price: 340, totalSeats: 80, bookedCount: 79 },
      { id: 'sh-204', movieId: 106, movieTitle: 'Interstellar', time: '08:30 PM', screen: 'Audi 4 - Recliner VIP', format: 'VIP Recliner', price: 380, totalSeats: 50, bookedCount: 48 }
    ]
  },
  {
    id: 'th-103',
    name: 'Prasads Multiplex & Large Screen',
    city: 'Hyderabad',
    address: 'NTR Gardens, Lic Division, Khairatabad, Hyderabad, Telangana 500004',
    rating: 4.8,
    reviewsCount: 4120,
    screensCount: 6,
    amenities: ['Laser 4K', 'Dolby Atmos', 'Gourmet Food', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 40 2322 1122',
      email: 'contact@prasads.net',
      website: 'https://prasads.net',
      mapUrl: 'https://maps.google.com/?q=Prasads+Multiplex+Hyderabad'
    },
    screens: [
      { id: 'sc-301', name: 'Large Screen (70ft)', type: 'Laser 4K 70MM', totalSeats: 500 },
      { id: 'sc-302', name: 'Screen 2 - Dolby Atmos', type: 'Dolby Atmos', totalSeats: 250 },
      { id: 'sc-303', name: 'Screen 3 - Premium', type: 'Dolby 7.1', totalSeats: 220 }
    ],
    shows: [
      { id: 'sh-301', movieId: 106, movieTitle: 'Interstellar', time: '11:30 AM', screen: 'Large Screen (70ft)', format: 'Laser 4K', price: 280, totalSeats: 150, bookedCount: 142 },
      { id: 'sh-302', movieId: 101, movieTitle: 'Dune: Part Two', time: '04:00 PM', screen: 'Large Screen (70ft)', format: 'Laser 4K', price: 280, totalSeats: 150, bookedCount: 135 },
      { id: 'sh-303', movieId: 103, movieTitle: 'Oppenheimer', time: '08:00 PM', screen: 'Large Screen (70ft)', format: 'Laser 4K', price: 300, totalSeats: 150, bookedCount: 150 }
    ]
  },
  {
    id: 'th-104',
    name: 'PVR Orion Mall IMAX',
    city: 'Bengaluru',
    address: 'Dr Rajkumar Rd, Malleshwaram West, Bengaluru, Karnataka 560055',
    rating: 4.9,
    reviewsCount: 3100,
    screensCount: 11,
    amenities: ['IMAX 3D', '4DX 3D', 'VIP Recliners', 'Dolby Atmos', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 80 4123 4567',
      email: 'bengaluru.orion@pvrcinemas.com',
      website: 'https://pvrcinemas.com',
      mapUrl: 'https://maps.google.com/?q=PVR+Orion+Mall+Bengaluru'
    },
    screens: [
      { id: 'sc-401', name: 'Audi 1 - IMAX 3D', type: 'IMAX 3D', totalSeats: 380 },
      { id: 'sc-402', name: 'Audi 2 - 4DX', type: '4DX 3D', totalSeats: 140 },
      { id: 'sc-403', name: 'Audi 3 - Gold Class Recliner', type: 'VIP Recliner', totalSeats: 70 }
    ],
    shows: [
      { id: 'sh-401', movieId: 101, movieTitle: 'Dune: Part Two', time: '10:45 AM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 380, totalSeats: 120, bookedCount: 90 },
      { id: 'sh-402', movieId: 105, movieTitle: 'Avatar: The Way of Water', time: '03:00 PM', screen: 'Audi 1 - IMAX 3D', format: 'IMAX 3D', price: 380, totalSeats: 120, bookedCount: 115 },
      { id: 'sh-403', movieId: 106, movieTitle: 'Interstellar', time: '07:15 PM', screen: 'Audi 3 - Gold Class Recliner', format: 'VIP Recliner', price: 450, totalSeats: 50, bookedCount: 46 }
    ]
  },
  {
    id: 'th-105',
    name: 'PVR Maison JWO BKC',
    city: 'Mumbai',
    address: 'Maker Maxity, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051',
    rating: 4.9,
    reviewsCount: 2750,
    screensCount: 6,
    amenities: ['VIP Recliners', 'Dolby Atmos', 'Gourmet Food', 'Laser 4K', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 22 2654 3210',
      email: 'maison.bkc@pvrcinemas.com',
      website: 'https://pvrcinemas.com',
      mapUrl: 'https://maps.google.com/?q=PVR+Maison+BKC+Mumbai'
    },
    screens: [
      { id: 'sc-501', name: 'Luxe Suite 1', type: 'VIP Recliner', totalSeats: 80 },
      { id: 'sc-502', name: 'Luxe Suite 2 - Dolby Atmos', type: 'Dolby Atmos', totalSeats: 120 }
    ],
    shows: [
      { id: 'sh-501', movieId: 101, movieTitle: 'Dune: Part Two', time: '01:15 PM', screen: 'Luxe Suite 1', format: 'VIP Recliner', price: 500, totalSeats: 40, bookedCount: 36 },
      { id: 'sh-502', movieId: 103, movieTitle: 'Oppenheimer', time: '06:00 PM', screen: 'Luxe Suite 2 - Dolby Atmos', format: 'Dolby Atmos', price: 420, totalSeats: 60, bookedCount: 58 }
    ]
  },
  {
    id: 'th-106',
    name: 'Sathyam Cinemas (SPI Multiplex)',
    city: 'Chennai',
    address: '8, Sankaradas Swamigal Road, Royapettah, Chennai, Tamil Nadu 600014',
    rating: 4.9,
    reviewsCount: 5200,
    screensCount: 6,
    amenities: ['Dolby Atmos', 'Laser 4K', 'VIP Recliners', 'Gourmet Food'],
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 44 2811 1111',
      email: 'sathyam@spicinemas.in',
      website: 'https://spicinemas.in',
      mapUrl: 'https://maps.google.com/?q=Sathyam+Cinemas+Chennai'
    },
    screens: [
      { id: 'sc-601', name: 'Sathyam - RDX Atmos', type: 'Dolby Atmos', totalSeats: 450 },
      { id: 'sc-602', name: 'Sanam Screen', type: 'Laser 4K', totalSeats: 220 }
    ],
    shows: [
      { id: 'sh-601', movieId: 101, movieTitle: 'Dune: Part Two', time: '10:15 AM', screen: 'Sathyam - RDX Atmos', format: 'Dolby Atmos', price: 230, totalSeats: 150, bookedCount: 140 },
      { id: 'sh-602', movieId: 106, movieTitle: 'Interstellar', time: '06:30 PM', screen: 'Sathyam - RDX Atmos', format: 'Dolby Atmos', price: 230, totalSeats: 150, bookedCount: 148 }
    ]
  },
  {
    id: 'th-107',
    name: 'PVR Director\'s Cut Vasant Kunj',
    city: 'Delhi',
    address: 'Ambience Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi 110070',
    rating: 4.9,
    reviewsCount: 1980,
    screensCount: 4,
    amenities: ['VIP Recliners', 'Gourmet Food', 'Dolby Atmos', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 11 4100 2000',
      email: 'directorscut@pvrcinemas.com',
      website: 'https://pvrcinemas.com',
      mapUrl: 'https://maps.google.com/?q=PVR+Directors+Cut+Delhi'
    },
    screens: [
      { id: 'sc-701', name: 'Director\'s Lounge 1', type: 'VIP Recliner', totalSeats: 60 },
      { id: 'sc-702', name: 'Director\'s Lounge 2', type: 'VIP Recliner', totalSeats: 60 }
    ],
    shows: [
      { id: 'sh-701', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:00 PM', screen: 'Director\'s Lounge 1', format: 'VIP Recliner', price: 650, totalSeats: 30, bookedCount: 28 }
    ]
  },
  {
    id: 'th-108',
    name: 'PVR Trendset Mall',
    city: 'Vijayawada',
    address: 'Trendset Mall, Benz Circle, Vijayawada, Andhra Pradesh 520010',
    rating: 4.7,
    reviewsCount: 1820,
    screensCount: 5,
    amenities: ['Dolby Atmos', 'VIP Recliners', 'Gourmet Food'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 866 245 6789',
      email: 'vijayawada@pvrcinemas.com',
      website: 'https://pvrcinemas.com',
      mapUrl: 'https://maps.google.com/?q=PVR+Trendset+Vijayawada'
    },
    screens: [
      { id: 'sc-801', name: 'Screen 1 - Dolby Atmos', type: 'Dolby Atmos', totalSeats: 240 },
      { id: 'sc-802', name: 'Screen 2 - VIP Recliner', type: 'VIP Recliner', totalSeats: 90 }
    ],
    shows: [
      { id: 'sh-801', movieId: 101, movieTitle: 'Dune: Part Two', time: '11:00 AM', screen: 'Screen 1 - Dolby Atmos', format: 'Dolby Atmos', price: 210, totalSeats: 100, bookedCount: 65 }
    ]
  },
  {
    id: 'th-109',
    name: 'Inox Varun Beach',
    city: 'Visakhapatnam',
    address: 'Varun Beach, Beach Rd, Pandurangapuram, Visakhapatnam, Andhra Pradesh 530002',
    rating: 4.8,
    reviewsCount: 2150,
    screensCount: 6,
    amenities: ['Dolby Atmos', 'Laser 4K', 'VIP Recliners', 'Gourmet Food'],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    contact: {
      phone: '+91 891 270 9999',
      email: 'vizag@inoxmovies.com',
      website: 'https://inoxmovies.com',
      mapUrl: 'https://maps.google.com/?q=Inox+Varun+Beach+Vizag'
    },
    screens: [
      { id: 'sc-901', name: 'Insignia 1', type: 'VIP Recliner', totalSeats: 80 },
      { id: 'sc-902', name: 'Screen 2 - Dolby Atmos', type: 'Dolby Atmos', totalSeats: 260 }
    ],
    shows: [
      { id: 'sh-901', movieId: 101, movieTitle: 'Dune: Part Two', time: '02:30 PM', screen: 'Screen 2 - Dolby Atmos', format: 'Dolby Atmos', price: 220, totalSeats: 100, bookedCount: 75 }
    ]
  }
];

const STORAGE_KEY = 'movtego_theatres';

const getStoredTheatres = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load theatres from localStorage:', e);
  }
  return INITIAL_THEATRES;
};

const saveStoredTheatres = (theatres) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theatres));
  } catch (e) {
    console.error('Failed to save theatres to localStorage:', e);
  }
};

export const theatreApi = {
  getCities: () => CITIES,
  getAmenities: () => AMENITIES_LIST,

  getTheatres: (city = 'All', search = '') => {
    let list = getStoredTheatres();
    if (city && city !== 'All') {
      list = list.filter(t => t.city.toLowerCase() === city.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q) ||
        (t.amenities && t.amenities.some(a => a.toLowerCase().includes(q)))
      );
    }
    return list;
  },

  getTheatreById: (id) => {
    const list = getStoredTheatres();
    return list.find(t => t.id === id) || list[0];
  },

  addTheatre: (newTheatreData) => {
    const list = getStoredTheatres();
    const id = `th-${Date.now().toString().slice(-5)}`;
    const created = {
      id,
      name: newTheatreData.name || 'New Multiplex Cinema',
      city: newTheatreData.city || 'Hyderabad',
      address: newTheatreData.address || 'Central City Road',
      rating: 4.8,
      reviewsCount: 10,
      screensCount: Number(newTheatreData.screensCount) || 4,
      amenities: newTheatreData.amenities || ['Dolby Atmos', 'VIP Recliners'],
      image: newTheatreData.image || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
      contact: {
        phone: newTheatreData.phone || '+91 40 1234 5678',
        email: newTheatreData.email || 'info@cinema.com',
        website: newTheatreData.website || 'https://movtego.com',
        mapUrl: newTheatreData.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(newTheatreData.name || 'Cinema')}`
      },
      screens: newTheatreData.screens || [
        { id: `${id}-sc1`, name: 'Audi 1 - Dolby Atmos', type: 'Dolby Atmos', totalSeats: 200 },
        { id: `${id}-sc2`, name: 'Audi 2 - Laser 4K', type: 'Laser 4K', totalSeats: 160 }
      ],
      shows: newTheatreData.shows || [
        { id: `${id}-sh1`, movieId: 101, movieTitle: 'Dune: Part Two', time: '11:00 AM', screen: 'Audi 1 - Dolby Atmos', format: 'Dolby Atmos', price: 250, totalSeats: 100, bookedCount: 20 },
        { id: `${id}-sh2`, movieId: 101, movieTitle: 'Dune: Part Two', time: '04:00 PM', screen: 'Audi 1 - Dolby Atmos', format: 'Dolby Atmos', price: 250, totalSeats: 100, bookedCount: 50 },
        { id: `${id}-sh3`, movieId: 106, movieTitle: 'Interstellar', time: '08:00 PM', screen: 'Audi 2 - Laser 4K', format: 'Laser 4K', price: 220, totalSeats: 80, bookedCount: 65 }
      ]
    };
    const updatedList = [created, ...list];
    saveStoredTheatres(updatedList);
    return created;
  },

  updateTheatre: (id, updatedFields) => {
    const list = getStoredTheatres();
    const updatedList = list.map(t => {
      if (t.id === id) {
        return {
          ...t,
          ...updatedFields,
          contact: {
            ...t.contact,
            ...(updatedFields.contact || {}),
            phone: updatedFields.phone ?? t.contact?.phone,
            email: updatedFields.email ?? t.contact?.email,
            website: updatedFields.website ?? t.contact?.website,
            mapUrl: updatedFields.mapUrl ?? t.contact?.mapUrl
          }
        };
      }
      return t;
    });
    saveStoredTheatres(updatedList);
    return updatedList.find(t => t.id === id);
  },

  deleteTheatre: (id) => {
    const list = getStoredTheatres();
    const updatedList = list.filter(t => t.id !== id);
    saveStoredTheatres(updatedList);
    return true;
  },

  resetToDefaults: () => {
    saveStoredTheatres(INITIAL_THEATRES);
    return INITIAL_THEATRES;
  },

  getShowById: (showId) => {
    const list = getStoredTheatres();
    for (const theatre of list) {
      const foundShow = theatre.shows.find(s => s.id === showId);
      if (foundShow) {
        return { ...foundShow, theatre };
      }
    }
    return {
      ...list[0].shows[0],
      theatre: list[0]
    };
  }
};
