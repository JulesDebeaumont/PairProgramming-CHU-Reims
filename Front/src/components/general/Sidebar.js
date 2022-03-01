import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="hidden lg:flex">
        <div className="top-0 left-0 w-[20vw] xl:w-[15vw] bg-[#2f3747] p-5 fixed h-full z-5 text-neutral-200 flex flex-col shadow-2xl">

          <Link to="/dashboard">
            <h2 className="text-center mt-10 mb-16 text-2xl 2xl:text-3xl font-bold text-neutral-100 hover:text-slate-50 transition">Pair Programming</h2>
          </Link>

          <div className="flex text-center align-middle justify-center border-y border-slate-600 hover:bg-[#474d61] hover:text-slate-50 rounded transition">
            <Link to="/dashboard">
              <h3 className=" text-3xl font-semibold flex justify-center align-middle py-6">
                <span className="material-icons md-30 mt-1 mr-3">
                  description
                </span>
                Énoncé
              </h3>
            </Link>
          </div>

          <div className="flex text-center align-middle justify-center border-y border-slate-600 hover:bg-[#474d61] hover:text-slate-50 rounded transition">
            <Link to="/terms">
              <h3 className=" text-3xl font-semibold flex justify-center align-middle py-6">
                <span className="material-icons md-30 mt-1 mr-3">
                  dns
                </span>
                Termes
              </h3>
            </Link>
          </div>

          <div className="flex text-center align-middle justify-center border-y border-slate-600 hover:bg-[#474d61] hover:text-slate-50 rounded transition">
            <Link to="/rules">
              <h3 className=" text-3xl font-semibold flex justify-center align-middle py-6">
                <span className="material-icons md-30 mt-1 mr-3">
                  format_align_left
                </span>
                Règles
              </h3>
            </Link>
          </div>

          <div className="flex-1 text-indigo-200 flex flex-col justify-end align-middle text-center">
            <div className="hover:text-indigo-100 transition">
              <a href="https://github.com/JulesDebeaumont/PairProgramming-CHU-Reims" target="_blank" rel="noreferrer">
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
            <div className={`border-collapse text-neutral-200 top-0 left-0 bg-[#2f3747] p-5 pb-10 fixed w-full z-5 transition ease-in-out duration-300`}>

              <div className="mb-10 flex justify-between">

                <div className="text-xl font-semibold">Menu</div>

                <div className="flex justify-end">
                  <div onClick={() => setIsOpen(!isOpen)}>
                    <span className="material-icons md-36 text-neutral-100">
                      close
                    </span>
                  </div>
                </div>

              </div>

              <div
                className="flex text-center align-middle justify-center border-y border-slate-600 hover:bg-[#474d61 rounded transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Link to="/dashboard" className="w-full">
                  <h3 className=" text-3xl font-semibold flex justify-center align-middle py-6">
                    <span className="material-icons md-30 mt-1 mr-3">
                      description
                    </span>
                    Énoncé
                  </h3>
                </Link>
              </div>

              <div
                className="flex text-center align-middle justify-center border-y border-slate-600 hover:bg-[#474d61 rounded transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Link to="/terms" className="w-full">
                  <h3 className=" text-3xl font-semibold flex justify-center align-middle py-6">
                    <span className="material-icons md-30 mt-1 mr-3">
                      dns
                    </span>
                    Termes
                  </h3>
                </Link>
              </div>

              <div
                className="flex text-center align-middle justify-center border-y border-slate-600 hover:bg-[#474d61 rounded transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Link to="/rules" className="w-full">
                  <h3 className=" text-3xl font-semibold flex justify-center align-middle py-6">
                    <span className="material-icons md-30 mt-1 mr-3">
                      format_align_left
                    </span>
                    Règles
                  </h3>
                </Link>
              </div>

            </div>
          </>
        ) : (
          <div className="fixed top-0 left-0 p-3 flex justify-start">
            <div onClick={() => setIsOpen(!isOpen)}>
              <span className="material-icons md-36 text-neutral-100">
                menu
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
