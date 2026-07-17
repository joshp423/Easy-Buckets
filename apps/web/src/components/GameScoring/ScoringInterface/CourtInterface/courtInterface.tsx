import courtImage from "/FIBAcourt.jpg";
import "./courtInterface.css";
import { useState, useRef, useEffect } from "react";
import { type VideoPlayerHandle } from "../../../Homepage/Dashboard/GameDisplay/GameStats/VideoPlayer/videoPlayer";
import { uploadShotAPIReq } from "../../../../shared API functions/uploadShotAPIReq";
import type { Game } from "../../../../types/game";
import { updateGameStatAPIReq } from "../../../../shared API functions/updateGameStatAPIReq";
import { getSingleGameAPIFetch } from "../getSingleGameAPIFetch";

type CourtInterfaceProps = {
  selectedPlayer: number | null;
  selectedStat: string;
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
  videoRef: React.RefObject<VideoPlayerHandle | null>;
  gameDetails: Game | null | "ready";
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
};

export default function CourtInterface({
  selectedPlayer,
  selectedStat,
  setSelectedStat,
  selectedUI,
  setSelectedPlayer,
  setSelectedUI,
  videoRef,
  gameDetails,
  setGameDetails,
}: CourtInterfaceProps) {
  const courtImageRef = useRef<HTMLImageElement>(null);
  const [courtWidth, setCourtWidth] = useState<number>(0);
  const [courtHeight, setCourtHeight] = useState<number>(0);

  useEffect(() => {
    //running after render

    const element = courtImageRef.current; //look to see if image exists
    if (!element) return;

    const courtSizeObserver = new ResizeObserver(() => {
      //resizeObserver fires callback every time rendered size changes
      console.log("resize fired", element.clientWidth, element.clientHeight);
      setCourtWidth(element.clientWidth);
      setCourtHeight(element.clientHeight);
    });
    courtSizeObserver.observe(element); //start observing image

    return () => courtSizeObserver.disconnect(); // cleanup function for memory leak
  }, []);
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
      onClick={async (e) => {
        console.log(gameDetails, courtImageRef.current);
        if (selectedUI !== "courtPlacement") return;
        if (!courtImageRef.current) return;
        if (!gameDetails || gameDetails === "ready") return;
        if (!courtWidth || !courtHeight) return;
        const realImage = courtImageRef.current?.getBoundingClientRect(); //get image position and size relative to viewport
        const X = (e.clientX - realImage?.left) / courtWidth;
        const Y = (e.clientY - realImage?.top) / courtHeight;
        const timeStamp = videoRef.current?.getCurrentTimestamp() ?? 0;
        const selectedGameStatline = gameDetails.gameStatlines.filter(
          (gameStatline) => gameStatline.playerId === selectedPlayer,
        );
        console.log(X, Y, timeStamp);
        switch (selectedStat) {
          case "2P Make":
            await uploadShotAPIReq({
              gameStatlineId: selectedGameStatline[0].id,
              shot: {
                make: true,
                X,
                Y,
                type: 2,
                timeStamp,
              },
            });
            break;
          case "2P Miss":
            await uploadShotAPIReq({
              gameStatlineId: selectedGameStatline[0].id,
              shot: {
                make: false,
                X,
                Y,
                type: 2,
                timeStamp,
              },
            });
            break;
          case "3P Make":
            await uploadShotAPIReq({
              gameStatlineId: selectedGameStatline[0].id,
              shot: {
                make: true,
                X,
                Y,
                type: 3,
                timeStamp,
              },
            });
            break;
          case "3P Miss":
            await uploadShotAPIReq({
              gameStatlineId: selectedGameStatline[0].id,
              shot: {
                make: false,
                X,
                Y,
                type: 3,
                timeStamp,
              },
            });
            break;
        }
        await updateGameStatAPIReq({
          gameStatlineId: selectedGameStatline[0].id,
          statlineUpdateField: selectedStat,
          statlineUpdateIndicator: true,
        });
        //add to undo queue
        const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
        if (updatedGame) setGameDetails(updatedGame);
        setSelectedPlayer(null);
        setSelectedStat("");
        setSelectedUI("playerSelection");
        return;
      }}
    >
      <img src={courtImage} alt="court image" ref={courtImageRef} />
    </div>
  );
}
