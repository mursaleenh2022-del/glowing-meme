import { GuestVariant, ItineraryDay, Accommodation, DestinationSpotlight, WeatherData, MediaCategory } from '../types';

export const GUESTS: GuestVariant[] = [
  {
    id: 'guest-1',
    name: 'Eleanor & James Vance',
    shortName: 'Eleanor & James',
    hieroglyphs: '𓀀𓃭𓇋𓈖𓂋 𓀠 𓆓𓅓𓋴',
    email: 'eleanor.vance@example.com',
    role: 'vip',
    welcomeNote: 'We are thrilled to welcome you both to this once-in-a-lifetime private Nile voyage. Prepare for unforgettable desert sunsets and timeless wonders.',
    submittedForm: true,
    intakeData: {
      guestId: 'guest-1',
      guestName: 'Eleanor & James Vance',
      arrivalDay: 'Jan 12, 2026',
      arrivalAirline: 'British Airways',
      arrivalFlightNumber: 'BA 154',
      departureDay: 'Jan 22, 2026',
      departureAirline: 'British Airways',
      departureFlightNumber: 'BA 155',
      drinkFavorites: 'Dry Martini, Mint Tea, Sparkling Water with Lime',
      drinkDislikes: 'Overly sweet cocktails',
      foodFavorites: 'Fresh grilled seafood, Mediterranean salads, lamb chops',
      foodDislikes: 'Heavy cream sauces',
      allergies: 'None',
      submittedAt: '2026-06-25 14:30'
    }
  },
  {
    id: 'guest-2',
    name: 'Dr. Marcus Sterling',
    shortName: 'Dr. Sterling',
    hieroglyphs: '𓅓𓃭𓎢𓋴 𓋴𓏏𓂋𓃭𓈖𓎼',
    email: 'm.sterling@example.com',
    role: 'guest',
    welcomeNote: 'Marcus, your passion for ancient history makes your presence on this expedition indispensable. We cannot wait to explore Karnak together.',
    submittedForm: false
  },
  {
    id: 'guest-3',
    name: 'Elena & David Rossi',
    shortName: 'Elena & David',
    hieroglyphs: '𓇋𓃭𓈖𓀀 𓀠 𓂧𓆑𓂧',
    email: 'elena.rossi@example.com',
    role: 'guest',
    welcomeNote: 'Get ready for an extraordinary adventure from the bustling streets of Cairo to the peaceful sails of our Dahabiya boat!',
    submittedForm: true,
    intakeData: {
      guestId: 'guest-3',
      guestName: 'Elena & David Rossi',
      arrivalDay: 'Jan 12, 2026',
      arrivalAirline: 'Lufthansa',
      arrivalFlightNumber: 'LH 580',
      departureDay: 'Jan 22, 2026',
      departureAirline: 'Lufthansa',
      departureFlightNumber: 'LH 581',
      drinkFavorites: 'Chianti, Espresso, Fresh Pomegranate Juice',
      drinkDislikes: 'Gin',
      foodFavorites: 'Handmade pasta, grilled vegetables, mezze platters',
      foodDislikes: 'Coriander / Cilantro',
      allergies: 'Mild shellfish sensitivity',
      submittedAt: '2026-06-28 09:15'
    }
  },
  {
    id: 'guest-4',
    name: 'Sophia & Lucas Chen',
    shortName: 'Sophia & Lucas',
    hieroglyphs: '𓋴𓆑𓇋𓀀 𓀠 𓃭𓎢𓋴',
    email: 'chen.family@example.com',
    role: 'guest',
    welcomeNote: 'We have curated a journey that blends adventure chic with absolute relaxation. Looking forward to sharing sunsets over the Nile with you.',
    submittedForm: false
  },
  {
    id: 'guest-5',
    name: 'Amara & Zain Al-Fassi',
    shortName: 'Amara & Zain',
    hieroglyphs: '𓀀𓅓𓂋𓀀 𓀠 𓊃𓈖',
    email: 'amara.alfassi@example.com',
    role: 'vip',
    welcomeNote: 'Welcome to our private celebration of Egypt. Your suite at the Old Cataract Aswan awaits overlooking the granite boulders of the Nile.',
    submittedForm: false
  },
  {
    id: 'guest-6',
    name: 'Christopher Holloway',
    shortName: 'Christopher',
    hieroglyphs: '𓎢𓂋𓋴𓏏𓆑𓂋 𓉔𓃭𓅱',
    email: 'c.holloway@example.com',
    role: 'guest',
    welcomeNote: 'Chris, prepare your cameras for the golden hour light hitting the pillars of Luxor and the sails of the Dahabiya.',
    submittedForm: false
  },
  {
    id: 'guest-7',
    name: 'Victoria & Liam Thorne',
    shortName: 'Victoria & Liam',
    hieroglyphs: '𓆑𓎢𓏏𓂋𓇋𓀀 𓀠 𓃭𓅓',
    email: 'thorne.v@example.com',
    role: 'guest',
    welcomeNote: 'We are delighted to have you join our private party. From private after-hours temple access to bespoke dining under desert stars.',
    submittedForm: false
  },
  {
    id: 'guest-8',
    name: 'Harrison & Chloe Wright',
    shortName: 'Harrison & Chloe',
    hieroglyphs: '𓉔𓂋𓋴𓈖 𓀠 𓎢𓃭𓅱',
    email: 'harrison.wright@example.com',
    role: 'guest',
    welcomeNote: 'A journey of wonder is about to begin. We look forward to clinking glasses on the rooftop of the St. Regis overlooking the Nile.',
    submittedForm: false
  },
  {
    id: 'guest-9',
    name: 'Julian & Beatrice Montgomery',
    shortName: 'Julian & Beatrice',
    hieroglyphs: '𓆓𓃭𓈖 𓀠 𓃀𓏏𓂋𓋴',
    email: 'j.montgomery@example.com',
    role: 'guest',
    welcomeNote: 'Julian & Beatrice, welcome! This website contains everything you need to prepare for our Egyptian expedition.',
    submittedForm: false
  },
  {
    id: 'guest-10',
    name: 'Honored VIP Guest',
    shortName: 'Honored Guest',
    hieroglyphs: '𓀠 𓇋𓈖𓆑𓇋𓏏𓂧 𓆓𓅱𓋴𓏏',
    email: 'guest@example.com',
    role: 'vip',
    welcomeNote: 'Welcome to Josh Earl’s private Egypt expedition. We are honored to have you as part of our select circle of 10 travelers.',
    submittedForm: false
  }
];

