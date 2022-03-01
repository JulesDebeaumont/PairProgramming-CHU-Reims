import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getRuleById, resetRuleSingle, startLoading } from '../../redux/slices/rule';
// components
import RuleForm from './RuleForm';
import LoadingSpin from '../general/LoadingSpin';

function RuleEdition() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { rule, isLoading } = useSelector((state) => state.rule);

  const getRule = async (id) => {
    try {
      await dispatch(getRuleById(id));
    } catch (error) {
      console.error(error.message);
      navigate('/page404')
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      getRule(id);
    } else {
      dispatch(startLoading());
      dispatch(resetRuleSingle());
    }
  }, [dispatch, id])

  return (
    <>
      <div className="sm:mx-3 mb-5">

        <div className="py-3 mb-6">
          <h2 className="text-3xl font-bold text-center">
            {id ? "Edition d'une règle" : "Créer une nouvelle règle"}
          </h2>
        </div>

        <div className="flex flex-col">
          <div className=" p-3 flex w-full justify-center">
            <div>
              {isLoading ? (
                <LoadingSpin />
              ) : (
                <RuleForm rule={rule} submitForm={() => navigate('/rules')} />
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default RuleEdition;
