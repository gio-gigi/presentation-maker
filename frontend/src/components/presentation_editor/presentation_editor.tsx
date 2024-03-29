import { useState } from "react";
import "./presentation_editor.css";
import { PresentationMakerHelp } from "../presentation_maker_help/presentation_maker_help";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { OptionSelector } from "../option_selector/option_selector";
import { AvailableFontWeights, AvailableFonts } from "../../constants/font";
import { useAlert } from "../../hooks/useAlert";

interface PresentationEditorProps {
  onTextChange: (text: string) => void;
  onTitleChange: (title: string) => void;
}

export const PresentationEditor = ({
  onTextChange,
  onTitleChange
}: PresentationEditorProps) => {
  const { isHelpVisible, handleHelp, closeHelp } = useAlert();
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };

  return (
    <div className="pe-container">
      <h2 className="title">Ingresa el contenido de la presentación</h2>
      <input type="text" className="title-input" placeholder="Título de la presentación" onChange={handleTitleChange}/>
      <div className="tools">
        <OptionSelector
          title="Tipos de letra disponibles"
          options={AvailableFonts}
        />
        <OptionSelector
          title="Tipos de grosor de letra disponibles"
          options={AvailableFontWeights}
        />
        <button onClick={handleHelp} className="help-btn">
          <FontAwesomeIcon icon={faInfo} size="1x" />
        </button>
      </div>
      <textarea className="text-container-pe" onChange={handleChange}></textarea>
      {isHelpVisible && <PresentationMakerHelp closeHelp={closeHelp} />}
    </div>
  );
};
