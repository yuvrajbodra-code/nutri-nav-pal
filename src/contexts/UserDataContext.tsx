import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserCondition {
  name: string;
  status: "managed" | "monitoring" | "new";
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  bloodType: string;
  conditions: UserCondition[];
  allergies: string[];
  dietaryPreferences: string[];
  foodLikes: string[];
  foodDislikes: string[];
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  sodiumLimit: number;
  waterGoal: number;
}

const defaultProfile: UserProfile = {
  name: "",
  age: 0,
  gender: "",
  height: "",
  weight: "",
  bloodType: "",
  conditions: [],
  allergies: [],
  dietaryPreferences: [],
  foodLikes: [],
  foodDislikes: [],
  calorieTarget: 2000,
  proteinTarget: 120,
  carbTarget: 250,
  fatTarget: 65,
  sodiumLimit: 1500,
  waterGoal: 8,
};

interface UserDataContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isProfileComplete: boolean;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const STORAGE_KEY = "nutriai-user-profile";

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const isProfileComplete = !!(profile.name && profile.age && profile.gender && profile.height && profile.weight);

  return (
    <UserDataContext.Provider value={{ profile, updateProfile, isProfileComplete }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within UserDataProvider");
  return ctx;
}
