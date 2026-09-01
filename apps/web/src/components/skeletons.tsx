export function DashboardSkeleton() {
  return (
    <div className="gameDisplay skeleton">
      <div className="statsSection skeleton" style={{ width: "100%" }}>
        <div className="replayChart skeleton">
          <div className="videoPlayer skeleton">
            <div className="skeleton">
              <iframe width={640} height={"100%"}></iframe>
            </div>
          </div>
          <div className="shotChart skeleton" >
            <div className="skeleton">
              <img className="skeleton" />
            </div>
          </div>
        </div>
        <div className="shotLog skeleton" style={{ height: "100%", overflow: "hidden"}}></div>
        <div className="boxScore skeleton" style={{overflowX: "hidden"}}></div>
      </div>
      <div
        className="skeleton"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="skeleton"
          style={{
            backgroundColor: "#f3f5f8",
            width: "30%",
            height: "50%",
            borderRadius: "12px",
          }}
        ></div>
      </div>
    </div>
  );
}

export function GameInitialiseSkeleton() {
  return <div className="gameInitialise skeleton"></div>;
}

export function TeamSeasonsSkeleton() {
  return <div className="editSectionContainer skeleton"></div>;
}

export function EditSeasonSkeleton() {
  return (
    <div className="seasonEditor skeleton">
      <div className="seasonNameEdit skeleton">
        <form style={{ height: "157px" }}></form>
      </div>
      <div
        className="seasonGameEditList skeleton"
        style={{ height: "150px" }}
      ></div>
      <div
        className="skeleton"
        style={{
          height: "50px",
          width: "40%",
          backgroundColor: "#f3f5f8",
          alignSelf: "center",
        }}
      ></div>
    </div>
  );
}
