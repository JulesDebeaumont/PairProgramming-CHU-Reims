import PropTypes from 'prop-types';


RuleInfo.propTypes = {
  rule: PropTypes.object
};


function RuleInfo({ rule }) {
  console.log(rule);



  return (
    <>
      <div>
        {rule.name && <h3>Nom : {rule.name}</h3>}
        <div>

          <div className="text-red-100">

            {rule.sub_rules.map((subRule, key) => (
              <span key={subRule.id}>
                {key > 0 && (
                  <span>&nbsp;{subRule.pivot.operator_id}&nbsp;</span>
                )}
                <span>(</span>
                {Object.values(subRule.criterias).map((criteria, subKey) => (
                  <span key={criteria.id}>
                    <span>
                      {subKey > 0 && (
                        <>
                          &nbsp;{criteria.pivot.operator_id}&nbsp;
                        </>)}
                      {criteria.term.name} {criteria.operator.value} {criteria.value}</span>
                  </span>))}
                <span>)</span>
              </span>
            ))}

          </div>



          <div className="text-green-100">

            {rule.sub_rules.map((subRule, key) => (
              <span key={subRule.id}>
                {Object.values(rule.sub_rules)[key - 1]?.pivot.operator_id !== subRule.pivot.operator_id && (
                  <div>{subRule.pivot.operator_id}</div>
                )}
                {Object.values(subRule.criterias).map((criteria, subKey) => (
                  <div key={criteria.id} className="ml-4">
                    {Object.values(subRule.criterias)[subKey - 1]?.pivot.operator_id !== criteria.pivot.operator_id && (
                      <div>{criteria.pivot.operator_id}</div>
                    )}
                    <div className="ml-4">{criteria.term.name} {criteria.operator.value} {criteria.value}</div>
                  </div>))}
              </span>
            ))}

          </div>

        </div>
        {rule.updated_at && (<h3>Editer le : {new Date(rule.updated_at).toLocaleString('fr').replace(',', ' à')}</h3>)}
      </div>
    </>
  );
}

export default RuleInfo;
