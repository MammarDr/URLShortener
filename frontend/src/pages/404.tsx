import { useNavigate } from "react-router-dom";
import Edit from "../shared/components/icons/Edit";
import Github from "../shared/components/icons/Github";
import Link from "../shared/components/icons/Link";
import Linkoff from "../shared/components/icons/Linkoff";
import Next from "../shared/components/icons/Next";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main className="relative my-auto pt-12 flex flex-col items-center justify-center text-center">
      <div className="relative animate-[float_6s_ease-in-out_infinite]">
        <div className="glass rounded-[3rem] backdrop-blur-xl mb-4 p-8 shadow-xl space-y-4">
          <Linkoff size={120} className="fill-primary/20" />
        </div>
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute top-20 left-12 w-12 h-12 bg-primary/20 rounded-full blur-xl"></div>
      </div>

      <h1 className="text-9xl font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-orange-500 to-pink-600 drop-shadow-sm">
        404
      </h1>
      <div className="w-[75%]">
        <h2 className="text-2xl my-4 text-theme">
          Ooops! This link seems to be lost.
        </h2>
        <p className="text-xl text-theme/60">
          We're really sorry, but the page you're looking for has either moved
          to a new home or never existed in the first place.
        </p>
      </div>
      <div className="flex gap-8 mt-10 font-bold">
        <button
          className="flex items-center gap-x-2 px-10 py-3 text-theme rounded-md glass shadow-md"
          onClick={() => window.location.reload()}
        >
          <svg
            viewBox="0 -960 960 960"
            height="24px"
            width="24px"
            className="fill-theme"
          >
            <path d="M480-192q-120 0-204-84t-84-204q0-120 84-204t204-84q65 0 120.5 27t95.5 72v-99h72v240H528v-72h131q-29-44-76-70t-103-26q-90 0-153 63t-63 153q0 90 63 153t153 63q84 0 144-55.5T693-456h74q-9 112-91 188t-196 76Z" />
          </svg>
          Try Again
        </button>
        <button
          className="flex items-center gap-x-2 px-10 py-3 rounded-md scale-95 bg-primary text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-100 transition-all delay-75"
          onClick={() => navigate("/")}
        >
          <svg
            viewBox="0 -960 960 960"
            height="24px"
            width="24px"
            className="fill-white"
          >
            <path d="M264-216h96v-240h240v240h96v-348L480-726 264-564v348Zm-72 72v-456l288-216 288 216v456H528v-240h-96v240H192Zm288-327Z" />
          </svg>
          Go To Homepage
        </button>
      </div>
      <div>
        <div className="absolute rotate-[20deg] bottom-[450px] left-80 blur-[1px]">
          <Link className="fill-primary/20" />
        </div>
        <div className="absolute rotate-45 bottom-[50px] right-[350px] blur-[1px]">
          <Github className="fill-primary/20" />
        </div>
        <div className="absolute rotate-[20deg] bottom-[-50px] left-80 blur-[1px]">
          <Edit className="fill-primary/20" onClick={() => {}} size={25} />
        </div>
        <div className="absolute rotate-[75deg] top-[50px] right-[650px] blur-[1px]">
          <Next className="fill-primary/20" size={35} />
        </div>
      </div>
    </main>
  );
}
