import { getColor, getYearLabel } from "../../utils/gameHelpers";

function GuessRow({ item }) {
  return (
    <div className="guess-row">
      <div className={`cell ${getColor(item.result?.track)}`}>{item.track}</div>
      <div className={`cell ${getColor(item.result?.artist)}`}>{item.artist}</div>
      <div className={`cell ${getColor(item.result?.album)}`}>{item.album}</div>
      <div className={`cell ${getColor(item.result?.year)}`}>
        {item.year} {getYearLabel(item.result?.year)}
      </div>
    </div>
  );
}

export default GuessRow;