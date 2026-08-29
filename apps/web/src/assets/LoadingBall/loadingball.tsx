import { faBasketball } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./loadingBall.css";

export default function LoadingBall() {
    return(
        <div className="loadingBall">
            <FontAwesomeIcon icon={faBasketball} className="ball"/>
        </div>
    )
}