import courtImage from "/FIBAcourt.jpg";
import "./courtInterface.css";

type CourtInterfaceProps = {
  selectedPlayer: number | null;
  selectedStat: string;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
};

export default function CourtInterface({
  selectedPlayer,
  selectedStat,
  selectedUI,
  setSelectedPlayer,
  setSelectedUI,
}: CourtInterfaceProps) {
  function addUIClasses(
    selectedUI: "playerSelection" | "statSelection" | "courtPlacement",
  ) {
    switch (selectedUI) {
      case "playerSelection":
        return "notSpotlightedRight";
      case "statSelection":
        return "notSpotlightedRight";
      case "courtPlacement":
        return "courtSpotlight";
    }
  }

  return (
    <div
      className={`courtInterface ${addUIClasses(selectedUI)}`}
      onClick={() => {
        setSelectedPlayer(null);
        setSelectedUI("playerSelection");
        return;
      }}
    >
      <img src={courtImage} alt="court image" />
    </div>
  );
}
