import { CreateFoodDTO } from "./food.dto";
import { v4 as uuidV4 } from "uuid";

export class Food {
  _id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date;

  static newInstanceFromDynamo(data: any): Food{
    const result = new Food();
    result._id = data._id.S;
    result.name = data.name.S;
    result.price = data.price.N;
    result.createdAt = new Date(Number(data.createdAt.N));
 
    if (data.updatedAt) {
      result.updatedAt = new Date(Number(data.updatedAt.N));
    }
       return result;
  }

  static newInstanceFromDTO(data: CreateFoodDTO) {
    const result = new Food();

    result._id = uuidV4();
    result.name = data.name;
    result.price = data.price;
    result.createdAt = new Date();

    return result;
  }
}