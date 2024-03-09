export interface PresentationInfoEntity {
    id: string;
    title: string;
    imageUrl?: string;
    author: string;
    createdAt: Date;
}

export interface PresentationToUploadEntity {
    title: string;
    image?: Blob;
    file: Blob;
}