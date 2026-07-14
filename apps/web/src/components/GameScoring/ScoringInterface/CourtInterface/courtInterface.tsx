import courtImage from "/FIBAcourt.jpg";
import "./courtInterface.css";
import { useState, useRef, useEffect } from "react";
import { type Shot } from "../../../../types/shot";
import { type VideoPlayerHandle } from "../../../Homepage/Dashboard/GameDisplay/GameStats/VideoPlayer/videoPlayer";
import { uploadShotAPIReq } from "../../../../shared API functions/uploadShotAPIReq";
import type { Game } from "../../../../types/game";

type CourtInterfaceProps = {
  selectedPlayer: number | null;
  selectedStat: string;
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
  videoRef: React.RefObject<VideoPlayerHandle | null>
  gameDetails: Game | null | "ready";
};

export default function CourtInterface({
  selectedPlayer,
  selectedStat,
  setSelectedStat,
  selectedUI,
  setSelectedPlayer,
  setSelectedUI,
  videoRef,
  gameDetails
}: CourtInterfaceProps) {

  const courtImageRef = useRef<HTMLImageElement>(null)
  const [courtWidth, setCourtWidth] = useState<number>(0);
  const [courtHeight, setCourtHeight] = useState<number>(0);

  useEffect(() => { //running after render

    const element = courtImageRef.current; //look to see if image exists
    if (!element) return;

    const courtSizeObserver = new ResizeObserver(() => { //resizeObserver fires callback every time rendered size changes
      setCourtWidth(element.clientWidth);
      setCourtHeight(element.clientHeight);
    });
    courtSizeObserver.observe(element) //start observing image

    return () => courtSizeObserver.disconnect() // cleanup function for memory leak

  }, [])
  function addUIClasses(
    selectedUI: "playerSelection" | "statSelection" | "courtPlacement",
  ) {
    switch (selectedUI) {
      case "playerSelection":
        return "";
      case "statSelection":
        return "";
      case "courtPlacement":
        return "spotlight";
    }
  }

  return (
    <div
      className={`courtInterface ${addUIClasses(selectedUI)}`}
      onClick={(e) => {
        if (selectedUI !== "courtPlacement") return;
        if (!courtImageRef.current) return;
        if (!gameDetails || gameDetails === "ready")return

        const realImage = courtImageRef.current?.getBoundingClientRect(); //get image position and size relative to viewport
        const X = (e.clientX - realImage?.left) / courtWidth;
        const Y = (e.clientY - realImage?.top) / courtHeight;
        const timeStamp = videoRef.current?.getCurrentTimestamp() ?? 0;
        const selectedGameStatline = gameDetails.gameStatlines.filter((gameStatline) => gameStatline.playerId === selectedPlayer)
        switch (selectedStat) {
          case "2P Make":
          uploadShotAPIReq({
            gameStatlineId: selectedGameStatline[0].id,
            shot: {
              make: true,
              X,
              Y,
              type: 2,
              timeStamp
            }
          })
        }
        setSelectedPlayer(null);
        setSelectedStat("")
        setSelectedUI("playerSelection");
        return;
      }}
    >
      <img src={courtImage} alt="court image" />
    </div>
  );
}
