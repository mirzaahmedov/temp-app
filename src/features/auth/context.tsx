import type { UserType } from "@/definitions/user";
import { createContext, useCallback, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  credentials: UserType | null;
  setIsAuthenticated: (value: boolean) => void;
  setCredentials: (value: UserType | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  credentials: null,
  setIsAuthenticated() {},
  setCredentials() {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<UserType | null>(() => {
    const credentials = sessionStorage.getItem("credentials");
    if (!credentials) {
      return null;
    }
    setIsAuthenticated(true);
    return JSON.parse(credentials);
  });

  const setCredentialsWithStorage = useCallback(
    (value: UserType | null) => {
      if (value) {
        sessionStorage.setItem("credentials", JSON.stringify(value));
        setCredentials(value);
        return;
      }

      sessionStorage.removeItem("credentials");
      setCredentials(null);
    },
    [setCredentials]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        credentials,
        setIsAuthenticated,
        setCredentials: setCredentialsWithStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
