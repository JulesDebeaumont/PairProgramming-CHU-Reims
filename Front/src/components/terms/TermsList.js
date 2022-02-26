import { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getTerms } from '../../redux/slices/term';
// components
import TermForm from './TermForm';
import TermDisplay from './TermDisplay';


function TermsList() {
  const dispatch = useDispatch();
  const { terms } = useSelector((state) => state.term);
  const [termsEdit, setTermsEdit] = useState([]);
  const [newFormDisplay, setNewFormDisplay] = useState(false);

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

  function toggleNew() {
    setNewFormDisplay(!newFormDisplay);
  }

  
  return (
    <>
      <div className="ml-3 mb-5">
        <div className="py-3 mb-6">
          <h2 className="text-3xl font-bold">Gestion des termes :</h2>
        </div>

        <div>
          {newFormDisplay === true && (
            <TermForm toggleForm={toggleNew} />
          )}
          <div onClick={() => toggleNew()}>{newFormDisplay === true ? "Annuler" : "Ajouter"}</div>
        </div>

        <div>
          {Object.values(terms).map((term) => (
            <TermDisplay
              key={term.id}
              term={term}
              toggleEdit={toggleEdit}
              termsEdit={termsEdit}
            />
          ))}
        </div>

      </div>
    </>
  );
}

export default TermsList;
