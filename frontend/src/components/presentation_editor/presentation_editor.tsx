import { useState, Dispatch } from 'react';
import './presentation_editor.css';
import { usePresentationMaker } from '../../hooks/usePresentationMaker';

interface PresentationEditorProps {
    onTextChange: (text: string)=>void;
}

export const PresentationEditor = ({onTextChange}: PresentationEditorProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onTextChange(event.target.value);
    }
    return (
        <div className='pe-container'>
            <h2 className='title'>Ingresa el contenido de la presentación</h2>
            <textarea className='text-container' onChange={handleChange}></textarea>
        </div>
    );
}