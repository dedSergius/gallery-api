import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async getPassword(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['password'],
    });
  }

  async create(createUpdateUserDto: CreateUpdateUserDto): Promise<User> {
    const user = new User();
    user.username = createUpdateUserDto.username;
    user.password = createUpdateUserDto.password;
    return this.usersRepository.save(user);
  }

  async update(
    id: string,
    createUpdateUserDto: CreateUpdateUserDto,
  ): Promise<User> {
    await this.usersRepository.update(id, createUpdateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
