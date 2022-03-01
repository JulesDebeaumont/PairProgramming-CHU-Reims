import { useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
// redux
import { putTerm, postTerm } from '../../redux/slices/term';
// hooks
import useTermTypes from '../../hooks/useTermTypes';
import LoadingSpin from '../general/LoadingSpin';


TermForm.propTypes = {
  term: PropTypes.object,
  submitForm: PropTypes.func,
};


function TermForm({ term, submitForm = () => { } }) {
  const dispatch = useDispatch();
  const { termTypes } = useTermTypes();
  const { enqueueSnackbar } = useSnackbar();

  const TermSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis').min(2, 'Le nom est trop court.').max(255, 'Le nom est trop grand'),
    term_type_id: Yup.number().required('Le type est requis').positive().integer(),
    input_type: Yup.string().min(2, "Le type de saisie est trop court").max(255, "Le type de saisie est trop grand")
  });

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      id: term?.id ?? '',
      name: term?.name ?? '',
      term_type_id: term?.term_type_id ?? '',
      input_type: term?.input_type ?? 'text',
    },
    validationSchema: TermSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values.id === '') {
          await dispatch(postTerm(values));
          resetForm();
          setSubmitting(false);
          enqueueSnackbar('Nouveau terme créer', { variant: 'success' });
          submitForm();
        } else {
          await dispatch(putTerm(values));
          resetForm();
          setSubmitting(false);
          enqueueSnackbar('Changement effectué', { variant: 'success' });
          submitForm(term.id);
        }
      } catch (error) {
        switch (error.message) {
          case "The name has already been taken.":
            enqueueSnackbar("Le nom est déjà pris.", { variant: 'warning' });
            break;

          default:
            enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
            break;
        }
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, handleSubmit, isSubmitting, handleChange } = formik;


  return (
    <div className="p-3 flex w-full justify-between">
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row flex-wrap align-middle justify-center">

            <div className="mx-1 my-1 sm:my-0">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nom.."
                onChange={handleChange}
                value={values.name}
              />
              {errors.name && (
                <div className="text-red-400">{errors.name}</div>
              )}
            </div>

            <div className="mx-1 my-1 sm:my-0">
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
                <div className="text-red-400">{errors.term_type_id}</div>
              )}
            </div>

            <div className="mx-1 my-1 sm:my-0">
              <input
                id="input_type"
                name="input_type"
                type="text"
                placeholder="Type pour saisie.."
                onChange={handleChange}
                value={values.input_type}
              />
              {errors.input_type && (
                <div className="text-red-400">{errors.input_type}</div>
              )}
            </div>

            <div className="flex justify-center my-1 sm:my-0">
              {isSubmitting === false ? (<button
                className="text-sky-300 mx-2 hover:text-sky-400 hover:scale-105 transition"
                type="submit"
              >
                Enregistrer
              </button>
              ) : (
                <button className="ml-5">
                  <LoadingSpin />
                </button>
              )}

              <button
                className="text-indigo-300 mx-2 hover:text-indigo-400 hover:scale-105 transition"
                type="button"
                onClick={() => submitForm(term?.id)}
              >
                Annuler
              </button>
            </div>

          </div>
        </Form>
      </FormikProvider>
    </div >
  );
}

export default TermForm;


