import { createContext, useContext, useState } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext({
  user: null,
  isLogged: false,
  handleLogin: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user] = useState(null);
  const [isLogged] = useState(false);

  const handleLogin = (token) => {
    const payload = jwt.decode(token);
    console.log(payload);
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContextProvider;
