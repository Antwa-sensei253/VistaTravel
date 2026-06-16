import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TravelPackage, Review, Booking, UserMode, Category } from "@/types/travel";
import { initialPackages, initialReviews, initialBookings } from "@/data/mockData";

interface TravelContextType {
  // User mode
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  
  // Packages
  packages: TravelPackage[];
  addPackage: (pkg: Omit<TravelPackage, "id" | "rating" | "reviewCount" | "createdAt">) => void;
  updatePackage: (id: string, pkg: Partial<TravelPackage>) => void;
  deletePackage: (id: string) => void;
  getPackageById: (id: string) => TravelPackage | undefined;
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "hasReview">) => void;
  cancelBooking: (id: string) => void;
  completeBooking: (id: string) => void;
  markBookingReviewed: (id: string) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "createdAt">) => void;
  getPackageReviews: (packageId: string) => Review[];
  getAverageRating: (packageId: string) => number;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  packages: "vistatravel_packages",
  bookings: "vistatravel_bookings",
  reviews: "vistatravel_reviews",
  userMode: "vistatravel_userMode",
};

export function TravelProvider({ children }: { children: ReactNode }) {
  const [userMode, setUserModeState] = useState<UserMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.userMode);
    return (stored as UserMode) || "customer";
  });

  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.packages);
    return stored ? JSON.parse(stored) : initialPackages;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.bookings);
    return stored ? JSON.parse(stored) : initialBookings;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.reviews);
    return stored ? JSON.parse(stored) : initialReviews;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.userMode, userMode);
  }, [userMode]);

  const setUserMode = (mode: UserMode) => {
    setUserModeState(mode);
  };

  const addPackage = (pkg: Omit<TravelPackage, "id" | "rating" | "reviewCount" | "createdAt">) => {
    const newPackage: TravelPackage = {
      ...pkg,
      id: Date.now().toString(),
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPackages((prev) => [...prev, newPackage]);
  };

  const updatePackage = (id: string, updates: Partial<TravelPackage>) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updates } : pkg))
    );
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const getPackageById = (id: string) => {
    return packages.find((pkg) => pkg.id === id);
  };

  const addBooking = (booking: Omit<Booking, "id" | "createdAt" | "hasReview">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      hasReview: false,
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
  };

  const completeBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "completed" as const } : b))
    );
  };

  const markBookingReviewed = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, hasReview: true } : b))
    );
  };

  const addReview = (review: Omit<Review, "id" | "createdAt">) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [...prev, newReview]);

    // Update package rating
    const packageReviews = [...reviews, newReview].filter(
      (r) => r.packageId === review.packageId
    );
    const avgRating =
      packageReviews.reduce((sum, r) => sum + r.rating, 0) / packageReviews.length;

    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === review.packageId
          ? { ...pkg, rating: Math.round(avgRating * 10) / 10, reviewCount: packageReviews.length }
          : pkg
      )
    );
  };

  const getPackageReviews = (packageId: string) => {
    return reviews.filter((r) => r.packageId === packageId);
  };

  const getAverageRating = (packageId: string) => {
    const packageReviews = reviews.filter((r) => r.packageId === packageId);
    if (packageReviews.length === 0) return 0;
    return packageReviews.reduce((sum, r) => sum + r.rating, 0) / packageReviews.length;
  };

  return (
    <TravelContext.Provider
      value={{
        userMode,
        setUserMode,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        getPackageById,
        bookings,
        addBooking,
        cancelBooking,
        completeBooking,
        markBookingReviewed,
        reviews,
        addReview,
        getPackageReviews,
        getAverageRating,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
}
