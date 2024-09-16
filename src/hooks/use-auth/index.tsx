"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/user";
import { BASE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import renderFlashMessage from "@/utils/renderFlashMessage";
import { getStorageItem, setStorageItem } from "@/utils/storage/browser";
export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextData = {
  user?: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  error?: string;
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

const BROWSER_STORAGE_KEY = "user";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const signUp = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(undefined);

        const url = BASE_URL + "/api/auth/signup";

        if (!BASE_URL) {
          throw new Error("variável BASE_URL não pode ser nula");
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

        const { message, data, status } = dataJson;

        if (status !== 200) {
          throw new Error(message);
        }

        if (!data) {
          throw new Error("Não há dados disponíveis");
        }

        const { user } = data;

        if (!user) {
          throw new Error("Usuário inválido");
        }

        setUser(user);

        router.push("/painel");
      } catch (error: any) {
        setError(error.message);
        renderFlashMessage({ message: error.message, variant: "alert" });
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(undefined);

        const url = BASE_URL + "/api/auth/signin";

        if (!BASE_URL) {
          throw new Error("variável BASE_URL não pode ser nula");
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
          throw new Error("Não há dados disponíveis");
        }

        const { user } = data;

        if (!user) {
          throw new Error("Usuário não pode ser vazio");
        }

        setUser(user);

        router.push("/painel");
      } catch (error: any) {
        setError(error);
        renderFlashMessage({ message: error.message, variant: "alert" });
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signOut = useCallback(() => {
    router.push("/sair");
  }, [router]);

  useEffect(() => {
    if (user) {
      setStorageItem(BROWSER_STORAGE_KEY, user);
    } else {
      const restored = getStorageItem(BROWSER_STORAGE_KEY);
      if (restored) {
        setUser(restored);
      }
    }
  }, [user]);

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
