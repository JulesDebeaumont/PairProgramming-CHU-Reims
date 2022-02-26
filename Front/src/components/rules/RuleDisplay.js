import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch } from 'react-redux';
import { removeTerm } from '../../redux/slices/term';
// components
import RuleInfo from './RuleInfo';
import RuleForm from './RuleForm';


RuleDisplay.propTypes = {
  rule: PropTypes.object,
  toggleEdit: PropTypes.func,
  termsEdit: PropTypes.array,
};


function RuleDisplay({ rule, toggleEdit, termsEdit }) {
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
      <div className="py-10" key={rule.id}>

        {termsEdit[rule.id] === true ? (
          <RuleForm term={rule} toggleForm={toggleEdit} />
        ) : (
          <RuleInfo term={rule} />
        )}

        <button type="button" onClick={() => toggleEdit(rule.id)}>{termsEdit[rule.id] === true ? "Annuler" : "Editer"}</button>
        <button type="button" onClick={() => deleteTerm(rule.id)}>Supprimer</button>
      </div>
    </>
  );
}

export default RuleDisplay;
