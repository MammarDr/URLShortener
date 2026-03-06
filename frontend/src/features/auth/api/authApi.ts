import { apiClient } from "../../../shared/api/apiClient";
export async function signup(email: string, password: string) {
  return apiClient(
    "v1/User/SignUp",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        planId: 1,
        roleId: 1,
      }),
    },
    false,
  );
}
export async function login(email: string, password: string) {
  return apiClient(
    "v1/User/Login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    },
    false,
  );
}
