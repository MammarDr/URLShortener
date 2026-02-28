import Link from "../../../shared/components/icons/Link";

export default function URLEditor() {
  return (
    <div className="absolute top-0 right-0 z-50 w-[500px] h-full glass flex flex-col overflow-y-auto">
      <div className="flex flex-col text-theme p-8 space-y-8">
        <div className="flex items-center justify-between border-b-theme/5 border-b-2 pb-4">
          <div className="flex gap-6">
            <h1 className="text-xl font-bold tracking-wide">Edit Link</h1>
            <div className="flex items-center gap-2 bg-orange-100 border border-primary rounded-xl px-3">
              <span className="animate-pulse size-2 bg-primary rounded-full"></span>
              <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                Active
              </span>
            </div>
          </div>
          <svg
            viewBox="0 -960 960 960"
            height="26px"
            width="26px"
            className="cursor-pointer fill-theme"
            onClick={() => null}
          >
            <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
          </svg>
        </div>

        <div className="space-y-4 p-2">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="block w-1.5 h-4 bg-primary rounded-full"></span>
              <h3 className="text-base font-bold tracking-wider">BASIC INFO</h3>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div
                className="border relative w-12 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 dark:bg-gray-600 peer-checked:bg-orange-500
    after:content-[''] after:absolute after:top-[3px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-transform after:duration-200 peer-checked:after:translate-x-5 peer-checked:after:border-white"
              ></div>
            </label>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="text-sm text-theme/60 font-bold"
              >
                LINK TITLE
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  value={"Url Shortener"}
                  spellCheck={false}
                  autoCorrect="off"
                  autoComplete="off"
                  className="w-full glass py-2 px-4 font-medium tracking-tight focus:border-primary focus:ring-primary rounded-lg shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="" className="text-sm text-theme/60 font-bold">
                CUSTOM ALIAS
              </label>
              <div className="rounded-lg flex mt-1">
                <div className="px-3 text-center content-center bg-primary dark:bg-primary/75 text-orange-50 tracking-wider font-medium rounded-tl-lg rounded-bl-lg">
                  link.sh/
                </div>
                <input
                  type="text"
                  className="w-full glass py-2.5 px-2.5 text-sm font-semibold rounded-tr-lg rounded-br-lg focus:border-primary focus:ring-primary shadow-sm"
                  spellCheck={false}
                  autoCorrect="off"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="source"
                className="text-sm text-theme/60 font-bold"
              >
                DESTINATION URL
              </label>
              <div className="flex items-center mt-1">
                <input
                  type="text"
                  placeholder="Insert Url..."
                  name="source"
                  autoComplete="off"
                  spellCheck={false}
                  autoCorrect="off"
                  className="w-full glass py-2 pl-12 font-mono tracking-tight rounded-lg placeholder:text-inherit/20 focus:border-primary focus:ring-primary shadow-sm relative"
                />
                <Link
                  size={20}
                  className="absolute left-[3.25rem] fill-theme/60 pointer-events-none"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="space-y-4 p-2">
          <div className="flex gap-3 items-center">
            <span className="block w-1.5 h-4 bg-primary rounded-full"></span>
            <h3 className="text-base font-bold tracking-wider">
              LINK ANALYTICS
            </h3>
          </div>
          <div className="glass rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center px-4">
              <div>
                <p className="text-xs font-medium mb-1">Total Clicks</p>
                <p className="text-3xl font-bold tracking-tight">12,842</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="24px"
                height="24px"
                className="fill-theme"
              >
                <path d="M80-480v-80h120v80H80Zm136 222-56-58 84-84 58 56-86 86Zm28-382-84-84 56-58 86 86-58 56Zm476 480L530-350l-50 150-120-400 400 120-148 52 188 188-80 80ZM400-720v-120h80v120h-80Zm236 80-58-56 86-86 56 56-84 86Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-2">
          <div className="flex gap-3 items-center">
            <span className="block w-1.5 h-4 bg-primary rounded-full"></span>
            <h3 className="text-base font-bold tracking-wider">TIME LINE</h3>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-theme/20">
            <h3 className="text-sm text-theme/60 font-bold">Create At</h3>
            <span className="text-sm font-extrabold">Aug 24,2024</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-theme/20">
            <h3 className="text-sm text-theme/60 font-bold">Last Modified</h3>
            <span className="text-sm font-extrabold">2 hours ago</span>
          </div>
          <div>
            <h3 className="text-sm text-theme/60 font-bold mb-4">Expires At</h3>
            <input
              type="date"
              name=""
              id=""
              className="w-full glass py-4 px-6 rounded-lg focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-center rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-100/5 dark:hover:bg-red-100/10 relative">
          <button className="w-full py-4 text-red-400 hover:text-red-600 dark:text-[rgba(240,34,126,0.8)]  dark:hover:text-[rgba(240,34,126,1)]  peer">
            Remove
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="absolute left-[38%] -translate-x-1/2 fill-red-500/60 dark:fill-pink-600/80 opacity-75 peer-hover:opacity-100 peer-hover:fill-red-500 dark:peer-hover:fill-pink-600"
          >
            <path d="M600-240v-80h160v80H600Zm0-320v-80h280v80H600Zm0 160v-80h240v80H600ZM120-640H80v-80h160v-60h160v60h160v80h-40v360q0 33-23.5 56.5T440-200H200q-33 0-56.5-23.5T120-280v-360Zm80 0v360h240v-360H200Zm0 0v360-360Z" />
          </svg>
        </div>
      </div>
      <div className="flex py-16 px-8 gap-4 bg-theme/5 mt-auto shadow-inner">
        <button className="w-full rounded-md bg-primary text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all delay-75">
          Save Changes
        </button>
        <button className="px-10 py-3 text-theme rounded-md glass shadow-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
