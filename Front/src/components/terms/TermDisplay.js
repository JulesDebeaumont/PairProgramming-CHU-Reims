import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch } from 'react-redux';
import { removeTerm } from '../../redux/slices/term';
// components
import TermInfo from './TermInfo';
import TermForm from './TermForm';


TermDisplay.propTypes = {
  term: PropTypes.object,
  toggleEdit: PropTypes.func,
  termsEdit: PropTypes.array,
};


function TermDisplay({ term, toggleEdit, termsEdit }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const deleteTerm = async (id) => {
    try {
      await dispatch(removeTerm(id));
      enqueueSnackbar('Terme supprimé', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar("Une erreur est survenue", { variant: 'error' });
      console.error(error);
    }
  };

  
  return (
    <>
      <div className="py-10" key={term.id}>

        {termsEdit[term.id] === true ? (
          <TermForm term={term} toggleForm={toggleEdit} />
        ) : (
          <TermInfo term={term} />
        )}

        <button type="button" onClick={() => toggleEdit(term.id)}>{termsEdit[term.id] === true ? "Annuler" : "Editer"}</button>
        <button type="button" onClick={() => deleteTerm(term.id)}>Supprimer</button>
      </div>
    </>
  );
}

export default TermDisplay;
