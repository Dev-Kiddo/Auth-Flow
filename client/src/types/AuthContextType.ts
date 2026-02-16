export interface User {
  createdAt: Date;
  email: string;
  isEmailVerified: boolean;
  name: string;
  password: string;
  role: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  setisLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
