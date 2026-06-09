function Hints({ hints }) {
  return (
    <div className="hints">
      <h3>Indices</h3>
      {hints.length === 0 ? (
        <p>Aucun indice pour le moment</p>
      ) : (
        hints.map((hint, index) => <p key={index}>{hint}</p>)
      )}
    </div>
  );
}

export default Hints;