import type { ToastType } from "./toastSlice";
import { add } from "./toastSlice";
import store from "../../app/store";
import { HttpError } from "../api/httpError";

const DEFAULT_DURATION: number = 4000;

function show(
  title: string,
  message: string,
  type: ToastType,
  duration: number = DEFAULT_DURATION,
) {
  store.dispatch(
    add({
      title,
      message,
      type,
      duration,
    }),
  );
}

export const toast = {
  success: (title: string, message: string, duration?: number) =>
    show(title, message, "success", duration),
  error: (title: string, message: string, duration?: number) =>
    show(title, message, "error", duration),
  info: (title: string, message: string, duration?: number) =>
    show(title, message, "info", duration),
  alert: (title: string, message: string, duration?: number) =>
    show(title, message, "alert", duration),
};

export function displayError(
  error: Error | string,
  message: string = "Unexpected Error Occured, Try again.",
) {
  if (typeof error === "string") {
    toast.error(error, message);
  } else {
    if (!(error instanceof HttpError)) {
      toast.error("Client Side Failure", message);
      return;
    }

    if (error.status === 500) {
      toast.error("Internal Server Error", "Contact the admin.");
      return;
    }
    if (error.status === 401) {
      toast.error("Not Authenticated", "You Have To Be Logged In.");
      return;
    }

    if (error.status === 401) {
      toast.error("Forbidden", "No Enough Permissions.");
      return;
    }

    if (error.status === 422) {
      for (const type in error.body.errors) {
        error.body.errors[type].forEach((err: string) =>
          toast.error(type, err),
        );
      }
      return;
    }

    toast.error(error.body.title, error.body.detail ?? message);
  }
}
