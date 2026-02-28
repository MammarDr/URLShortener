import { HttpError } from "../../../shared/api/httpError.ts";
import validateEmail from "../utils/validateEmail.ts";
import validatePassword from "../utils/validatePassword.ts";
import { login as authLogin } from "../api/authApi.ts";

export default async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const errors = new Map<string, [string]>();

  if (!email || email === "") errors.set("Email", ["Input is empty."]);
  else if (!validateEmail(email)) errors.set("Email", ["Invalid format."]);
  if (!password || password === "") errors.set("Password", ["Input is empty."]);
  else if (!validatePassword(password))
    errors.set("Password", ["Must be 8 characters minimum."]);

  if (errors.size > 0)
    throw HttpError.UnprocessableEntity({
      body: { errors: Object.fromEntries(errors) },
    });

  return authLogin(email, password);
}
