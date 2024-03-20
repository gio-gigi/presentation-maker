import { PresentationInfoEntity } from "../../infrastructure/entities/presentation_entity";
import { PresentationInfoModel } from "../models/prod/presentation_info_model";

export const presentationEntityfromPresentationModel = (presentationModel: PresentationInfoModel): PresentationInfoEntity => {
    return {
        id: presentationModel.idPresentation+'',
        title: presentationModel.title,
        imageUrl: presentationModel.imageURL,
        author: 'Author Name',
        createdAt: presentationModel.creationDate
    };
}