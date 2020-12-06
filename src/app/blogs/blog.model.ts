export class Blog {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;  
  public createdAt: number;
  public comments: string;

  constructor(id: string, name: string, desc: string, imagePath: string, comments: string, createdAt: number) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;   
    this.createdAt = createdAt;
    this.comments = comments;
  }
}