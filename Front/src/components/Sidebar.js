import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="hidden lg:flex">
        <div className="top-0 left-0 w-[20vw] xl:w-[15vw] bg-gray-700 p-5 fixed h-full z-5 text-neutral-200 flex flex-col">

          <Link to="/dashboard">
            <h2 className="text-center mt-10 mb-16 text-2xl 2xl:text-3xl font-bold text-neutral-100 hover:text-sky-100 transition">Pair Programming</h2>
          </Link>

          <Link to="/rules">
            <div className="flex text-center align-middle justify-center border border-zinc-600 bg-slate-800 rounded-md my-7 hover:bg-slate-700 hover:border-zinc-400 transition">
              <h3 className="my-6 text-3xl font-semibold">Règles</h3>
            </div>
          </Link>

          <Link to="/terms">
            <div className="flex text-center align-middle justify-center border border-zinc-600 bg-slate-800 rounded-md my-7 hover:bg-slate-700 hover:border-zinc-400 transition">
              <h3 className="my-6 text-3xl font-semibold">Termes</h3>
            </div>
          </Link>

          <div className="flex-1 text-indigo-200 flex flex-col justify-end align-middle text-center">
            <div className="hover:text-indigo-50 transition">
              <a href="https://github.com/JulesDebeaumont/PairProgramming-CHU-Reims" target="_blank">
                <h4 className="text-2xl">Jules Debeaumont</h4>
                <h5>Voir sur GitHub</h5>
              </a>
            </div>
          </div>

        </div>
      </div>


      {/* Menu for small screen */}
      <div className="flex lg:hidden">
        {isOpen ? (
          <>
            <div className={`top-0 left-0 bg-gray-700 p-5 fixed w-full z-5 transition ease-in-out duration-300 ${isOpen ? "translate-y-0 " : "translate-y-full"}`}>

              <div className="flex justify-end">
                <div onClick={() => setIsOpen(!isOpen)}>close me</div>
              </div>

              <div className="flex text-center align-middle justify-center">
                <Link to="/rules">
                  <h3 className="my-6 text-4xl font-semibold text-neutral-200">Règles</h3>
                </Link>
              </div>

              <div className="flex text-center align-middle justify-center">
                <Link to="/terms">
                  <h3 className="my-6 text-4xl font-semibold text-neutral-200">Termes</h3>
                </Link>
              </div>

            </div>
          </>
        ) : (
          <div className="fixed top-0 left-0 p-3 flex justify-start">
            <div onClick={() => setIsOpen(!isOpen)}>open me</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
