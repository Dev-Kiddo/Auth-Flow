import { createContext, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/AuthContextType";

export const AuthContext = createContext<AuthContextType | null>(null);

// const AuthProvider = function ({children}: {children:ReactNode}) {
//     const [user, setUser] = useState({});
//     return(
//         <AuthContext.Provider value={{user}}>
//         {children}
//         </AuthContext.Provider>
//     )
// };

// export default AuthProvider;
