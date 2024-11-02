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
import renderFlashMessage from "@/utils/renderFlashMessage";
import { getStorageItem, setStorageItem } from "@/utils/storage/browser";
import { useRouter } from "next/navigation";
import { trackDeleteUser } from "@/utils/analytics";

export type UserProviderProps = {
  children: React.ReactNode;
};

export type UserContextData = {
  user?: User;
  setUser: (user: User) => void;
  loading: boolean;
  editUser: ({ name, password }: { name?: string; password?: string }) => void;
  deleteUser: () => void;
  error?: string;
};

export const UserContextDefaultValues = {
  user: undefined,
  loading: false,
  editUser: async () => {},
  deleteUser: async () => {},
  setUser: () => {},
  error: undefined,
};

export const UserContext = createContext<UserContextData>(
  UserContextDefaultValues
);

const BROWSER_STORAGE_KEY = "user";

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const deleteUser = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const userId = user.id;

      if (!userId) {
        throw new Error("Não foi possível processar dados do usuário");
      }

      const url = `${BASE_URL}/api/users/${userId}`;

      if (!BASE_URL) {
        throw new Error("variável BASE_URL não pode ser nula");
      }

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataJson = await response.json();

      if (response.status !== 200) {
        throw new Error(dataJson?.message);
      }

      trackDeleteUser();

      router.push("/");
    } catch (error: any) {
      setError(error);
      renderFlashMessage({ message: error.message, variant: "alert" });
    } finally {
      setLoading(false);
    }
  }, [user, router]);

  const editUser = async ({
    name = "",
    password = "",
  }: {
    name?: string;
    password?: string;
  }) => {
    setLoading(true);
    setError(undefined);

    try {
      const url = BASE_URL + "/api/users/";

      if (!BASE_URL) {
        throw new Error("variável BASE_URL não pode ser nula");
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
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

      renderFlashMessage({
        message: "Usuário atualizado com sucesso!",
        variant: "success",
      });
    } catch (error: any) {
      setError(error);
      renderFlashMessage({ message: error.message, variant: "alert" });
    } finally {
      setLoading(false);
    }
  };

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
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        editUser,
        setUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