export const DESTINATION_SPOTLIGHTS: DestinationSpotlight[] = [
  {
    id: 'cairo',
    name: 'Cairo & The Great Pyramids',
    arabicName: 'القاهرة',
    tagline: 'Where Ancient Eternity Meets Bustling Energy',
    description: 'Our journey begins in Egypt’s vibrant capital. Stand in awe before the Great Pyramids of Giza and the Sphinx, explore the newly opened Grand Egyptian Museum housing Tutankhamun’s treasures, and unwind in unmatched luxury along the Nile.',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Private after-hours Giza Plateau tour', 'The Grand Egyptian Museum', 'St. Regis Nile-view suites', 'Khan el-Khalili bazaar exploration'],
    daysStay: 'Days 1 – 3'
  },
  {
    id: 'luxor',
    name: 'Luxor & The Valley of the Kings',
    arabicName: 'الأقصر',
    tagline: 'The World’s Greatest Open-Air Museum',
    description: 'We fly south to ancient Thebes. Step into the opulent Al Moudira palace resort before descending into the royal tombs of the Valley of the Kings. Marvel at the colossal columns of Karnak and experience Luxor Temple illuminated under night skies.',
    imageUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Sunrise hot air balloon over the West Bank', 'Private descent into royal tombs', 'Stay at boutique palace Al Moudira', 'Sunset cocktails at Luxor Temple'],
    daysStay: 'Days 4 – 5'
  },
  {
    id: 'boat',
    name: 'The Dahabiya Al Mourad',
    arabicName: 'الذهبية المراد',
    tagline: 'Private Sailboat Voyage Along the Timeless Nile',
    description: 'Leave large cruise ships behind. We embark on our exclusively chartered luxury Dahabiya—a traditional twin-masted sailing yacht. Glide silently past date palms and Nubian villages, docking at remote islands and ancient riverside temples inaccessible to big boats.',
    imageUrl: 'https://images.unsplash.com/photo-1548686259-29007f3de6c5?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Exclusive yacht charter for our 10 guests', 'Silent wind-powered Nile sailing', 'Private beach dinners under desert stars', 'Visits to Edfu & Gebel el-Silsila'],
    daysStay: 'Days 6 – 8'
  },
  {
    id: 'aswan',
    name: 'Aswan & Abu Simbel',
    arabicName: 'أسوان',
    tagline: 'Granite Boulders, Nubian Culture & Royal History',
    description: 'Our voyage culminates where the Nile flows through golden granite islands. We check into the legendary Old Cataract Hotel—where Agatha Christie penned Death on the Nile—before an exclusive flight to the breathtaking temples of Ramses II at Abu Simbel.',
    imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Stay at the historic Old Cataract Aswan', 'Private excursion to Abu Simbel', 'Sunset felucca sail around Elephantine Island', 'Farewell gala dinner on the royal terrace'],
    daysStay: 'Days 9 – 10'
  }
];

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    dayNumber: 1,
    date: 'Monday, Jan 12, 2026',
    title: 'Arrival in Cairo & Welcome Reception',
    location: 'Cairo',
    highlight: 'Check-in at The St. Regis Cairo & Rooftop Sunset Cocktails',
    description: 'Arrive at Cairo International Airport where our private VIP assistance team will meet you at the jet bridge, handle customs and immigration, and escort you to your chauffeured limousine. Settle into your Nile-view suite before we gather on the rooftop terrace for a private champagne welcome reception hosted by Josh Earl.',
    morningActivity: 'VIP airport meet & greet, private transfer to hotel',
    afternoonActivity: 'Leisure time, spa treatments, and Nile view relaxation',
    eveningActivity: 'Welcome cocktail reception & tasting dinner at J&G Steakhouse terrace',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 2,
    date: 'Tuesday, Jan 13, 2026',
    title: 'The Great Pyramids & The Sphinx',
    location: 'Cairo',
    highlight: 'Private VIP access to the Giza Plateau & Solar Boat',
    description: 'Step back 4,500 years in time. Led by our private Egyptologist, we explore the Giza Plateau with special access away from the crowds. Enjoy a private gourmet lunch overlooking the pyramids at 9 Pyramids Lounge before visiting the mysterious Sphinx.',
    morningActivity: 'Private exploration of Khufu, Khafre, and Menkaure pyramids',
    afternoonActivity: 'Gourmet lunch with panoramic pyramid views at 9 Pyramids Lounge',
    eveningActivity: 'Private evening lecture with renowned Egyptologist & dinner at Khufu’s Restaurant',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 3,
    date: 'Wednesday, Jan 14, 2026',
    title: 'The Grand Egyptian Museum & Historic Cairo',
    location: 'Cairo',
    highlight: 'Exclusive tour of Tutankhamun’s golden gallery & Khan el-Khalili',
    description: 'We spend the morning exploring the architectural marvel of the Grand Egyptian Museum (GEM). Witness thousands of artifacts never displayed before. In the afternoon, we wander the atmospheric alleys of Islamic Cairo and the historic Khan el-Khalili bazaar.',
    morningActivity: 'Guided private tour of the Grand Egyptian Museum galleries',
    afternoonActivity: 'Visit to Sultan Hassan Mosque and Khan el-Khalili artisan workshops',
    eveningActivity: 'Traditional Egyptian feast accompanied by live oud music at Naguib Mahfouz Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 4,
    date: 'Thursday, Jan 15, 2026',
    title: 'Flight to Luxor & Al Moudira Palace',
    location: 'Luxor',
    highlight: 'Check-in at Al Moudira & Sunset at Luxor Temple',
    description: 'We board our morning flight south to Luxor (ancient Thebes). We check into Hotel Al Moudira, a stunning traditional Arabian palace boutique hotel on the West Bank. As the sun begins to set, we cross the Nile to experience the colossal statues of Luxor Temple illuminated against the night sky.',
    morningActivity: 'Private flight to Luxor, welcome refreshments at Al Moudira',
    afternoonActivity: 'Poolside relaxation amidst courtyard jasmine and palm trees',
    eveningActivity: 'Private guided sunset and twilight walk through Luxor Temple & dinner in the palace courtyard',
    imageUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 5,
    date: 'Friday, Jan 16, 2026',
    title: 'Valley of the Kings & Karnak Temple',
    location: 'Luxor',
    highlight: 'Sunrise Hot Air Balloon & Royal Tomb Descent',
    description: 'An unforgettable day begins at dawn as we float above the Valley of the Kings in private hot air balloons. Afterwards, we descend into the royal tombs of Seti I and Tutankhamun with special photography permits. We conclude the afternoon among the 134 sandstone columns of Karnak Temple.',
    morningActivity: 'Sunrise hot air balloon flight & private tour of the Valley of the Kings',
    afternoonActivity: 'Visit to Hatshepsut’s Temple & gourmet lunch on the West Bank',
    eveningActivity: 'Private sunset tour of Karnak Temple & private dinner at Al Moudira',
    imageUrl: 'https://images.unsplash.com/photo-1608285517173-67823528bdfb?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 6,
    date: 'Saturday, Jan 17, 2026',
    title: 'Embarking The Dahabiya Al Mourad',
    location: 'Dahabiya Boat',
    highlight: 'Boarding our exclusively chartered luxury sailboat',
    description: 'Today we board our private floating home for the next three nights: the Dahabiya Al Mourad. With white canvas sails billowing in the gentle Nile breeze, we begin our slow, tranquil voyage south toward Aswan, stopping at ancient villages where time has stood still.',
    morningActivity: 'Boarding Dahabiya Al Mourad, welcome champagne & captain’s briefing',
    afternoonActivity: 'Sailing south, afternoon tea on the sun deck while observing riverside life',
    eveningActivity: 'Chef-prepared Egyptian dinner on deck under a canopy of desert stars',
    imageUrl: 'https://images.unsplash.com/photo-1548686259-29007f3de6c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 7,
    date: 'Sunday, Jan 18, 2026',
    title: 'Sailing to Edfu & Temple of Horus',
    location: 'Dahabiya Boat',
    highlight: 'Horse-drawn carriage ride to Egypt’s best-preserved temple',
    description: 'We awake to the gentle lapping of Nile waters. After breakfast on deck, we disembark at Edfu to visit the Temple of Horus, dedicated to the falcon god. This is the most complete ancient temple remaining in Egypt. We return to the yacht for a peaceful afternoon of sailing and reading.',
    morningActivity: 'Visit to Edfu Temple of Horus with our private Egyptologist',
    afternoonActivity: 'Scenic sailing through Nile gorges, sun deck lounging & wine tasting',
    eveningActivity: 'Island BBQ beach dinner on a secluded Nile sandbank with traditional Nubian drummers',
    imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 8,
    date: 'Monday, Jan 19, 2026',
    title: 'Gebel el-Silsila & Kom Ombo',
    location: 'Dahabiya Boat',
    highlight: 'Exploring ancient sandstone quarries & the double temple of Sobek',
    description: 'Our small craft allows us to dock directly at Gebel el-Silsila, the ancient quarry where the stone for Karnak was carved—a site inaccessible to large cruise ships. In the afternoon, we explore Kom Ombo Temple, uniquely dedicated to two gods: Haroeris the falcon and Sobek the crocodile.',
    morningActivity: 'Private walking exploration of Gebel el-Silsila shrines and quarries',
    afternoonActivity: 'Visit to Kom Ombo Temple & Crocodile Museum at sunset',
    eveningActivity: 'Farewell Dahabiya gala dinner with captain and crew',
    imageUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 9,
    date: 'Tuesday, Jan 20, 2026',
    title: 'Arrival in Aswan & The Old Cataract',
    location: 'Aswan',
    highlight: 'Check-in at the historic Sofitel Legend Old Cataract Aswan',
    description: 'We sail into Aswan, where the Nile is dotted with smooth granite boulders and lush palm islands. We bid farewell to our Dahabiya crew and check into the legendary Old Cataract Hotel. Enjoy high tea on the colonial terrace where kings, diplomats, and literary legends have gazed over Elephantine Island.',
    morningActivity: 'Disembarkation in Aswan, visit to Philae Temple island by private motorboat',
    afternoonActivity: 'Check-in at Old Cataract Aswan, high tea on the royal terrace',
    eveningActivity: 'Sunset felucca sail around Elephantine Island & dinner at 1902 Restaurant',
    imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 10,
    date: 'Wednesday, Jan 21, 2026',
    title: 'The Colossi of Abu Simbel & Farewell Gala',
    location: 'Aswan',
    highlight: 'Private excursion to Ramses II temple & host farewell celebration',
    description: 'Our grand finale takes us on a private morning flight to Abu Simbel near the Sudanese border. Stand dwarfed by the four 66-foot statues of Ramses II carved directly into the mountain face. Tonight, Josh Earl hosts our farewell celebration dinner overlooking the illuminated Nile Cataracts.',
    morningActivity: 'Private excursion and guided exploration of Abu Simbel temples',
    afternoonActivity: 'Free time for spice market shopping or spa relaxation at Old Cataract',
    eveningActivity: 'Host’s Farewell Gala Dinner on the Old Cataract Nile terrace with champagne toasts',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  }
];

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'st-regis-cairo',
    city: 'Cairo',
    name: 'The St. Regis Cairo',
    subtitle: 'Nile-View Suites in Egypt’s Capital',
    description: 'We begin our journey in unmatched metropolitan luxury. Towering above the banks of the River Nile, The St. Regis Cairo represents the pinnacle of contemporary Egyptian elegance. Each guest is booked into a Grand Nile Suite with legendary 24-hour St. Regis Butler service, bespoke marble bathrooms, and breathtaking panoramic views of the city skyline and Nile waters.',
    bookingUrl: 'https://www.marriott.com/en-us/hotels/caixr-the-st-regis-cairo/overview/',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      '24-Hour Signature St. Regis Butler Service',
      'Panoramic floor-to-ceiling River Nile views',
      'Iridium Spa & heated outdoor Nile deck pool',
      'Seven world-class dining destinations including J&G Steakhouse'
    ],
    style: 'Modern Metropolitan Luxury & Opulence'
  },
  {
    id: 'al-moudira-luxor',
    city: 'Luxor',
    name: 'Hotel Al Moudira Luxor',
    subtitle: 'An Enchanting Arabian Palace on the West Bank',
    description: 'Situated on the peaceful West Bank near the Valley of the Kings, Al Moudira is an authentic architectural masterpiece. Built by designer Zeina Aboukheir using traditional domes, antique mashrabiya lattice woodwork, and reclaimed marble fountains from ancient Egyptian palaces, this intimate 30-room boutique sanctuary feels like stepping directly into the Arabian Nights.',
    bookingUrl: 'https://www.moudira.com/',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Secluded 20-acre lush courtyard gardens with citrus trees',
      'Antique-filled suites with 15-foot domed ceilings',
      'Private swimming pool lined with Egyptian stone mosaics',
      'Farm-to-table organic Egyptian & Mediterranean gastronomy'
    ],
    style: 'Boutique Arabian Palace & Heritage Sanctuary'
  },
  {
    id: 'dahabiya-al-mourad',
    city: 'Boat',
    name: 'Dahabiya Al Mourad',
    subtitle: 'Exclusively Chartered Private Sailing Yacht',
    description: 'Our floating home between Luxor and Aswan is the Dahabiya Al Mourad—a handcrafted wooden sailing yacht reserved exclusively for our group of 10 invitees. Unlike crowded Nile cruise ships, the Dahabiya uses twin lateen sails to glide silently along the river. With only luxury cabins and a spacious sun deck draped in Berber rugs and plush sofas, it offers intimate access to hidden islands and private sandbars.',
    bookingUrl: 'https://www.nour-el-nil.com/',
    imageUrl: 'https://images.unsplash.com/photo-1548686259-29007f3de6c5?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Exclusively chartered for our private party of 10 guests',
      'Silent, wind-powered navigation (no generator engine noise)',
      'Dedicated onboard private chef preparing fresh regional cuisine',
      'Docking at untouched Nile sandbanks and private island BBQs'
    ],
    style: 'Authentic River Romance & Bespoke Private Yachting'
  },
  {
    id: 'old-cataract-aswan',
    city: 'Aswan',
    name: 'Sofitel Legend Old Cataract Aswan',
    subtitle: '19th-Century Victorian & Moorish Heritage Landmark',
    description: 'Built in 1899 by Thomas Cook on pink granite cliffs overlooking Elephantine Island, the Old Cataract is one of the world’s most legendary heritage hotels. Here, Winston Churchill, Tsar Nicholas II, and Princess Diana stayed, and Agatha Christie wrote her masterpiece Death on the Nile. We stay in the historic Palace Wing, enjoying timeless Victorian elegance fused with Moorish architecture.',
    bookingUrl: 'https://all.accor.com/hotel/1726/index.en.shtml',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Iconic terrace overlooking Nile feluccas and granite cataracts',
      'Palace Wing suites with authentic Victorian & Oriental decor',
      'SoSPA with indoor heated mosaic pool and hammam',
      'Historic 1902 Restaurant with 60-foot Byzantine dome'
    ],
    style: 'Timeless Victorian Grandeur & Royal Legend'
  }
];

