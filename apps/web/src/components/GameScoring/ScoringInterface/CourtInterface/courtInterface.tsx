import courtImage from "/FIBAcourt.jpg";
import "./courtInterface.css";

type CourtInterfaceProps = {
  selectedPlayer: number | null;
  selectedStat: string;
}

export default function CourtInterface({selectedPlayer, selectedStat}: CourtInterfaceProps) {
  return (
    <div className="courtInterface"
      className={`playerSelection ${selectedPlayer ? "notSpotlightedLeft" : "spotlightLeft"}`}
    >
      <img src={courtImage} alt="court image" />
    </div>
  );
}
