import courtImage from "/FIBAcourt.jpg";
import "./shotChart.css"

export default function ShotChart() {
  return (
    <div className="shotChart">
      <img src={courtImage} alt="court image" />
    </div>
  )
}
