import type { Player } from "../../../types/player";
import { useState } from "react";
import CreatePlayers from "../../GameScoring/CreatePlayers/createPlayers";

type PlayerListEditProps = {
    playerList: Player[];
    setAddPlayer: React.Dispatch<React.SetStateAction<boolean>>;
    addPlayer: boolean;
}

export default function PlayerListEdit({playerList, setAddPlayer, addPlayer}: PlayerListEditProps) {
    const [editPlayer, setEditPlayer] = useState<number | null>(null);
    if (playerList.length === 0) return;

    if (editPlayer) {
        if (addPlayer) {
            return (
               <div className="playerListEdit">

                </div> 
            )
        }
    }
    return (
        <div className="playerListEdit">
            <table>
                <tbody>
                    {playerList.map((player) => (
                        <tr key={player.id}>
                            <td>{player.name + " " + player.number}</td>
                            <button
                                onClick={() => {
                                    setEditPlayer(player.id);
                                }}
                            >Edit</button>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    type="button"
                    onClick={() => {
                    setAddPlayer(true);
                    }}
                >
                </button>
            </div>   
        </div>
    )
}