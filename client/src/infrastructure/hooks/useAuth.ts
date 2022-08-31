import { TAuth } from "types/api/auth";
import { TFormLogin } from "types/page/auth.page";
import { loginApi } from "infrastructure/common/api";
import { getUser, setUser } from "infrastructure/store/user.reducer";
import { useAppDispatch, useAppSelector } from "./useStore";

export function useAuth() {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  return {
    ...user,
    async login(data: TFormLogin): Promise<TAuth> {
      try {
        const response = await loginApi(data);

        const encoded = btoa(JSON.stringify(response.data));

        localStorage.setItem("credentials", encoded);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    logout(): void {
      localStorage.removeItem("credentials");
      dispatch(setUser.logout());
    },
  };
}
