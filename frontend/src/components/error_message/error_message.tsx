import { faWindowClose, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import './styles.css';

interface props{
    setIsErrorShow: Dispatch<SetStateAction<boolean>>;
    message: string;
}

export const ErrorMessage = ({setIsErrorShow ,message}: props) => {
    return (
        <div className="error-window">
                <div className="window-header">
                    <div className="window-title">
                    Error
                    </div>
                    <FontAwesomeIcon
                    icon={faWindowClose} 
                    className="window-close"
                    onClick={() => setIsErrorShow(false)}
                    />
                </div>
                <div className="window-body">
                    <FontAwesomeIcon icon={faCircleExclamation} className="circle-exclamation-icon"/>
                    {message}
                </div>
            </div>
    );
}