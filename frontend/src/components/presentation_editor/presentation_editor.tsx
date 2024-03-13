import './presentation_editor.css';

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