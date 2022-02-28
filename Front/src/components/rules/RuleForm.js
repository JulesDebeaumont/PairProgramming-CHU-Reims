import { useEffect } from 'react';
import { Form, FormikProvider, FieldArray, Field, useFormik, getIn } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { putRule, postRule } from '../../redux/slices/rule';
import { getTerms } from '../../redux/slices/term';
// hooks
import useOperators from '../../hooks/useOperators';


RuleForm.propTypes = {
  rule: PropTypes.object,
  toggleForm: PropTypes.func,
};


function RuleForm({ rule, toggleForm = () => { } }) {
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
          criterias: Yup.array().required('Au moins un critère est requis').min(1)
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
    initialValues: rule ?? { id: null, name: '', sub_rules: [] },
    validationSchema: RuleSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      try {
        if (values.id === null) {
          await dispatch(postRule(values));
          resetForm();
          setSubmitting(false);
          toggleForm();
          enqueueSnackbar('Nouvelle règle créer', { variant: 'success' });
        } else {
          await dispatch(putRule(values));
          resetForm();
          setSubmitting(false);
          toggleForm(rule.id);
          enqueueSnackbar('Changement effectué', { variant: 'success' });
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
        return touch && error ? error : null;
      }}
    </Field>
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>

          <Field
            name={`name`}
            type="text"
            placeholder="Nom.."
          />
          <ErrorMessage name={`name`} />

          <FieldArray
            name={`sub_rules`}
            render={arrayHelpers => (
              <>
                <div>
                  {values.sub_rules && values.sub_rules.length > 0 ? (
                    values.sub_rules.map((rule, index) => (
                      <div key={index} id={index}>
                        {index > 0 && (

                          <div className="py-8">
                            <Field
                              as="select"
                              name={`sub_rules[${index}].pivot.operator_id`}
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
                        <FieldArray
                          name={`sub_rules[${index}].criterias`}
                          render={criterasArrayHelpers => (
                            <div>
                              {values.sub_rules[index].criterias && values.sub_rules[index].criterias.length > 0 ? (
                                values.sub_rules[index].criterias.map((criteria, subIndex) => (
                                  <div key={`${index}.${subIndex}`} id={`${index}.${subIndex}`}>
                                    {subIndex > 0 && (

                                      <div>
                                        <Field
                                          as="select"
                                          name={`sub_rules[${index}].criterias[${subIndex}].pivot.operator_id`}
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

                                    <div>
                                      <Field
                                        as="select"
                                        name={`sub_rules[${index}].criterias[${subIndex}].term_id`}
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

                                    <div>
                                      <Field
                                        as="select"
                                        name={`sub_rules[${index}].criterias[${subIndex}].operator_id`}
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

                                    <div>
                                      <Field
                                        name={`sub_rules[${index}].criterias[${subIndex}].value`}
                                        type="text"
                                        placeholder="Valeur.."
                                      />
                                      <ErrorMessage name={`sub_rules[${index}].criterias[${subIndex}].value`} />
                                    </div> {/* TODO CHANGE TYPE DEPENDING ON TERM + Validation par type */}

                                    <button
                                      type="button"
                                      onClick={() => criterasArrayHelpers.remove(subIndex)}
                                    >
                                      -
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => criterasArrayHelpers.push(defaultCriteria)}
                                    >
                                      +
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <>
                                  {(errors.sub_rules && typeof errors.sub_rules[index]?.criterias === 'string') ? (
                                    <div>{errors.sub_rules[index].criterias}</div>
                                  ) : null}
                                  <button type="button" onClick={() => criterasArrayHelpers.push(defaultCriteria)}>
                                    Ajouter un critère
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push(defaultRule)}
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <>
                      {typeof errors.sub_rules === 'string' && (
                        <div>{errors.sub_rules}</div>
                      )}
                      <button type="button" onClick={() => arrayHelpers.push(defaultRule)}>
                        Ajouter une règle
                      </button>
                    </>
                  )}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </>
            )}
          />
        </Form>
      </FormikProvider>
    </>
  );
}

export default RuleForm;


