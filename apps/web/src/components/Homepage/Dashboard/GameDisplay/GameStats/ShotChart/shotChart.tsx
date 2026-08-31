import courtImage from "/FIBAcourt.jpg";
import "./shotChart.css";
import type { ShotLog } from "../../../../../../types/shotLog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";

type shotChartProps = {
  shotLog: ShotLog | null;
  selectedShot: number | null;
};

export default function ShotChart({ shotLog, selectedShot }: shotChartProps) {
  const courtImageRef = useRef<HTMLImageElement>(null);
  const [courtWidth, setCourtWidth] = useState<number>(0);
  const [courtHeight, setCourtHeight] = useState<number>(0);

  useEffect(() => {
    //running after render

    const element = courtImageRef.current; //look to see if image exists
    if (!element) return;

    const courtSizeObserver = new ResizeObserver(() => {
      //resizeObserver fires callback every time rendered size changes
      setCourtWidth(element.clientWidth);
      setCourtHeight(element.clientHeight);
    });
    courtSizeObserver.observe(element); //start observing image

    return () => courtSizeObserver.disconnect(); // cleanup function for memory leak
  }, []);

  return (
    <div className="shotChart">
      <div>
        <img src={courtImage} alt="court image" ref={courtImageRef} />
        {shotLog?.map((shot) => {
          const xReactive = shot.X * courtWidth;
          const yReactive = shot.Y * courtHeight;
          if (shot.make) {
            return (
              <FontAwesomeIcon
                icon={faCircle}
                className={selectedShot === shot.id ? "selectedIcon" : ""}
                style={{
                  color: "#04d708",
                  position: "absolute",
                  left: `${xReactive}px`,
                  top: `${yReactive}px`,
                }}
              />
            );
          }
          return (
            <FontAwesomeIcon
              icon={faX}
              className={selectedShot === shot.id ? "selectedIcon" : ""}
              style={{
                color: "#d40c0c",
                position: "absolute",
                left: `${xReactive}px`,
                top: `${yReactive}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
