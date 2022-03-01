import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getRules, removeRule } from '../../redux/slices/rule';
// components
import RuleDisplay from './RuleDisplay';
import Modal from '../general/Modal';


function RulesList() {
  const dispatch = useDispatch();
  const { rules } = useSelector((state) => state.rule);
  const { isLoading } = useSelector((state) => state.rule);
  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getRules());
  }, [dispatch]);

  const deleteRule = async (id) => {
    try {
      await dispatch(removeRule(id));
      enqueueSnackbar('Règle supprimer', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar("Une erreur est survenue", { variant: 'error' });
      console.error(error);
    }
  };


  return (
    <>
      {selectedForDelete !== null && (
        <>
          <Modal
            message="Voulez vous vraiment supprimer cette règle ?"
            onSubmit={() => {
              deleteRule(selectedForDelete);
              setSelectedForDelete(null)
            }}
            onClose={() => setSelectedForDelete(null)}
          />
        </>
      )}
      <div className="sm:mx-3 mb-5">
        <div className="py-3 mb-6">
          <h2 className="text-3xl font-bold text-center sm:text-left">Liste des règles</h2>
        </div>

        <Link to="/rules/new">
          <div className="flex mb-8 sm:ml-3 justify-center sm:justify-start text-center sm:text-left">
            <div>
              <div className="flex hover:text-blue-200 text-blue-300 transition hover:scale-105 text-lg cursor-pointer">
                <span className="material-icons mt-0.5">
                  add
                </span>
                Ajouter une règle
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-col">
          {Object.values(rules).map((rule) => (
            <RuleDisplay
              key={rule.id}
              rule={rule}
              setSelectedForDelete={setSelectedForDelete}
            />
          ))}
        </div>

        <div>
          {Object.values(rules).length == 0 && isLoading == false && (
            <div className="text-lg text-center sm:text-left sm:ml-5">
              <span>
                Aucune règle
              </span>
            </div>

          )}
        </div>

      </div>
    </>
  );
}

export default RulesList;
