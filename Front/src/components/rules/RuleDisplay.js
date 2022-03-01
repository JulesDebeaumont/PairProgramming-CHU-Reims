import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
// components
import RuleInfo from './RuleInfo';


RuleDisplay.propTypes = {
  rule: PropTypes.object,
  setSelectedForDelete: PropTypes.func,
};


function RuleDisplay({ rule, setSelectedForDelete }) {
  return (
    <>
      <div className="hover:bg-slate-800 bg-slate-900 p-3 border-y border-slate-800 rounded flex w-full justify-between">

        <div>
          <RuleInfo rule={rule} />
        </div>

        <div className="flex">

          <button className="text-indigo-300 mx-1 hover:text-indigo-400 transition hover:scale-125">
            <Link to={`/rules/${rule.id}/edit`}>
              <div className="flex">
                <span className="material-icons">
                  edit
                </span>
              </div>
            </Link>
          </button>

          <button
            className="text-purple-300 mx-1 hover:text-purple-400 transition hover:scale-125"
            type="button"
            onClick={() => setSelectedForDelete(rule.id)}>
            <div className="flex">
              <span className="material-icons">
                delete
              </span>
            </div>
          </button>

        </div>

      </div>
    </>
  );
}

export default RuleDisplay;
