import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { getTerms, putTerm, editTerm } from '../redux/slices/term';
// hooks
import useTermTypes from '../hooks/useTermTypes';
// components

function Terms() {
  const dispatch = useDispatch();
  const { terms } = useSelector((state) => state.term);
  const [termsEdit, setTermsEdit] = useState([]);
  const { termTypes } = useTermTypes();

  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);

  function toggleEdit(id) {
    if (termsEdit[id] === false || !termsEdit[id]) {
      const termsEditCopy = [...termsEdit];
      termsEditCopy[id] = true;
      setTermsEdit(termsEditCopy);
    } else {
      dispatch(putTerm(terms[id]));
      const termsEditCopy = [...termsEdit];
      termsEditCopy[id] = false;
      setTermsEdit(termsEditCopy);
    }
  }

  const allTermTypesOption = Object.values(termTypes).map((termType) => (
      <option value={termType.id} key={termType.id}>
        {termType.name}
      </option>
  ));

  const allTerms = Object.values(terms).map((term) => (
    <div className="py-10" key={term.id}>

      {termsEdit[term.id] === true ? (
        <div>
          <input id="name" name="name" defaultValue={term.name} type="text" placeholder="Age.."
            onChange={(event) => {
              const copyTerm = { ...term };
              copyTerm.name = event.target.value;
              dispatch(editTerm(copyTerm))
            }} />

          <select id="term_type_id" name="term_type_id" defaultValue={term.term_type_id}
            onChange={(event) => {
              const copyTerm = { ...term };
              copyTerm.term_type_id = event.target.value;
              dispatch(editTerm(copyTerm))
            }}>
            <option hidden>-- Sélectionnez un type --</option>
            {allTermTypesOption}
          </select>

        </div>
      ) : (
        <div>
          <h3>{term.name}</h3>
          <h4>{term.type.name}</h4>
        </div>
      )}

      <button type="button" onClick={() => toggleEdit(term.id)}>{termsEdit[term.id] === true ? "Sauvegarder" : "Editer"}</button>
    </div>
  ));

  return (
    <>
      <div className="ml-3 mb-5">
        <div className="py-3 mb-6">
          <h2 className="text-3xl font-bold">Gestion des termes :</h2>
        </div>

        <div>
          {allTerms}
        </div>
        <button type="button">Ajouter un terme</button>
      </div>
    </>
  );
}

export default Terms;
