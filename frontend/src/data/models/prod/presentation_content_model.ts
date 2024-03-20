import { UserInfo } from "../../../infrastructure/entities/user";

export interface PresentationContentModel {
    idPresentation: number;
    title: string;
    content: string;
    imageURL: string;
    creationDate: Date;
    creator: UserInfo;
}