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
  rulesEdit: PropTypes.array,
};


function RuleDisplay({ rule, toggleEdit, rulesEdit }) {
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
      <div className="py-10">

        {rulesEdit[rule.id] === true ? (
          <RuleForm rule={rule} toggleForm={toggleEdit} />
        ) : (
          <RuleInfo rule={rule} />
        )}

        <button type="button" onClick={() => toggleEdit(rule.id)}>{rulesEdit[rule.id] === true ? "Annuler" : "Editer"}</button>
        <button type="button" onClick={() => deleteTerm(rule.id)}>Supprimer</button>
      </div>
    </>
  );
}

export default RuleDisplay;
