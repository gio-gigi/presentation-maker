import { UserInfo } from "../../../infrastructure/entities/user";

export interface PresentationInfoModel {
    idPresentation: number;
    title: string;
    content: string;
    imageURL: string;
    creationDate: Date;
    creator: UserInfo;
}