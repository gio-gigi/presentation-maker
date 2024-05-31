import './styles/styles.css';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SlideV2 } from '../../components/slide/slidev2';
import { LoadingSpinner } from '../../components/loading_spinner/loading_spinner';
import { useUploadFile } from '../../hooks/useUploadFile';
import { ErrorMessage } from '../../components/error_message/error_message';

export const FileUploader = () => {
    const {
        getInputProps, 
        getRootProps, 
        isLoading, 
        presentation,
        setIsErrorShow,
        isErrorShow,
        isValid,
        handleUpload,
    } = useUploadFile();

    return (
        <div className="file_uploader_root">
            {isErrorShow && <ErrorMessage setIsErrorShow={setIsErrorShow} message='El formato es incorrecto'/>}
            <div className="file_uploader_wrapper">
                <div {...getRootProps({className: "file_dropzone"})}>
                    <input {...getInputProps()}/>
                    <p>Arrastra tu archivo o seleccionalo dando click aquí.</p>
                </div>
                <div className='preview' >
                    {
                        isLoading && 
                        <LoadingSpinner 
                            style={
                                {position: 'absolute'}
                            }/>
                    }
                    {
                        presentation && presentation.slideJson.map((slide, index) => 
                            {
                                return <SlideV2 slide={{content: slide.content}} id={`slide-${index}`}/>
                            })
                    }
                </div>
                <div className='float-upload-button'>
                    <button className="upload-button" onClick={handleUpload}
                        disabled={!isValid}>
                        Subir Presentacion
                    </button>
                </div>
            </div>
            <ToastContainer
                position='bottom-right'
                autoClose = {1000}
                hideProgressBar = {true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
            />
        </div>
    );
}