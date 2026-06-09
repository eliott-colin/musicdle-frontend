function Hints({ hints }) {
  return (
    <div className="hints">
      <h3>Indices</h3>
      {hints.length === 0 ? (
        <p>Aucun indice pour le moment</p>
      ) : (
        hints.map((h, i) => <p key={i}>{h}</p>)
      )}
    </div>
  );
}

export default Hints;