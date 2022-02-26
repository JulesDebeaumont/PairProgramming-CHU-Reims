import { useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
// redux
import { putTerm, postTerm } from '../../redux/slices/term';
// hooks
import useTermTypes from '../../hooks/useTermTypes';


RuleForm.propTypes = {
  rule: PropTypes.object,
  toggleForm: PropTypes.func,
};


function RuleForm({ rule = {}, toggleForm = () => {} }) {
  const dispatch = useDispatch();
  const { termTypes } = useTermTypes();
  const { enqueueSnackbar } = useSnackbar();

  const TermSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis').min(2, 'Le nom est trop court.').max(255, 'Le nom est trop grand'),
    term_type_id: Yup.number().required('Le type est requis').positive().integer(),
  });

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      id: rule.id ?? '',
      name: rule.name ?? '',
      term_type_id: rule.term_type_id ?? '',
    },
    validationSchema: TermSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values.id === '') {
          await dispatch(postTerm(values));
          resetForm();
          setSubmitting(false);
          toggleForm();
          enqueueSnackbar('Nouveau terme créer', { variant: 'success' });
        } else {
          await dispatch(putTerm(values));
          resetForm();
          setSubmitting(false);
          toggleForm(rule.id);
          enqueueSnackbar('Changement effectué', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, handleSubmit, isSubmitting, handleChange } = formik;

  
  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Age.."
            onChange={handleChange}
            value={values.name}
          />
          {errors.name && (
            <div>{errors.name}</div>
          )}

          <select
            id="term_type_id"
            name="term_type_id"
            onChange={formik.handleChange}
            value={values.term_type_id}
          >
            <option hidden>-- Sélectionnez un type --</option>
            {Object.values(termTypes).map((termType) => (
              <option value={termType.id} key={termType.id}>
                {termType.name}
              </option>))}
          </select>
          {errors.term_type_id && (
            <div>{errors.term_type_id}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
          >Enregistrer</button>
        </Form>
      </FormikProvider>
    </>
  );
}

export default RuleForm;


