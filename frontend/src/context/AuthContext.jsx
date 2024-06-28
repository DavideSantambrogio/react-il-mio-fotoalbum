import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Definizione del contesto di autenticazione
const AuthContext = createContext();

// Hook custom per accedere al contesto di autenticazione
export const useAuth = () => useContext(AuthContext);

// Provider del contesto di autenticazione
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Funzione per effettuare il login
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });
      const { token } = response.data;
      setToken(token);
      return token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Propaga l'errore per gestione futura
    }
  };

  // Funzione per effettuare il logout
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