export const WEATHER_DATA: WeatherData[] = [
  {
    destination: 'Cairo',
    avgHigh: '70°F (21°C)',
    avgLow: '50°F (10°C)',
    description: 'Pleasant, crisp desert winter days ideal for walking the Giza Plateau and exploring city bazaars. Nights can feel surprisingly brisk after sundown.',
    sunIntensity: 'Moderate to High (UV Index 5-6)',
    iconName: 'Sun'
  },
  {
    destination: 'Luxor',
    avgHigh: '75°F (24°C)',
    avgLow: '46°F (8°C)',
    description: 'Warm and brilliantly sunny during temple visits in the afternoon. Note the sharp drop in temperature at dawn and dusk—pack a warm fleece for early morning balloon rides!',
    sunIntensity: 'High (UV Index 7-8)',
    iconName: 'Sun'
  },
  {
    destination: 'Aswan',
    avgHigh: '76°F (24°C)',
    avgLow: '47°F (8°C)',
    description: 'Egypt’s sunniest and driest southern jewel. Perfect balmy weather for felucca sailing on the Nile, with refreshing dry desert breezes.',
    sunIntensity: 'Very High (UV Index 8-9)',
    iconName: 'Sun'
  }
];

export const PACKING_CATEGORIES = [
  {
    title: 'Adventure Chic & Layering Fundamentals',
    description: 'The golden rule for winter in Egypt is layering. Temperature swings between noon sunshine and desert midnight can exceed 30°F. Think breathable natural fabrics (linen, merino wool, cotton, cashmere) in sand, khaki, olive, cream, and terracotta tones that blend beautifully with the temples and desert landscapes.',
    items: [
      { name: 'Lightweight Merino Wool Sweater / Cashmere Cardigan', note: 'Essential for chilly mornings on the Dahabiya deck and evening dinners.' },
      { name: 'Tailored Linen / Lightweight Cotton Trousers (2-3 pairs)', note: 'Keeps you cool during sunny midday temple explorations while ensuring modesty.' },
      { name: 'Breathable Long-Sleeve Shirts / Blouses (4-5)', note: 'Protects from the intense desert UV rays without overheating.' },
      { name: 'Warm Evening Jacket / Field Coat', note: 'A stylish quilted or wool field jacket for Cairo rooftop dinners and Nile breezes.' },
      { name: 'Wide-Brimmed Sun Hat or Fedora', note: 'Crucial for shade during long walks at Karnak and the Valley of the Kings.' },
      { name: 'Comfortable Walking Shoes / Desert Boots', note: 'Well-broken-in leather sneakers or lightweight boots; temple floors are uneven sandstone.' },
      { name: 'Evening Elegance Outfit (1-2 sets)', note: 'Smart casual resort attire for our gala dinner at the Old Cataract and St. Regis.' },
      { name: 'High-Quality UV Sunglasses & High SPF Sunscreen', note: 'Desert glare off limestone and Nile waters is intense even in winter.' },
      { name: 'Lightweight Pashmina / Scarf', note: 'Versatile for sun protection, temple modesty, and evening warmth.' }
    ]
  }
];

