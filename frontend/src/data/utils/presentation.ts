import { PresentationContentEntity } from "../../infrastructure/entities/presentation_content";
import { PresentationInfoEntity } from "../../infrastructure/entities/presentation_entity";
import { PresentationContentModel } from "../models/prod/presentation_content_model";
import { PresentationInfoModel } from "../models/prod/presentation_info_model";

export const presentationInfoEntityfromPresentationInfoModel = (presentationModel: PresentationInfoModel): PresentationInfoEntity => {
    return {
        id: presentationModel.idPresentation+'',
        title: presentationModel.title,
        imageUrl: presentationModel.imageURL,
        author: 'Author Name',
        createdAt: presentationModel.creationDate
    };
}

export const presentationContentEntityFromPresentationContentModel = (presentationModel: PresentationContentModel): PresentationContentEntity => {
    return {
        content: presentationModel.content
    }
}