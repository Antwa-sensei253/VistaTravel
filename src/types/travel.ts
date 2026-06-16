export type Category = "beach" | "mountain" | "city" | "adventure";

export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  category: Category;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  packageId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  packageImage: string;
  userName: string;
  userEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
  hasReview: boolean;
}

export interface SearchFilters {
  destination: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  priceRange: [number, number];
  categories: Category[];
  sortBy: "price-asc" | "price-desc" | "rating" | "popular";
}

export type UserMode = "customer" | "provider";
