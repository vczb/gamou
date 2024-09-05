"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { User } from "@/types/user";
import { BASE_URL } from "@/utils/constants";
import { NotNullOrUndefinedValueError } from "@/utils/errors";
import { useRouter } from "next/navigation";
export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextData = {
  user?: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  token: string;
  error?: Error;
};

export const AuthContextDefaultValues = {
  user: undefined,
  loading: false,
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  error: undefined,
  token: "",
};

export const AuthContext = createContext<AuthContextData>(
  AuthContextDefaultValues
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const signUp = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);

        const url = BASE_URL + "/api/signup";

        if (!BASE_URL) {
          throw new NotNullOrUndefinedValueError("BASE_URL");
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const dataJson = await response.json();

        const data = dataJson?.data;

        const { token, user } = data;

        if (!token || !user) {
          throw new NotNullOrUndefinedValueError("token or user");
        }

        setToken(token);
        setUser(user);

        router.push("/painel");
      } catch (error) {
        // TODO: handle error
        // setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signIn = async (email: string, password: string) => {};

  const signOut = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        error,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
