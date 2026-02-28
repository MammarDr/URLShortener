import { HttpError } from "../../../shared/api/httpError.ts";
import validateEmail from "../utils/validateEmail.ts";
import validatePassword from "../utils/validatePassword.ts";
import { signup as authSignup } from "../api/authApi.ts";

export default async function signup({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const errors = new Map<string, string[]>();

  if (!email || email === "") errors.set("Email", ["Input is empty."]);
  else if (!validateEmail(email)) errors.set("Email", ["Invalid format."]);
  if (!password || password === "") errors.set("Password", ["Input is empty."]);
  else {
    if (!validatePassword(password))
      errors.set("Password", ["Must be 8 characters minimum."]);
    else {
      if (!confirmPassword || confirmPassword === "")
        errors.set("Confirmation Password", ["Input is empty."]);
      else if (!validatePassword(confirmPassword))
        errors.set("Confirmation Password", ["Must be 8 characters minimum."]);
      else if (password !== confirmPassword) {
        errors.set("No Match", ["Passwords don't match."]);
      }
    }
  }

  if (errors.size > 0)
    throw HttpError.UnprocessableEntity({
      body: { errors: Object.fromEntries(errors) },
    });

  return authSignup(email, password);
}
