import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Convert } from "../infrastructure/converters/presentation_converter";
import { PresentationJson } from "../infrastructure/entities/presentation_entity";
import { useNavigate } from "react-router-dom";
import { useConfirmMessage } from "../contexts/confirm_message_context";
import { useUploadPresentationV2 } from "./useUploadPresentationV2";
import { APIRequestStatusEnum } from "../constants/api_request";

export const useUploadFile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [slides, setSlides] = useState<string[]>([]);
    const [isErrorShow, setIsErrorShow] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [presentation, setPresentation] = useState<PresentationJson | null>(null);
    const MAX_SIZE = 1024 * 1024 * 2;
    const { status, uploadPresentation } = useUploadPresentationV2();
    const navigate = useNavigate();
    const { showMessage } = useConfirmMessage();

    if (status.status === APIRequestStatusEnum.SUCCESS) {
        showMessage("Presentacion subida con exito");
        navigate("/", { replace: true });
    }

    const handleUpload = () => {
        if (slides.length === 0) return;
        const content = JSON.stringify(
          slides.map((slide, index) => ({ pageNumber: index, content: slide }))
        );
        const regex =
      /<[^>]*>|`[^`]*`|__([^_]+)__|\*\*([^*]+)\*\*|~~([^~]+)~~|\*([^*]+)\*|_([^_]+)_|!\[[^\]]*\]\([^)]*\)|\[[^\]]*\]\([^)]*\)|#{1,6}\s*|>\s*|\n-{3,}|\n={3,}/g;

        const title = slides[0].replace(regex, (match, p1, p2, p3, p4, p5) => {
        return p1 || p2 || p3 || p4 || p5 || "";
        });
        uploadPresentation(content, title);
    };

    useEffect(() => {
        toast.error(status.message, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }, [status]);

    const {getRootProps, getInputProps} = useDropzone(
        {
            multiple: false,
            maxSize: MAX_SIZE,
            accept: {
              'text/markdown': ['.md']
            },
            onDrop(acceptedFiles, fileRejections) {
                fileRejections.map(({errors}) => (
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
                    setIsValid(false);
                    setPresentation(null);
                    setIsLoading(true);
                    const reader = new FileReader();
                    reader.readAsText(file);

                    reader.onload = () => {
                        if(reader.result){
                            const content: string = reader.result as string;
                            try{
                                const presentation: PresentationJson = Convert.toPresentationJson(content);
                                if(presentation.slideJson.length>0){
                                    setIsValid(true);
                                }else{
                                    setIsErrorShow(true);
                                    setIsLoading(false);
                                    return;
                                }
                                setPresentation(presentation);
                                console.log(presentation)
                                presentation.slideJson.map((slide) => {
                                    slides.push(slide.content);
                                });
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

    return {getInputProps, getRootProps, isLoading, presentation, isErrorShow, setIsErrorShow, handleUpload, isValid};
}