import courtImage from "/FIBAcourt.jpg";
import "./courtInterface.css";

type CourtInterfaceProps = {
  selectedPlayer: number | null;
  selectedStat: string;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
};

export default function CourtInterface({
  selectedPlayer,
  selected,
  StatselectedUI,
  setSelectedUI,
}: CourtInterfaceProps) {
  return (
    <div
      className={`courtInterface 
        ${selectedPlayer ? "notSpotlightedLeft" : "spotlightLeft"}
      `}
    >
      <img src={courtImage} alt="court image" />
    </div>
  );
}