export const MEDIA_RECOMMENDATIONS: MediaCategory[] = [
  {
    categoryName: 'Books — Nonfiction',
    items: [
      {
        title: 'Barbara',
        authorOrCreator: 'Title as specified in client outline',
        description: 'Recommended reading in the client’s site outline as the primary nonfiction selection for the journey. (No author or further detail supplied in source material—maintained per scope guidelines).'
      },
      {
        title: 'The Rise and Fall of Ancient Egypt',
        authorOrCreator: 'Toby Wilkinson',
        description: 'A masterwork of historical narrative charting three millennia of Egyptian civilization, pharaohs, and monument building.'
      },
      {
        title: 'Death on the Nile (Historical Context & Memoirs)',
        authorOrCreator: 'Agatha Christie & Contemporary Chroniclers',
        description: 'Essential reading before checking into our suites at the Old Cataract Aswan where the novel was conceived.'
      }
    ]
  },
  {
    categoryName: 'Books — Fiction',
    items: [
      {
        title: 'NOT SPECIFIED — needs client input',
        authorOrCreator: 'Pending Client Selection',
        description: 'This field is intentionally preserved as a placeholder per Section 8.4 and Section 15 of the Master Specification ("left blank in source material — do not write filler into production fields").',
        isPlaceholder: true
      }
    ]
  },
  {
    categoryName: 'Documentaries',
    items: [
      {
        title: 'NOT SPECIFIED — needs client input',
        authorOrCreator: 'Pending Client Selection',
        description: 'This category is ready for Josh Earl’s curated documentary links (e.g., BBC Ancient Egypt series, Saqqara tomb excavations, etc.).',
        isPlaceholder: true
      }
    ]
  },
  {
    categoryName: 'Movies',
    items: [
      {
        title: 'NOT SPECIFIED — needs client input',
        authorOrCreator: 'Pending Client Selection',
        description: 'Awaiting client recommendations for cinematic inspiration ahead of our trip.',
        isPlaceholder: true
      }
    ]
  },
  {
    categoryName: 'Podcasts',
    items: [
      {
        title: 'NOT SPECIFIED — needs client input',
        authorOrCreator: 'Pending Client Selection',
        description: 'Ready for client’s preferred Egyptian history or travel podcast episodes.',
        isPlaceholder: true
      }
    ]
  },
  {
    categoryName: 'Online Classes',
    items: [
      {
        title: 'NOT SPECIFIED — needs client input',
        authorOrCreator: 'Pending Client Selection',
        description: 'Awaiting client input for pre-trip online courses or Egyptology lectures.',
        isPlaceholder: true
      }
    ]
  }
];

