

export default function GameDetailsInitialise() {


    return(
        <div className="gameDetailsInitialise">
            <form>
                <label htmlFor="opponent">Opponent</label>
                <input type="text" name="opponent"/>
                <label htmlFor="date">Date</label>
                <input type="date" name="date"/>
            </form>
        </div>
    )
}