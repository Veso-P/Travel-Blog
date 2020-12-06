export class Blog {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public comments: Array<string> = [];
  public createdAt: number;

  constructor(id: string, name: string, desc: string, imagePath: string, comments: Array<string> = [], createdAt: number) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.comments = comments;
    this.createdAt = createdAt;
  }
}