import { useState } from 'react';
import { PresentationEditor } from '../../components/presentation_editor/presentation_editor';
import { PresentationPreview } from '../../components/presentation_preview/presentation_preview';
import './presentation_maker_page.css';
import { usePresentationMaker } from '../../hooks/usePresentationMaker';

export const PresentationMakerPage = () => {
    const {slides, onTextChange} = usePresentationMaker();
    return (
        <div className='pm-page'>
            <PresentationEditor onTextChange={onTextChange}/>
            <PresentationPreview slides={slides}/>
        </div>
    );
};