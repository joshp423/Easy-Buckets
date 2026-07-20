import { useEffect, useState } from "react";
import type { Game } from "../../../../types/game"
import type { ShotLog } from "../../../../types/shotLog";
import { getShotsAPIReq } from "./getShotsAPIReq"
type shotLogProps = {
    gameDetails: Game | null | "ready";
}

export default function Shotlog({
    gameDetails
}: shotLogProps) {
    const [shotLog, setShotLog] = useState<ShotLog[] | null>(null)

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
                            <tr key={shot.id}></tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
    
    
}