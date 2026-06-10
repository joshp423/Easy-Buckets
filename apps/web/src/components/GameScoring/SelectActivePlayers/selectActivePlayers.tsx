import type { Player } from "../../../types/player"

type SelectActivePlayersProps = {
    playerList: Player[]
}

export default function SelectActivePlayers({ playerList }: SelectActivePlayersProps) {

    if (!playerList) return;

    console.log(playerList)


    return(
        <div className="selectActivePlayers">
            <form>
                <h1>Select Active Players</h1>
                {playerList.map((player) => (
                    <div>
                        <input type="checkbox" id={String(player.number)} name={String(player.number)} value={player.number}/>
                        <label htmlFor={String(player.number)}>{player.name + " " + player.number}</label>
                    </div>
                ))}
                <input type="text" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}