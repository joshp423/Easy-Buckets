import type { ShotLog } from "../../../../types/shotLog";
import "./shotLog.css";
type shotLogProps = {
  shotLog: ShotLog | null;
};

export default function Shotlog({ shotLog }: shotLogProps) {
  if (!shotLog) return;

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
              <tr key={shot.id}>
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
