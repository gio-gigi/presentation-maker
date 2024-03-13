import { useState } from "react";
import "./info_modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface InfoModalProps {
  message: string;
}

export const InfoModal = ({message}: InfoModalProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }
    
  return (
    <div className="modal-container">
      <p>{message}</p>
      <button onClick={() => setVisible(false)} className="close-btn">
        <FontAwesomeIcon icon={faTimes} size='2x'/>
      </button>
    </div>
  );
};
