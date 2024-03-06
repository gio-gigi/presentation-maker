import './presentation_editor.css';

export const PresentationEditor = () => {
    return (
        <div className='pe-container'>
            <h2 className='title'>Ingresa el contenido de la presentación</h2>
            <textarea className='text-container'></textarea>
        </div>
    );
}