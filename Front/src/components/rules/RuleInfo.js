import PropTypes from 'prop-types';


RuleInfo.propTypes = {
  rule: PropTypes.object
};


function RuleInfo({ rule }) {
  return (
    <>
      <div>
        {rule.name && <div><b>Nom : </b>{rule.name}</div>}
        <div>

          <div className="text-sky-200">
            <div><b>Notatation 1 : </b>
              {rule.sub_rules.map((subRule, key) => (
                <span key={subRule.id}>
                  {key > 0 && (
                    <span>&nbsp;{subRule.pivot.operator.value}&nbsp;</span>
                  )}
                  <span>(</span>
                  {Object.values(subRule.criterias).map((criteria, subKey) => (
                    <span key={criteria.id}>
                      <span>
                        {subKey > 0 && (
                          <>
                            &nbsp;{criteria.pivot.operator.value}&nbsp;
                          </>)}
                        {criteria.term.name} {criteria.operator.value} {criteria.value}</span>
                    </span>))}
                  <span>)</span>
                </span>
              ))}
            </div>
          </div>



          <div className="text-indigo-200">
            <div><b>Notation 2 :</b>
              {rule.sub_rules.map((subRule, key) => (
                <span key={subRule.id}>
                  {Object.values(rule.sub_rules)[key - 1]?.pivot.operator.value !== subRule.pivot.operator.value && (
                    <div>{subRule.pivot.operator.value}</div>
                  )}
                  {Object.values(subRule.criterias).map((criteria, subKey) => (
                    <div key={criteria.id} className="ml-4">
                      {Object.values(subRule.criterias)[subKey - 1]?.pivot.operator.value !== criteria.pivot.operator.value && Object.values(subRule.criterias).length > 1 ? (
                        <div>{criteria.pivot.operator.value}</div>
                      ) : null}
                      <div className="ml-4">{criteria.term.name} {criteria.operator.value} {criteria.value}</div>
                    </div>))}
                </span>
              ))}
            </div>
          </div>

        </div>
        {rule.updated_at && (<div className="text-gray-400 italic text-sm mt-3">Editer le : {new Date(rule.updated_at).toLocaleString('fr').replace(',', ' à')}</div>)}
      </div>
    </>
  );
}

export default RuleInfo;
