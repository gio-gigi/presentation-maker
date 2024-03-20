export interface IPresentation {
  idPresentation: number;
  title: string;
  content?: string;
  imageURL: string;
  creationDate: Date;
  creator: {
    email: string;
    name: string;
  };
}
