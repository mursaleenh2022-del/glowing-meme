export type PageId = 
  | 'landing' 
  | 'itinerary' 
  | 'accommodations' 
  | 'helpful-info' 
  | 'packing' 
  | 'weather' 
  | 'media' 
  | 'intake-form';

export interface GuestVariant {
  id: string;
  name: string;
  shortName: string;
  hieroglyphs: string;
  email: string;
  role: 'guest' | 'vip' | 'family';
  welcomeNote: string;
  submittedForm: boolean;
  intakeData?: IntakeFormSubmission;
}

export interface IntakeFormSubmission {
  guestId: string;
  guestName: string;
  arrivalDay: string;
  arrivalAirline: string;
  arrivalFlightNumber: string;
  departureDay: string;
  departureAirline: string;
  departureFlightNumber: string;
  drinkFavorites: string;
  drinkDislikes: string;
  foodFavorites: string;
  foodDislikes: string;
  allergies: string;
  submittedAt: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  location: 'Cairo' | 'Luxor' | 'Dahabiya Boat' | 'Aswan';
  highlight: string;
  description: string;
  morningActivity: string;
  afternoonActivity: string;
  eveningActivity: string;
  imageUrl: string;
}

export interface Accommodation {
  id: string;
  city: 'Cairo' | 'Luxor' | 'Boat' | 'Aswan';
  name: string;
  subtitle: string;
  description: string;
  bookingUrl: string;
  imageUrl: string;
  highlights: string[];
  style: string;
}

export interface DestinationSpotlight {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  daysStay: string;
}

export interface WeatherData {
  destination: string;
  avgHigh: string;
  avgLow: string;
  description: string;
  sunIntensity: string;
  iconName: string;
}

export interface MediaCategory {
  categoryName: string;
  items: {
    title: string;
    authorOrCreator?: string;
    description: string;
    isPlaceholder?: boolean;
  }[];
}
