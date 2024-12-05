import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodRepository } from './food.repository';
import { CreateFoodDTO, UpdateFoodDTO } from './food.dto';
import { Food } from './food.dynamo';


@Injectable()
export class FoodService {

  constructor(private readonly foodRepository: FoodRepository) { }
  
  create(createFoodDto: CreateFoodDTO) {

    return this.foodRepository.upsertOne(Food.newInstanceFromDTO(createFoodDto));
  }

  findAll() {
    return this.foodRepository.findAll();
  }

  findOne(id: string) {
    return this.foodRepository.findById(id);
  }

  async update(id: string, updateFoodDto: UpdateFoodDTO) {
    const foodDB = await this.foodRepository.findById(id);

    if (!foodDB) {
      throw new NotFoundException();
    }

    if (updateFoodDto.name) {
      foodDB.name = updateFoodDto.name
    }
    if (updateFoodDto.price) {
      foodDB.price = updateFoodDto.price
    }

    foodDB.updatedAt = new Date();
    await this.foodRepository.upsertOne(foodDB);

    return foodDB;

  }

  remove(id: string) {
    return this.foodRepository.deleteById(id);
  }
}
