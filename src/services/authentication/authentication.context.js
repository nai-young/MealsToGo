import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState } from 'react';
import {
  loginRequest,
  registerRequest,
  logOutRequest,
} from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        // e.code
        setError(e.message);
      });
  };

  const onRegister = (email, password, confirmPassword) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    registerRequest(auth, email, password)
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((e) => {
        // e.code
        setError(e.message);
        setIsLoading(false);
      });
  };

  const onLogout = () => {
    setIsLoading(true);
    logOutRequest(auth)
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      })
      .catch((e) => {
        // e.code
        setError(e.message);
        setIsLoading(false);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
