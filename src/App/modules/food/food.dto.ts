import {  } from "@nestjs/mapped-types";
import { ApiProperty,PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFoodDTO{

  @ApiProperty({description:'Food name'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({description:'Food price'})
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdateFoodDTO extends PartialType(CreateFoodDTO){}