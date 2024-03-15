import { Presentation } from "../models/Presentation";
import { AppDataSource } from "../config/data-source";
import { Repository } from "typeorm";
import { User } from "../models/User";

export class PresentationService {
  private presentationRepository: Repository<Presentation>;
  private userRepository: Repository<User>;
  constructor(presentationRepository: Repository<Presentation>, userRepository: Repository<User>) {
    this.presentationRepository = presentationRepository;
    this.userRepository = userRepository;
  }
  public async createPresentation(email: string, title: string, txtName: string, imageName: string): Promise<Presentation> {
    const presentation = new Presentation();
    presentation.title = title;
    presentation.imageName = imageName;
    presentation.user = await this.userRepository.findOneByOrFail({ email });
    presentation.txtName = txtName;
    await this.presentationRepository.save(presentation);
    return presentation;
  }

  public async getPresentations(): Promise<Presentation[]> {
    return this.presentationRepository.find();
  }
}
