import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
} from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();

        setUser(data.user || data.data || data);
      } catch (err) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    const auth = data.data || data;

    localStorage.setItem("token", auth.token);

    setToken(auth.token);
    setUser(auth.user);

    return auth;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);

    const auth = data.data || data;

    localStorage.setItem("token", auth.token);

    setToken(auth.token);
    setUser(auth.user);

    return auth;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;