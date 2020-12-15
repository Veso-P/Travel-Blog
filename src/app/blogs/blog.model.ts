export class Blog {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;  
  public createdAt: number;
  public creator: string;
  public comments?: Array<string>; //for now I will leave the comments prop to be optional
  

  constructor(id: string, name: string, desc: string, imagePath: string, comments: Array<string>, createdAt: number, creator: string) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;   
    this.createdAt = createdAt;
    this.creator = creator;
    this.comments = comments;
  }
}