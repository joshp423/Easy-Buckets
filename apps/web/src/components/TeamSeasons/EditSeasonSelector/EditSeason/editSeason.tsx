import { useEffect, useState } from "react";
import { seasonGameAPIFetch } from "../../../../shared API functions/seasonGameAPIFetch";
import type { Game } from "../../../../types/game";
import updateSeasonNameAPIReq from "./updateSeasonNameAPIReq";
import { useNavigate } from "react-router";
import DeleteCheck from "../DeleteCheck/deleteCheck";
import "./editSeason.css";
import { EditSeasonSkeleton } from "../../../skeletons";
import LoadingBall from "../../../../assets/LoadingBall/loadingball";
type EditSeasonProps = {
  seasonId: number | null;
  setEditedSeason: React.Dispatch<React.SetStateAction<number | null>>;
  seasonName: string;
};

export default function EditSeason({
  seasonId,
  setEditedSeason,
  seasonName,
}: EditSeasonProps) {
  const [seasonGames, setSeasonGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updatedSeasonName, setUpdatedSeasonName] = useState<string>("");
  const navigate = useNavigate();
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);
  const [deletedObj, setDeletedObj] = useState<"game" | "season" | null>(null);
  const [deletedObjId, setDeletedObjId] = useState<number | null>(null);

  useEffect(() => {
    async function getSeasonData() {
      if (deleteCheck || !seasonId) return;
      setLoading(true);
      const data = await seasonGameAPIFetch({
        id: seasonId,
        draft: false,
      });
      setSeasonGames(data);
      setLoading(false);
    }
    getSeasonData();
  }, [seasonId, deleteCheck]);

  async function uploadNameChange() {
    if (!seasonId) return;
    setLoading(true);
    const updatedName = await updateSeasonNameAPIReq(
      seasonId,
      updatedSeasonName,
      
    );
    if (updatedName) {
      navigate(`/team-seasons/${updatedName}`, {
        state: { seasonId },
      });
    }
    setLoading(false);
  }

  //skelly required
  if (loading) {
    return <EditSeasonSkeleton />;
  }

  if (deleteCheck) {
    return (
      <div className="seasonEditor">
        <DeleteCheck
          deletedObj={deletedObj}
          deletedObjId={deletedObjId}
          setDeleteCheck={setDeleteCheck}
          deleteCheck={deleteCheck}
        />
      </div>
    );
  }

  return (
    <div className="seasonEditor">
      <div className="seasonNameEdit">
        <form
          action=""
          onSubmit={() => {
            uploadNameChange();
          }}
        >
          <label htmlFor="seasonName">Season Name:</label>
          <input
            id="seasonName"
            type="text"
            defaultValue={seasonName}
            onChange={(e) => {
              setUpdatedSeasonName(e.target.value);
            }}
          />
          <div>
            <button type="submit">{loading ? <LoadingBall /> :"Confirm Changes"}</button>
            <button
              onClick={() => {
                setDeleteCheck(true);
                setDeletedObj("season");
                setDeletedObjId(seasonId);
              }}
            >
            Delete Season
            </button>
          </div>
        </form>
      </div>
      <div className="seasonGameEditList">
        <h3>Games:</h3>
        <ul>
          {seasonGames.length !== 0 ? 
            seasonGames.map((game) => {
              const formatDate = new Date(game.date).toLocaleString().split(",", 1);
              return (
                <li>
                  <h3>
                    {formatDate} vs: {game.opponent}
                  </h3>
                  <button
                    onClick={() => {
                      setDeleteCheck(true);
                      setDeletedObj("game");
                      setDeletedObjId(game.id);
                    }}
                  >
                  Delete Game
                  </button>
                </li>
              );
            }) : <li style={{ marginTop: "20px" }}>No Games</li>
          }
        </ul>
      </div>
      <button onClick={() => setEditedSeason(null)}>Back</button>
      <DeleteCheck
        deletedObj={deletedObj}
        deletedObjId={deletedObjId}
        deleteCheck={deleteCheck}
        setDeleteCheck={setDeleteCheck}
      />
    </div>
  );
}
