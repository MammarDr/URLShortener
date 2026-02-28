import { useMutation } from "@tanstack/react-query";
import Input from "../../../shared/components/Input.tsx";
import ProfileIcon from "../../../shared/components/icons/Profile.tsx";
import { useNavigate, Link } from "react-router-dom";
import signup from "../services/signup.ts";
import { toast } from "../../../shared/toast/toasts";
import { HttpError } from "../../../shared/api/httpError.ts";
import login from "../services/login.ts";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.ts";
export default function UserForm({ type }: { type: "login" | "signup" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      toast.success("Login Succesfull !", "Welcome back");
      dispatch(authLogin(response.data));
      navigate("/", { state: { refresh: Date.now() } });
    },
    onError: (e: any) => handleError(e),
  });
  const registerMutation = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      toast.success("Account created", "Enjoy our website!");
      dispatch(authLogin(response.data));
      navigate("/", { state: { refresh: Date.now() } });
    },
    onError: (e: any) => handleError(e),
  });

  function handleError(e: any) {
    if (!(e instanceof HttpError)) {
      toast.error("Unexpected Error", "Try again later");
      return;
    }

    if (e.status === 500)
      toast.error("Internal Server Error", "Contact the admin.");
    else if (e.status === 422) {
      for (const type in e.body.errors) {
        e.body.errors[type].forEach((err: string) => toast.error(type, err));
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (type === "login") {
      loginMutation.mutate({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
    } else {
      registerMutation.mutate({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirm-password") as string,
      });
    }
  }

  const title = type === "login" ? "Login Account" : "Create Account";
  const guide = (
    <span className="m-auto mt-4 text-sm text-theme/80 dark:text-theme/60">
      {type === "login" ? "Alread have an account" : "Don't have an account ?"}
      <Link
        to={type === "login" ? "../signup" : "../login"}
        className="text-primary [text-shadow:0_0_black] ml-1.5"
      >
        {type === "login" ? "Signup" : "Login"}
      </Link>
    </span>
  );

  return (
    <div
      className="w-[400px] p-10 glass rounded-xl shadow-lg "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-2">
          <span className=" bg-primary p-2 rounded-xl">
            {type === "login" ? (
              <ProfileIcon className="fill-white" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                height="20px"
                width="20px"
                className="fill-white"
              >
                <path d="M708-432v-84h-84v-72h84v-84h72v84h84v72h-84v84h-72Zm-426-90q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42ZM96-192v-92q0-25.78 12.5-47.39T143-366q55-32 116-49t125-17q64 0 125 17t116 49q22 13 34.5 34.61T672-284v92H96Zm72-72h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14.5T179-304q-4.95 2.94-7.98 8.24Q168-290.47 168-284v20Zm267-309.21q21-21.21 21-51T434.79-675q-21.21-21-51-21T333-674.79q-21 21.21-21 51T333.21-573q21.21 21 51 21T435-573.21ZM384-625Zm0 361Z" />
              </svg>
            )}
          </span>
          <h1 className="text-xl font-bold  text-theme tracking-tight">
            {title}
          </h1>
        </div>
        <svg
          viewBox="0 -960 960 960"
          height="20px"
          width="20px"
          className="cursor-pointer fill-theme"
          onClick={() => navigate("../..")}
        >
          <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
        </svg>
      </div>

      <div className="flex justify-evenly glass rounded-xl p-1 mb-8 shadow-lg">
        <button
          onClick={() => navigate("../login")}
          className={`rounded-xl w-1/2 p-1 hover:transition-colors ${
            type === "login"
              ? "bg-primary text-white font-bold"
              : "text-theme/80 hover:text-theme/100"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("../signup")}
          className={`rounded-xl w-1/2 p-1 hover:transition-colors ${
            type === "signup"
              ? "bg-primary text-white font-bold"
              : "text-theme/80 hover:text-theme/100"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <Input
          displayName="EMAIL ADDRESS"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          svg={
            <svg>
              <path
                d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480.5q0-79.5 30-149t82.5-122Q261-804 331-834t149.5-30q79.5 0 149 30t122 82.5Q804-699 834-629.5T864-480v60q0 55-38.5 93.5T732-288q-34 0-62.5-17T621-350q-28 29-64.5 45.5T480-288q-80 0-136-56t-56-136q0-80 56-136t136-56q80 0 136 56
                t56 136v60q0 25 17.5 42.5T732-360q25 0 42.5-17.5T792-420v-60q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91h192v72H480Zm85-299q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Z"
              />
            </svg>
          }
        />
        <Input
          displayName="PASSWORD"
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="off"
          svg={
            <svg>
              <path d="M263.72-96Q234-96 213-117.15T192-168v-384q0-29.7 21.15-50.85Q234.3-624 264-624h24v-96q0-79.68 56.23-135.84 56.22-56.16 136-56.16Q560-912 616-855.84q56 56.16 56 135.84v96h24q29.7 0 50.85 21.15Q768-581.7 768-552v384q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72Zm.28-72h432v-384H264v384Zm267-141.21q21-21.21 21-51T530.79-411q-21.21-21-51-21T429-410.79q-21 21.21-21 51T429.21-309q21.21 21 51 21T531-309.21ZM360-624h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456v-384 384Z" />
            </svg>
          }
        />
        {type === "signup" && (
          <Input
            displayName="CONFIRM PASSWORD"
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="••••••••"
            autoComplete="off"
            svg={
              <svg>
                <path d="M263.72-96Q234-96 213-117.15T192-168v-384q0-29.7 21.15-50.85Q234.3-624 264-624h24v-96q0-79.68 56.23-135.84 56.22-56.16 136-56.16Q560-912 616-855.84q56 56.16 56 135.84v96h24q29.7 0 50.85 21.15Q768-581.7 768-552v384q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72Zm.28-72h432v-384H264v384Zm267-141.21q21-21.21 21-51T530.79-411q-21.21-21-51-21T429-410.79q-21 21.21-21 51T429.21-309q21.21 21 51 21T531-309.21ZM360-624h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456v-384 384Z" />
              </svg>
            }
          />
        )}

        <input
          type="submit"
          value={type === "login" ? "Login" : "Signup"}
          className="w-1/2 p-2 mx-auto mt-5 bg-primary text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all cursor-pointer"
        />
        {guide}
      </form>
    </div>
  );
}
