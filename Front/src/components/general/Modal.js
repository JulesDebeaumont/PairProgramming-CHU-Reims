import PropTypes from 'prop-types';

Modal.propTypes = {
  message: PropTypes.string,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

function Modal({ message, submitText = "Supprimer", onSubmit, onClose }) {
  return (
    <>
      <div className="top-0 left-0 lg:ml-[20vw] xl:ml-[15vw] lg:pr-[20vw] xl:pr-[15vw] py-60 w-screen min-h-screen flex justify-center bg-[#00000090] z-5 fixed"
        onClick={() => onClose()}>
        <div className="flex flex-col h-min justify-center bg-slate-800 p-5 rounded shadow-xl z-10">

          <div className="py-3 flex flex-grow-0 justify-center align-middle text-center">
            {message}
          </div>

          <div className="flex justify-center">
            <div className="flex justify-self-end my-1 sm:my-0">
              <button
                type="button"
                className="text-indigo-300 mx-2 hover:text-indigo-400 hover:scale-105 transition"
                onClick={() => onClose()}
              >
                Annuler
              </button>

              <button
                type="button"
                className="text-purple-300 mx-2 hover:text-purple-400 hover:scale-105 transition"
                onClick={() => onSubmit()}
              >
                {submitText}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Modal;