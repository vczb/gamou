"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { User } from "@/types/user";
import { BASE_URL } from "@/utils/constants";
import { NotNullOrUndefinedValueError } from "@/utils/errors";
import { useRouter } from "next/navigation";
import { useNotification } from "../use-notification";
export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextData = {
  user?: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  error?: Error;
};

export const AuthContextDefaultValues = {
  user: undefined,
  loading: false,
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  error: undefined,
};

export const AuthContext = createContext<AuthContextData>(
  AuthContextDefaultValues
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();
  const { renderNotification } = useNotification();

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

        const { message, data } = dataJson;

        if (response.status !== 200) {
          throw new Error(message);
        }

        if (!data) {
          throw new NotNullOrUndefinedValueError("response data");
        }

        const { token, user } = data;

        if (!token || !user) {
          throw new NotNullOrUndefinedValueError("token or user");
        }

        setUser(user);

        router.push("/painel");
      } catch (error: any) {
        renderNotification({
          message: error?.message || "Something went wrong during Sign Up",
          variant: "alert",
        });

        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [router, renderNotification]
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);

        const url = BASE_URL + "/api/signin";

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

        if (response.status !== 200) {
          throw new Error(dataJson?.message);
        }

        const data = dataJson?.data;

        if (!data) {
          throw new NotNullOrUndefinedValueError("response data");
        }

        const { user } = data;

        if (!user) {
          throw new NotNullOrUndefinedValueError("user");
        }

        setUser(user);

        router.push("/painel");
      } catch (error: any) {
        renderNotification({
          message: error?.message || "Failed to sign in",
          variant: "alert",
        });

        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [router, renderNotification]
  );

  const signOut = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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
