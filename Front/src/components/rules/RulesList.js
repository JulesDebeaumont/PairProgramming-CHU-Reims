import { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getRules } from '../../redux/slices/rule';
// components
import RuleForm from './RuleForm';
import RuleDisplay from './RuleDisplay';


function RulesList() {
  const dispatch = useDispatch();
  const { rules } = useSelector((state) => state.rule);
  const { isLoading } = useSelector((state) => state.rule);
  const [rulesEdit, setRulesEdit] = useState([]);
  const [newFormDisplay, setNewFormDisplay] = useState(false);

  useEffect(() => {
    dispatch(getRules());
  }, [dispatch]);

  function toggleEdit(id) {
    if (rulesEdit[id] === false || !rulesEdit[id]) {
      const rulesEditCopy = [...rulesEdit];
      rulesEditCopy[id] = true;
      setRulesEdit(rulesEditCopy);
    } else {
      const rulesEditCopy = [...rulesEdit];
      rulesEditCopy[id] = false;
      setRulesEdit(rulesEditCopy);
    }
  }

  function toggleNew() {
    setNewFormDisplay(!newFormDisplay);
  }

  
  return (
    <>
      <div className="ml-3 mb-5">
        <div className="py-3 mb-6">
          <h2 className="text-3xl font-bold">Gestion des règles :</h2>
        </div>

        <div>
          {newFormDisplay === true && (
            <RuleForm toggleForm={toggleNew} />
          )}
          <div onClick={() => toggleNew()}>{newFormDisplay === true ? "Annuler" : "Ajouter"}</div>
        </div>

        <div>
          {Object.values(rules).map((rule) => (
            <RuleDisplay
              key={rule.id}
              rule={rule}
              toggleEdit={toggleEdit}
              rulesEdit={rulesEdit}
            />
          ))}
        </div>

        <div>
          {Object.values(rules).length == 0 && isLoading == false && (
            <span>
              Aucune règle
            </span>
          )}
        </div>

      </div>
    </>
  );
}

export default RulesList;
