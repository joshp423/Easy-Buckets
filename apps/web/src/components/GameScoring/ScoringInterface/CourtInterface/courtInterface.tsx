import courtImage from "/FIBAcourt.jpg";
import "./courtInterface.css";

export default function CourtInterface() {
  return (
    <div className="courtInterface">
      <img src={courtImage} alt="court image" />
    </div>
  );
}
