import type { Game } from "../../../../types/game"
type shotLogProps = {
    gameDetails: Game | null | "ready";
}

export default function Shotlog({
    gameDetails
}: shotLogProps) {
    if (!gameDetails || gameDetails === "ready") return
    
}