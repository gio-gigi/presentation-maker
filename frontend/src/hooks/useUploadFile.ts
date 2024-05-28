import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Convert } from "../infrastructure/converters/presentation_converter";
import { PresentationJson } from "../infrastructure/entities/presentation_entity";

export const useUploadFile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorShow, setIsErrorShow] = useState(false);
    const [presentation, setPresentation] = useState<PresentationJson | null>(null);
    const MAX_SIZE = 1024 * 1024 * 2;
    const {getRootProps, getInputProps} = useDropzone(
        {
            multiple: false,
            maxSize: MAX_SIZE,
            accept: {
              'text/markdown': ['.md']
            },
            onDrop(acceptedFiles, fileRejections) {
                const file = new FileReader;
              
                fileRejections.map(({file, errors}) => (
                    toast.error(errors[0].message, {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    })));
                acceptedFiles.map((file)=>{
                    setPresentation(null);
                    setIsLoading(true);
                    const reader = new FileReader();
                    reader.readAsText(file);

                    reader.onload = () => {
                        if(reader.result){
                            const content: string = reader.result as string;
                            try{
                                const presentation: PresentationJson = Convert.toPresentationJson(content);
                                console.log(presentation);
                                setPresentation(presentation);
                            }catch(e: any){
                                setIsErrorShow(true);
                                setIsLoading(false);
                            }
                        }
                    };
                });
            }
        }
    );

    useEffect(() => {
        setIsLoading(false);
    }, [presentation]);

    return {getInputProps, getRootProps, isLoading, presentation, isErrorShow, setIsErrorShow};
}