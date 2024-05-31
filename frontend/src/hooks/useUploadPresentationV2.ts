import { useEffect, useRef, useState } from "react";
import {
  APIRequestStatus,
  APIRequestStatusEnum,
} from "../constants/api_request";
import { presentationRepository } from "../contexts/presentation_info_context";
import { PresentationToUploadEntity } from "../infrastructure/entities/presentation_entity";
import { html_to_image } from "../utils/presentation/html_to_image";
import UnauthorizedError from "../errors/UnautherizedError";
import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../constants/errors";

export const useUploadPresentationV2 = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<APIRequestStatus>({
    status: APIRequestStatusEnum.NOT_STARTED,
  });

  const setLoading = async () => {
    setStatus({ status: APIRequestStatusEnum.LOADING });
  };

  const uploadPresentation = async (content: string, title: string) => {
    try {
      const image = document.getElementById("slide-0");
      if (!image) {
        throw new Error(ErrorType.UPLOAD_ERROR);
      }
      if (!title || title === "") {
        throw new Error(ErrorType.NO_TITLE);
      }

      const blobImage = await html_to_image(image);
      await setLoading();
      const presentation: PresentationToUploadEntity = {
        file: content,
        image: blobImage,
        title,
      };
      console.log(content);
      const response = await presentationRepository.uploadPresentation(
        presentation
      );
      if (response) {
        setStatus({ status: APIRequestStatusEnum.SUCCESS });
        return;
      }
      throw new Error(ErrorType.UPLOAD_ERROR);
    } catch (error: any) {
      const errorCode = error.response?.status;
      console.log(errorCode);
      if (errorCode === 401) {
        logout();
        navigate("/login");
      }
      setStatus({ status: APIRequestStatusEnum.ERROR, message: error.message });
    }
  };
  useEffect(() => {
    console.log(status);
  }, [status]);
  return { status, uploadPresentation };
};