export const GENERAL_HELPFUL_INFO = [
  {
    title: 'Visa & Entry Requirements',
    icon: 'Passport',
    summary: 'E-Visa upon arrival or pre-trip online application',
    content: 'Most travelers (US, UK, EU, Canadian citizens) can obtain a 30-day tourist visa upon arrival at Cairo International Airport for $25 USD (payable in cash or card), or apply online via the official Egyptian e-Visa portal 7 days prior to departure. Our VIP airport meet & greet team will assist you with this at the jet bridge.'
  },
  {
    title: 'Currency & Gratuities (Baksheesh)',
    icon: 'Banknote',
    summary: 'Egyptian Pound (EGP) & Tipping Culture',
    content: 'The local currency is the Egyptian Pound (EGP). Credit cards (Visa/Mastercard) are widely accepted at our hotels, fine dining restaurants, and upscale boutiques. However, carrying some small EGP or USD cash notes is helpful for small purchases. Note: All group tipping and guides’ gratuities are pre-paid by your host Josh Earl; you do not need to tip our private drivers or Egyptologists.'
  },
  {
    title: 'Health, Water & Dining Safety',
    icon: 'ShieldCheck',
    summary: 'Bottled water only & gourmet hygiene standards',
    content: 'Throughout our journey, complimentary premium bottled water (still and sparkling) will be provided continuously in all vehicles, suites, and onboard the Dahabiya. Please drink only bottled water and use it for brushing your teeth. All dining venues selected on our itinerary adhere to strict international hygiene and safety standards.'
  },
  {
    title: 'Cultural Etiquette & Dress Code',
    icon: 'Sparkles',
    summary: 'Respectful elegance in historic and religious sites',
    content: 'Egypt is a welcoming country with rich traditions. When visiting active mosques or rural villages, dressing with modest elegance (covering shoulders and knees for both men and women) is appreciated. In resort pools, Dahabiya decks, and hotel terraces, standard swimwear and resort wear are completely appropriate.'
  },
  {
    title: 'Connectivity & Electrical Outlets',
    icon: 'Wifi',
    summary: 'High-speed Wi-Fi & Type C / F European plugs',
    content: 'All our hotels and the Dahabiya Al Mourad feature complimentary high-speed Wi-Fi. For mobile roaming, eSIMs (such as Airalo or Holafly) work flawlessly across Egypt. Electrical outlets use standard European two-round-prong plugs (Types C and F) at 220V. Universal adapters will also be available in your welcome gift bag.'
  }
];
