import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { UtilService } from '../shared/services/util.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly utilService: UtilService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const newPassword = await this.utilService.encrypt(createUserDto.password);
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: newPassword,
    });

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({where:{},select:["email","id","username"]});
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();
    return this.userRepository.remove(user);
  }
}
