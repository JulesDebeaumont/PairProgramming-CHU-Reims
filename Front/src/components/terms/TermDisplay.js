import PropTypes from 'prop-types';
// components
import TermInfo from './TermInfo';
import TermForm from './TermForm';


TermDisplay.propTypes = {
  term: PropTypes.object,
  toggleEdit: PropTypes.func,
  termsEdit: PropTypes.array,
  setSelectedForDelete: PropTypes.func,
};


function TermDisplay({ term, toggleEdit, termsEdit, setSelectedForDelete }) {
  return (
    <>
      <div className="hover:bg-slate-800 bg-slate-900 p-3 border-y border-slate-800 rounded flex w-full justify-between">

        <div>
          {termsEdit[term.id] === true ? (
            <TermForm term={term} submitForm={toggleEdit} />
          ) : (
            <TermInfo term={term} />
          )}
        </div>

        <div className="flex">
          <button
            className="text-indigo-300 mx-1 hover:text-indigo-400 transition hover:scale-125"
            type="button"
            onClick={() => toggleEdit(term.id)}>{termsEdit[term.id] === true ? null : (
              <div className="flex">
                <span className="material-icons">
                  edit
                </span>
              </div>
            )}
          </button>
          <button
            className="text-purple-300 mx-1 hover:text-purple-400 transition hover:scale-125"
            type="button"
            onClick={() => setSelectedForDelete(term.id)}>
            <div className="flex">
              <span className="material-icons">
                delete
              </span>
            </div>
          </button>
        </div>

      </div>
    </>
  );
}

export default TermDisplay;
