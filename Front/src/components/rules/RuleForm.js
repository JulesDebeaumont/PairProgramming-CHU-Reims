import { useEffect } from 'react';
import { Form, FormikProvider, FieldArray, Field, useFormik, getIn } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { putRule, postRule } from '../../redux/slices/rule';
import { getTerms } from '../../redux/slices/term';
// hooks
import useOperators from '../../hooks/useOperators';


RuleForm.propTypes = {
  rule: PropTypes.object,
  submitForm: PropTypes.func,
};


function RuleForm({ rule, submitForm = () => { } }) {
  const dispatch = useDispatch();
  const { comparisonOperators, logicalOperators } = useOperators();
  const { terms } = useSelector((state) => state.term);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);

  const RuleSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Le nom est trop court.').max(255, 'Le nom est trop grand'),
    sub_rules: Yup.array().required('Au moins une règle est requise').min(1, 'Au moins une règle est requise')
      .of(
        Yup.object().shape({
          pivot: Yup.object().required().shape({
            operator_id: Yup.number().required("L'opérateur est requis").positive().integer(),
          }),
          criterias: Yup.array().required('Au moins un critère est requis par règle').min(1, 'Au moins un critère est requis par règle')
            .of(
              Yup.object().shape({
                pivot: Yup.object().required().shape({
                  operator_id: Yup.number().required("L'opérateur est requis").positive().integer(),
                }),
                term_id: Yup.number().required('Le terme est requis').positive().integer(),
                operator_id: Yup.number().required("L'opérateur est requis").positive().integer(),
                value: Yup.string().required('La valeur est requise').min(1, 'La valeur est trop courte').max(255, 'La valeur est trop longue'),
              }),
            ),
        }),
      )
  });

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: rule ?? {
      id: null,
      name: '',
      sub_rules: [{
        0: {
          pivot: {
            operator_id: '1',
          }
        }
      }]
    },
    validationSchema: RuleSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      try {
        if (values.id === null) {
          await dispatch(postRule(values));
          resetForm();
          setSubmitting(false);
          enqueueSnackbar('Nouvelle règle créer', { variant: 'success' });
          submitForm();
        } else {
          await dispatch(putRule(values));
          resetForm();
          setSubmitting(false);
          enqueueSnackbar('Changement effectué', { variant: 'success' });
          submitForm(rule.id);
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

  const defaultCriteria = {
    pivot: {
      operator_id: '1',
    },
    term_id: '',
    operator_id: '',
    value: '',
  };

  const defaultRule = {
    pivot: {
      operator_id: '1',
    },
  };

  const ErrorMessage = ({ name }) => (
    <Field
      name={name}
    >
      {({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? (
          <div className="text-red-400">{error}</div>
        ) : null;
      }}
    </Field>
  );

  return (
    <div className="p-3 flex w-full justify-center align-middle">
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col flex-wrap align-middle justify-center">

            <div className="mb-2 py-5 border-b border-slate-600 text-center sm:text-left">
              <label>Nom (facultatif) : </label>
              <Field
                className="w-full"
                name={`name`}
                type="text"
                placeholder="Nom.."
              />
              <ErrorMessage name={`name`} />
            </div>

            <FieldArray
              name={`sub_rules`}
              render={arrayHelpers => (
                <>
                  <div className="mb-2 py-5 border-b border-slate-600 flex flex-col justify-center align-middle">
                    {values.sub_rules && values.sub_rules.length > 0 ? (
                      values.sub_rules.map((rule, index) => (
                        <div key={index}>

                          <div className="flex flex-row sm:hover:bg-slate-800 next px-4 mb-5 rounded">
                            {index > 0 && (
                              <div className="py-4 w-full">
                                <Field
                                  as="select"
                                  name={`sub_rules[${index}].pivot.operator_id`}
                                  className="w-full"
                                >
                                  <option hidden value=''>
                                    -- Sélectionnez un opérateur --
                                  </option>
                                  {Object.values(logicalOperators).map((operator) => (
                                    <option value={operator.id} key={operator.id}>
                                      {operator.value}
                                    </option>))}
                                </Field>
                                <ErrorMessage name={`sub_rules[${index}].pivot.operator_id`} />
                              </div>
                            )}

                            {values.sub_rules.length > 1 && index > 0 ? (
                              <div className="ml-10 pr-20 flex justify-center align-middle">
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <div className="flex hover:text-purple-200 text-purple-300 transition hover:scale-105 cursor-pointer">
                                    <span className="material-icons">
                                      remove
                                    </span>
                                  </div>
                                </button>
                              </div>
                            ) : null}
                          </div>

                          <FieldArray
                            name={`sub_rules[${index}].criterias`}
                            render={criterasArrayHelpers => (
                              <div className="ml-10 flex flex-col justify-center align-middle subNext">
                                {values.sub_rules[index].criterias && values.sub_rules[index].criterias.length > 0 ? (
                                  values.sub_rules[index].criterias.map((criteria, subIndex) => (
                                    <div key={`${index}.${subIndex}`}>
                                      <div className="flex sm:hover:bg-slate-800 p-2 rounded" >

                                        <div>
                                          {subIndex > 0 && (
                                            <div className="mb-4">
                                              <Field
                                                as="select"
                                                name={`sub_rules[${index}].criterias[${subIndex}].pivot.operator_id`}
                                                className="w-full"
                                              >
                                                <option hidden value=''>
                                                  -- Sélectionnez un opérateur --
                                                </option>
                                                {Object.values(logicalOperators).map((operator) => (
                                                  <option value={operator.id} key={operator.id}>
                                                    {operator.value}
                                                  </option>))}
                                              </Field>
                                              <ErrorMessage name={`sub_rules[${index}].criterias[${subIndex}].pivot.operator_id`} />
                                            </div>
                                          )}

                                          <div className="ml-10 flex flex-col w-full justify-center align-middle">
                                            <div className="mx-1 my-1 sm:my-0 w-full">
                                              <Field
                                                as="select"
                                                name={`sub_rules[${index}].criterias[${subIndex}].term_id`}
                                                className="w-full"
                                              >
                                                <option hidden value=''>
                                                  -- Sélectionnez un terme --
                                                </option>
                                                {Object.values(terms).map((term) => (
                                                  <option value={term.id} key={term.id}>
                                                    {term.name}
                                                  </option>))}
                                              </Field>
                                              <ErrorMessage name={`sub_rules[${index}].criterias[${subIndex}].term_id`} />
                                            </div>

                                            <div className="mx-1 my-1 sm:my-0 w-full">
                                              <Field
                                                as="select"
                                                name={`sub_rules[${index}].criterias[${subIndex}].operator_id`}
                                                className="w-full"
                                              >
                                                <option hidden value=''>
                                                  -- Sélectionnez un opérateur --
                                                </option>
                                                {Object.values(comparisonOperators).map((operator) => (
                                                  <option value={operator.id} key={operator.id}>
                                                    {operator.value}
                                                  </option>))}
                                              </Field>
                                              <ErrorMessage name={`sub_rules[${index}].criterias[${subIndex}].operator_id`} />
                                            </div>

                                            <div className="mx-1 my-1 sm:my-0 w-full">
                                              <Field
                                                name={`sub_rules[${index}].criterias[${subIndex}].value`}
                                                type="text"
                                                placeholder="Valeur.."
                                                className="w-full"
                                              />
                                              <ErrorMessage name={`sub_rules[${index}].criterias[${subIndex}].value`} />
                                            </div> {/* TODO CHANGE TYPE DEPENDING ON TERM + Validation par type */}
                                          </div>
                                        </div>

                                        <div className="ml-20 flex justify-center align-middle">

                                          <button
                                            type="button"
                                            onClick={() => criterasArrayHelpers.remove(subIndex)}
                                          >
                                            <div
                                              className={classNames(
                                                { "flex hover:text-purple-200 text-purple-300 transition hover:scale-105 cursor-pointer": true }
                                                , { "mt-14": subIndex > 0 })}>
                                              <span className="material-icons">
                                                remove
                                              </span>
                                            </div>
                                          </button>

                                        </div>

                                      </div>


                                      {subIndex === values.sub_rules[index].criterias.length - 1 && (
                                        <div className="py-2 mb-5 ml-14">
                                          <button
                                            type="button"
                                            onClick={() => criterasArrayHelpers.push(defaultCriteria)}
                                          >
                                            <div className="flex hover:text-blue-200 text-blue-300 transition hover:scale-105 cursor-pointer">
                                              Ajouter un critère
                                            </div>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    {(errors.sub_rules && typeof errors.sub_rules[index]?.criterias === 'string') ? (
                                      <div className="text-red-400">{errors.sub_rules[index].criterias}</div>
                                    ) : null}
                                    <button type="button" onClick={() => criterasArrayHelpers.push(defaultCriteria)}>
                                      <div className="hover:text-blue-200 text-blue-300 transition hover:scale-105 cursor-pointer mr-10">
                                        Ajouter un critère
                                      </div>
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          />

                          <div className="ml-0">

                            {(index === values.sub_rules.length - 1 && values.sub_rules[index].criterias?.length > 0) ? (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.push(defaultRule)}
                              >
                                <div className="flex hover:text-blue-200 text-blue-300 transition hover:scale-105 cursor-pointer">
                                  Ajouter une règle
                                </div>
                              </button>
                            ) : null}

                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        {typeof errors.sub_rules === 'string' && (
                          <div className="text-red-400">{errors.sub_rules}</div>
                        )}
                        <button type="button" onClick={() => arrayHelpers.push(defaultRule)}>
                          <div className="flex hover:text-blue-200 text-blue-300 transition hover:scale-105 cursor-pointer">
                            Ajouter une règle
                          </div>
                        </button>
                      </>
                    )}

                  </div>
                </>
              )}
            />

            <div className="flex justify-center mt-4 text-lg">
              <button
                className="text-sky-300 mx-2 hover:text-sky-400 hover:scale-105 transition"
                type="submit"
                disabled={isSubmitting}
              >
                Enregistrer
              </button>

              <button
                className="text-indigo-300 mx-2 hover:text-indigo-400 hover:scale-105 transition"
                type="button"
                onClick={() => submitForm()}
              >
                Annuler
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default RuleForm;


