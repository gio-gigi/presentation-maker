import { useEffect, useState } from 'react';
import { APIRequestStatus } from "../constants/api_request";
import { PresentationInfoEntity } from "../infrastructure/entities/presentation_entity";
import { presentationRepository } from "../contexts/presentation_info_context";

export const usePresentationList = () => {
    const [status, setStatus] = useState<APIRequestStatus>({ status: 'loading' });
    const [presentations, setPresentations] = useState<PresentationInfoEntity[]>([]);
    useEffect(() => {
        const fetchPresentations = async () => {
            try {
                const presentations = await presentationRepository.getPresentationList(0);
                setPresentations(presentations);
                setStatus({ status: 'success' });
            } catch (error: any) {
                setStatus({ status: 'error', message: error.message });
            }
        }
        fetchPresentations();
    }, []);
    return { status, presentations };
}


