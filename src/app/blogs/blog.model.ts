export class Blog {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public comments: Array<string> = [];

  constructor(id: string, name: string, desc: string, imagePath: string, comments: Array<string> = []) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.comments = comments;
  }
}