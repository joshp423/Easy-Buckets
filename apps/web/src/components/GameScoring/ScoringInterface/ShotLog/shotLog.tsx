import type { ShotLog } from "../../../../types/shotLog";
import "./shotLog.css";
import { type VideoPlayerHandle } from "../../../Homepage/Dashboard/GameDisplay/GameStats/VideoPlayer/videoPlayer";

type shotLogProps = {
  shotLog: ShotLog | null;
  selectedShot: number | null;
  setSelectedShot: React.Dispatch<React.SetStateAction<number | null>>;
  replay: boolean;
  videoRef: React.RefObject<VideoPlayerHandle | null>;
};

export default function Shotlog({
  shotLog,
  selectedShot,
  setSelectedShot,
  replay,
  videoRef,
}: shotLogProps) {
  if (!shotLog) return;

  function formatTime(timeStamp: number) {
    const minutes = Math.floor(timeStamp / 60);
    const seconds = Math.floor(timeStamp % 60); //modulo - what's left after dividing timeStamp by 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`; //adds a 0 before the seconds if seconds is only one digit
  }

  if (shotLog.length === 0) {
    return (
      <div className="shotLog">
        <h3>Shot Log</h3>
        <h4>No Shots!</h4>
      </div>
    );
  }
  
  return (
    <div className="shotLog">
      <h3>Shot Log</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Number</th>
            <th>Shot Type</th>
            {replay ? <th>Replay Time</th> : <></> }
            {replay ? <th></th> : <></> }
          </tr>
        </thead>
        <tbody>
          {shotLog?.map((shot) => {
            return (
              <tr
                key={shot.id}
                onClick={() => {
                  if (selectedShot === shot.id) {
                    setSelectedShot(null);
                    return;
                  }
                  setSelectedShot(shot.id);
                  return;
                }}
                className={selectedShot === shot.id ? "selected" : ""}
              >
                <td>{shot.gameStatline.player.name}</td>
                <td>#{shot.gameStatline.player.number}</td>
                <td>
                  {shot.type} Point {shot.make === true ? "Make" : "Miss"}
                </td>
                {replay ? (<td>{formatTime(shot.timeStamp)}</td>) : <></> }
                {replay ? <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // doesnt effect select row functionality
                      if (shot.timeStamp >= 5) {
                        videoRef.current?.seekTo(shot.timeStamp - 5);
                      } else {
                        videoRef.current?.seekTo(
                          shot.timeStamp - shot.timeStamp,
                        );
                      }
                      videoRef.current?.play();
                      setTimeout(() => {
                        videoRef.current?.pause();
                      }, 10000);
                    }}
                  >
                    View Shot
                  </button>
                </td> : <></> }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
