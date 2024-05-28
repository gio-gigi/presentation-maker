
export interface PresentationInfoEntity {
    id: string;
    title: string;
    imageUrl?: string;
    author: string;
    createdAt: Date;
}

export interface PresentationToUploadEntity {
    title?: string;
    image: Blob;
    file: string;
}

export interface PresentationToShowEntity {
    content: string;
}

export interface SlideJson {
    pageNumber: number;
    content:    string;
}

export interface PresentationJson {
    slideJson: SlideJson[];
}
