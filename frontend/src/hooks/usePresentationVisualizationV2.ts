import { useEffect, useState } from "react";
import { presentationRepository } from "../contexts/presentation_info_context";
import { VisualizablePresentationEntity, VisualizableSlideEntity } from "../infrastructure/entities/presentation_preview_entity";
import { file_to_formatted_text } from "../utils/presentation/formatted_text_to_file";
import { Slides } from "../utils/presentation/formatted_text_to_slides";
import { APIRequestStatus, APIRequestStatusEnum } from "../constants/api_request";
import { set } from "react-hook-form";

interface UsePresentationVisualizationProps {
    id: string | undefined;
}

export const usePresentationVisualizationV2 = ({ id }: UsePresentationVisualizationProps) => {
    const [slides, setSlides] = useState<string[] | undefined>(undefined);
    const [status, setStatus] = useState<APIRequestStatus>({status: APIRequestStatusEnum.LOADING});
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(-1);
    const [currentSlide, setCurrentSlide] = useState<string | undefined>(undefined);

    const getPresentation = async () => {
        try {
            if (!id) {
                throw new Error("No presentation id provided");
            }
            const { content } = await presentationRepository.getPresentation(id);
            console.log(content);
            const currentSlides = JSON.parse(content).map((slide: { content: string }) => slide.content);
            setSlides(currentSlides);
            setStatus({status: APIRequestStatusEnum.SUCCESS});
            setCurrentSlideIndex(0);
        } catch (error: any) {
            setStatus({status: APIRequestStatusEnum.ERROR, message: error.message});
        }
    }

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => {
            if (prev < slides!.length - 1) {
                return prev + 1;
            }
            return prev;
        });
    }

    const prevSlide = () => {
        setCurrentSlideIndex((prev) => {
            if (prev > 0) {
                return prev - 1;
            }
            return prev;
        });
    }

    useEffect(() => {
        getPresentation();
    }, []);

    useEffect(() => {
        if (slides) {
            setCurrentSlide(slides[currentSlideIndex]);
        }
    }, [currentSlideIndex, slides]);

    return { status, nextSlide, currentSlide, prevSlide, currentSlideIndex };
}