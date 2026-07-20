import { useEffect, useState } from "react";
import type { Game } from "../../../../types/game"
import type { ShotLog } from "../../../../types/shotLog";
import { getShotsAPIReq } from "./getShotsAPIReq";
import "./shotLog.css";
type shotLogProps = {
    gameDetails: Game | null | "ready";
}

export default function Shotlog({
    gameDetails
}: shotLogProps) {
    const [shotLog, setShotLog] = useState<ShotLog | null>(null)

    useEffect(() => {
        const load = async () => {
            if (!gameDetails || gameDetails === "ready") return
            const shotLogData = await getShotsAPIReq(gameDetails.id);
            if (shotLogData) setShotLog(shotLogData)
        }
        load()
    }, [gameDetails])

    if (!shotLog) return

    return(
        <div className="shotLog">
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
                        return(
                            <tr key={shot.id}>
                                <td>{shot.gameStatline.player.name}</td>
                                <td>#{shot.gameStatline.player.number}</td>
                                <td>{shot.type} Point {shot.make === true ? "Make" : "Miss"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
    
    
}