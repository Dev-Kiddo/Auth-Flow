import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/AuthContextType";

const AuthProvider = function ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return <AuthContext.Provider value={{ user, setUser, isLoading, setisLoading, error, setError }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
