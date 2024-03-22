import { useState } from "react";
import "./info_modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface InfoModalProps {
  message: string;
  callback?: () => void;
  isAlert: boolean;
}

export const InfoModal = ({message, callback, isAlert}: InfoModalProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }
    
  return (
    <div className="modal-container"
      style={{
        backgroundColor: isAlert ? 'rgb(234, 53, 53)' : 'green'
      }}
    >
      <p>{message}</p>
      <button onClick={() => {
        setVisible(false);
        if (callback) {
          callback();
        }
      }} className="close-btn">
        <FontAwesomeIcon icon={faTimes} size='2x'/>
      </button>
    </div>
  );
};
