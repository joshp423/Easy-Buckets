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
}: shotLogProps) {
  if (!shotLog) return;

  function formatTime(timeStamp: number) {
    const minutes = Math.floor(timeStamp / 60);
    const seconds = Math.floor(timeStamp % 60); //modulo - what's left after dividing timeStamp by 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`; //adds a 0 before the seconds if seconds is only one digit
  }
  if (!replay) {
    return (
      <div className="shotLog">
        <h3>Shot Log (Newest First)</h3>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Number</th>
              <th>Shot Type</th>
            </tr>
          </thead>
          <tbody>
            {shotLog?.map((shot) => {
              return (
                <tr
                  key={shot.id}
                  onMouseEnter={() => setSelectedShot(shot.id)}
                  onMouseLeave={() => setSelectedShot(null)}
                >
                  <td>{shot.gameStatline.player.name}</td>
                  <td>#{shot.gameStatline.player.number}</td>
                  <td>
                    {shot.type} Point {shot.make === true ? "Make" : "Miss"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="shotLog">
      <h3>Shot Log (Newest First)</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Number</th>
            <th>Shot Type</th>
            <th>Replay Time</th>
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
                <td>{formatTime(shot.timeStamp)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
