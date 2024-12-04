import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Age' })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Image url' })
  pic: string;
}

export class UpdatePetDto extends PartialType(PetDto) {}
