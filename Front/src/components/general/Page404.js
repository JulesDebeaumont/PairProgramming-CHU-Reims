import { Link } from "react-router-dom";

function Page404() {
  return (
    <>
      <div className="top-0 left-0 lg:ml-[20vw] xl:ml-[15vw] lg:pr-[20vw] xl:pr-[15vw] py-60 w-screen min-h-screen flex justify-center bg-[#00000090] z-5 fixed text-3xl">
        <div className="flex flex-col">
          <div>404 Page not found 🔥</div>
          <div className="text-xl text-indigo-300 text-center mt-3">
            <Link to="/dashboard">Retour à l'énoncé</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;