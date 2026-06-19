import { getColor, getArrowDirection } from "../../utils/gameHelpers";

function GuessRow({ item }) {
  const yearResult = item.result?.year;
  const yearArrow = getArrowDirection(yearResult);

  const durationResult = item.result?.duration;
  const durationArrow = getArrowDirection(durationResult);

  return (
    <div className="guess-row">
      <div className={`cell ${getColor(item.result?.track)}`}>{item.track}</div>
      <div className={`cell ${getColor(item.result?.artist)}`}>{item.artist}</div>
      <div className={`cell ${getColor(item.result?.album)}`}>{item.album}</div>
      <div className={`cell ${getColor(yearResult)} ${yearArrow}`}>
        <span className="year-label">
          {item.year}
        </span>
      </div>
      <div className={`cell ${getColor(durationResult)} ${durationArrow}`}>
        <span className="year-label">
          {Math.floor(item.duration /60) > 1 ? Math.floor(item.duration /60) + ` minutes` : Math.floor(item.duration /60) + ` minute`} {+ item.duration%60 + ` secondes`}
        </span>
      </div>
    </div>
  );
}

export default GuessRow;