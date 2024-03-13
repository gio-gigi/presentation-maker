import { useEffect, useRef, useState } from "react";
import { APIRequestStatus, APIRequestStatusEnum } from "../constants/api_request";
import { presentationRepository } from "../contexts/presentation_info_context";
import { PresentationToUploadEntity } from "../infrastructure/entities/presentation_entity";
import { html_to_image } from "../utils/presentation/html_to_image";

export const useUploadPresentation = () => {
    const [status, setStatus] = useState<APIRequestStatus>({ status: APIRequestStatusEnum.NOT_STARTED });

    const setLoading = async () => {
        setStatus({ status: APIRequestStatusEnum.LOADING });
    }

    const uploadPresentation = async (content: string, title?: string) => {
        try {
            const image = document.getElementById('slide-0');
            if (image) {
                const blobImage = await html_to_image(image);
                await setLoading();
                const presentation: PresentationToUploadEntity = {
                    file: content,
                    image: blobImage,
                    title
                }
                const response = await presentationRepository.uploadPresentation(presentation);
                if (response) {
                    setStatus({ status: APIRequestStatusEnum.SUCCESS });
                    return;
                }
                throw new Error('No se pudo subir la presentación');
            }
            throw new Error('No se pudo obtener la imagen de la presentación');
        } catch (error: any) {
            setStatus({ status: APIRequestStatusEnum.ERROR, message: error.message});
        }
    }
    useEffect(() => {
        console.log(status);
    }, [status]);
    return { status, uploadPresentation };
}