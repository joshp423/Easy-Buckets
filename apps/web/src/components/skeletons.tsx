export function DashboardSkeleton() {
  return (
    <div className="gameDisplay skeleton">
      <div className="statsSection">
        <div className="replayChart">
          <div className="videoPlayer">
            <div></div>
          </div>
          <div className="shotChart">
            <div></div>
          </div>
        </div>
        <div className="shotLog" style={{ height: "100%" }}></div>
        <div className="boxScore"></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
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
