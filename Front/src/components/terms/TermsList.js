import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getTerms, removeTerm } from '../../redux/slices/term';
// components
import TermForm from './TermForm';
import TermDisplay from './TermDisplay';
import Modal from '../general/Modal';


function TermsList() {
  const dispatch = useDispatch();
  const { terms } = useSelector((state) => state.term);
  const { isLoading } = useSelector((state) => state.term);
  const [termsEdit, setTermsEdit] = useState([]);
  const [newFormDisplay, setNewFormDisplay] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);

  function toggleEdit(id) {
    if (termsEdit[id] === false || !termsEdit[id]) {
      const termsEditCopy = [...termsEdit];
      termsEditCopy[id] = true;
      setTermsEdit(termsEditCopy);
    } else {
      const termsEditCopy = [...termsEdit];
      termsEditCopy[id] = false;
      setTermsEdit(termsEditCopy);
    }
  }

  const deleteTerm = async (id) => {
    try {
      await dispatch(removeTerm(id));
      enqueueSnackbar('Terme supprimé', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar("Une erreur est survenue", { variant: 'error' });
      console.error(error);
    }
  };

  function toggleNew() {
    setNewFormDisplay(!newFormDisplay);
  }

  return (
    <>
      {selectedForDelete !== null && (
        <>
          <Modal
            message="Voulez vous vraiment supprimer ce terme ?"
            onSubmit={() => {
              deleteTerm(selectedForDelete);
              setSelectedForDelete(null)
            }}
            onClose={() => setSelectedForDelete(null)}
          />
        </>
      )}
      <div className="sm:mx-3 mb-5">
        <div className="py-3 mb-6">
          <h2 className="text-3xl font-bold text-center sm:text-left">Liste des termes</h2>
        </div>

        <div className="flex mb-8 sm:ml-3 justify-center sm:justify-start text-center sm:text-left">
          {newFormDisplay === true && (
            <div className="flex flex-col py-5 mb-10">
              <div className="text-xl sm:ml-4">Nouveau terme</div>
              <TermForm toggleForm={toggleNew} />
            </div>
          )}
          <div onClick={() => toggleNew()}>{newFormDisplay === false && (
            <div className="flex hover:text-blue-200 text-blue-300 transition hover:scale-105 text-lg cursor-pointer">
              <span className="material-icons mt-0.5">
                add
              </span>
              Ajouter un terme
            </div>
          )}</div>
        </div>

        <div className="flex flex-col">
          {Object.values(terms).map((term) => (
            <TermDisplay
              key={term.id}
              term={term}
              toggleEdit={toggleEdit}
              termsEdit={termsEdit}
              setSelectedForDelete={setSelectedForDelete}
            />
          ))}
        </div>

        <div>
          {Object.values(terms).length == 0 && isLoading == false && (
            <div className="text-lg text-center sm:text-left sm:ml-5">
              <span>
                Aucun terme
              </span>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default TermsList;
