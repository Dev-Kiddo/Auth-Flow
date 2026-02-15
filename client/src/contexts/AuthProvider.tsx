import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = function ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const response = await fetch(`http://localhost:8000/api/v1/`)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchUser();
  // }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
