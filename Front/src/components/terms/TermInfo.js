import PropTypes from 'prop-types';


TermInfo.propTypes = {
  term: PropTypes.object
};

function TermInfo({ term }) {
  return (
    <>
      <div>
        <div><b>Nom : </b>{term.name}</div>
        <div><b>Type : </b>{term.type.name}</div>
        {term.updated_at && (<div className="text-gray-400 italic text-sm mt-3">Editer le {new Date(term.updated_at).toLocaleString('fr').replace(',', ' à')} </div>)}
      </div>
    </>
  );
}

export default TermInfo;
