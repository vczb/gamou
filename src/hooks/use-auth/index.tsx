import { useCallback, useState } from "react";
import { useUser } from "../use-user";
import renderFlashMessage from "@/utils/renderFlashMessage";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";
import { trackSignIn, trackSignUp } from "@/utils/analytics";

type useAuthProps = {
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  error?: string;
};

const useAuth = (): useAuthProps => {
  const { setUser } = useUser();
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

        trackSignUp();

        router.push("/painel");
      } catch (error: any) {
        setError(error.message);
        renderFlashMessage({ message: error.message, variant: "alert" });
      } finally {
        setLoading(false);
      }
    },
    [router, setUser]
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

        trackSignIn();

        router.push("/painel");
      } catch (error: any) {
        setError(error);
        renderFlashMessage({ message: error.message, variant: "alert" });
      } finally {
        setLoading(false);
      }
    },
    [router, setUser]
  );

  const signOut = useCallback(() => {
    router.push("/sair");
  }, [router]);

  return {
    signOut,
    signIn,
    signUp,
    loading,
    error,
  };
};

export { useAuth };
