import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './back_button.css';

export const BackButton = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <button className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </button>
    );
}