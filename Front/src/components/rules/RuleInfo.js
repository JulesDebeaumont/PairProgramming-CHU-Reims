import PropTypes from 'prop-types';


RuleInfo.propTypes = {
  term: PropTypes.object
};


function RuleInfo({ term }) {
  return (
    <>
      <div>
        <h3>Nom : {term.name}</h3>
        <h3>Type : {term.type.name}</h3>
        {term.updated_at && (<h3>Editer le :{term.updated_at}</h3>)}
      </div>
    </>
  );
}

export default RuleInfo;
