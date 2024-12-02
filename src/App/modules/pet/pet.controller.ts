import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  Patch,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto, UpdatePetDto } from './pet.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @ApiOperation({ summary: 'Create new pet' })
  create(@Body() createPetDto: PetDto) {
    return this.petService.create(createPetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pet by id' })
  findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pet by id' })
  updateOne(@Param('id') id: string, @Body() dto: UpdatePetDto) {
    return this.petService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete pet by id' })
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }
}
