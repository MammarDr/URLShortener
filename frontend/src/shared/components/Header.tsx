import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/store/authSlice.ts";
import { type RootState } from "../../app/store.ts";
import LogoIcon from "./icons/Link";
import ProfileIcon from "./icons/Profile.tsx";
import GithubIcon from "./icons/Github.tsx";
import CreditCardIcon from "./icons/CreditCard.tsx";
import LogoutIcon from "./icons/Logout.tsx";

export default function Header() {
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.auth.accessToken);

  let section =
    jwt !== "" ? (
      <div className="relative group">
        <div className="p-2 glass rounded-full !border-2 hover:border-primary hover:transition-all hover:delay-100 cursor-pointer">
          <ProfileIcon size={26} className="fill-theme/80" />
        </div>

        <div className="opacity-0 invisible absolute top-full right-full z-20 p-2 w-40 glass text-theme text-sm rounded-lg shadow-xl group-hover:opacity-100 group-hover:visible delay-100 transition-all">
          <a
            href="https://github.com/MammarDr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2 gap-x-5 hover:bg-theme/5 cursor-pointer"
          >
            <GithubIcon size={16} />
            <span>Profile</span>
          </a>
          <div className="flex items-center p-2 gap-x-5 hover:bg-theme/5 cursor-pointer">
            <CreditCardIcon size={18} />
            <span>Billing</span>
          </div>
          <hr className="opacity-20 my-1" />
          <div
            className="flex items-center p-2 gap-x-5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            <LogoutIcon />
            <span className="text-red-600">Sign out</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex gap-x-5 text-sm items-center">
        <Link to={"auth/login"} className=" text-theme ">
          Login
        </Link>
        <Link
          to={"auth/signup"}
          className="bg-primary font-semibold text-stone-50 rounded-full px-6 py-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all"
        >
          Sign Up
        </Link>
      </div>
    );

  return (
    <header className="w-5/6 top-0 flex justify-between place-self-center py-6 z-40 border-b border-white/20 dark:border-slate-800/50 backdrop-blur-md">
      <Link to="/" className="flex gap-x-2 items-center">
        <span className="bg-primary rounded-xl p-2">
          <LogoIcon />
        </span>
        <h1 className="text-theme text-2xl font-bold tracking-tight">
          URLShortener
        </h1>
      </Link>
      {section}
    </header>
  );
}
