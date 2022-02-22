import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="hidden sm:flex">
        <div className="top-0 left-0 w-[20vw] bg-indigo-900 p-10 fixed h-full z-5">

          <div className="flex text-center align-middle justify-center">
            <Link to="/">
              <h3 className="my-8 text-4xl font-semibold text-slate-200">I am a sidebar</h3>
            </Link>          </div>

          <div className="flex text-center align-middle justify-center">
            <Link to="/">
              <h3 className="my-8 text-4xl font-semibold text-slate-200">I am a sidebar</h3>
            </Link>          </div>

          <div className="flex text-center align-middle justify-center">
            <Link to="/">
              <h3 className="my-8 text-4xl font-semibold text-slate-200">I am a sidebar</h3>
            </Link>          </div>

          <div className="flex text-center align-middle justify-center">
            <Link to="/">
              <h3 className="my-8 text-4xl font-semibold text-slate-200">I am a sidebar</h3>
            </Link>
          </div>

        </div>
      </div>


      {/* Menu for small screen */}
      <div className="flex sm:hidden">
        {isOpen ? (
          <>
            <div className={`top-0 left-0 bg-indigo-900 p-5 fixed w-full z-5 transition ease-in-out duration-300 ${isOpen ? "translate-y-0 " : "translate-y-full"}`}>

              <div className="flex justify-end">
                <div onClick={() => setIsOpen(!isOpen)}>close me</div>
              </div>

              <div className="flex text-center align-middle justify-center">
                <Link to="/">
                  <h3 className="my-8 text-4xl font-semibold text-slate-200">I am a sidebar</h3>
                </Link>
              </div>

              <div className="flex text-center align-middle justify-center">
                <Link to="/">
                  <h3 className="my-8 text-4xl font-semibold text-slate-200">I am a sidebar</h3>
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
