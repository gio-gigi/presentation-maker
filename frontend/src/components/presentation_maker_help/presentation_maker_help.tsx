import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './presentation_maker_help.css';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

interface PresentationMakerHelpProps {
    closeHelp: () => void;
}

export const PresentationMakerHelp = ({ closeHelp }: PresentationMakerHelpProps) => {
    return (
        <div className='pmh-container'>
            <button className='btn-close' onClick={closeHelp}>
                <FontAwesomeIcon icon={faTimes} size='2x'/>
            </button>
            <h2 className='title'>Ayuda</h2>
            <div className="help-container">
                <h4>Crear un slide</h4>
                <p>Para crear un nuevo slide, utilize la siguiente sintaxis:</p>
                <code>
                    {
                        "/slide{"
                    }
                    <br />
                    {
                        "contenido del slide"
                    }
                    <br />
                    {
                        "}"
                    }
                </code>

                <h4>Crear un titulo</h4>
                <p>Para crear un nuevo titulo, se necesita estar dentro del contenido de un slide y utilizar la siguiente sintaxis:</p>
                <code>
                    {
                        "/title[tamaño,tipo de letra]("
                    }
                    <br />
                    {
                        "contenido del titulo (puede ser multilinea)"
                    }
                    <br />
                    {
                        ")"
                    }
                </code>

                <h4>Crear un texto</h4>
                <p>Para crear un nuevo texto, se necesita estar dentro del contenido de un slide y utilizar la siguiente sintaxis:</p>
                <code>
                    {
                        "/text[tamaño,tipo de letra,grosor de la fuente]("
                    }
                    <br />
                    {
                        "contenido del texto (puede ser multilinea)"
                    }
                    <br />
                    {
                        ")"
                    }
                </code>

                <h4>Subir la presentación</h4>
                <p>Para subir la presentación haga click en el boton <b>Subir Presentación</b> (este aparece después de crear el primer slide).</p>

                <h4>Consideraciones</h4>
                <p>Contenido de la presentación no debe incluir los siguientes simbolos:</p>
                <ul>
                    <li>/</li>
                    <li>{'{'}</li>
                    <li>{'}'}</li>
                    <li>[</li>
                    <li>]</li>
                    <li>(</li>
                    <li>)</li>
                </ul>
            </div>
        </div>
    );
}