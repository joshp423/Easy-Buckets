import { useState } from "react"

export default function CreatePlayers() {

    const [addPlayersAmount, setAddPlayersAmount] = useState<number>(1)

    const canDecreasePlayers = () => (addPlayersAmount === 1 ? false : true);
    const canIncreasePlayers = () => (addPlayersAmount >= 7 ? false : true);

    return(
        <div className="addPlayers">
            <h1>Add New Players</h1>
            <form>
                {Array.from({length: addPlayersAmount}).map((_, i) => (
                    <div key={i}>
                        <input type="text" placeholder="Player Name"/>
                        <input type="number" placeholder="Player Number"/>
                    </div>
                ))}
                <button type="button" onClick={() => canDecreasePlayers() && setAddPlayersAmount(addPlayersAmount - 1)}>-</button>
                <button type="button" onClick={() => canIncreasePlayers() && setAddPlayersAmount(addPlayersAmount + 1)}>+</button>
                <button type="submit">Add Players</button>
            </form>
        </div>
    )
}