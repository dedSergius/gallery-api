import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateUpdateImageDto } from './dto/create-update-image.dto';
import * as path from 'path';
import { createReadStream } from 'fs';
import { getType as getMymeType } from 'mime';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async findAll(filter: any = {}): Promise<Image[]> {
    return this.imagesRepository.find(filter);
  }

  async findById(id: string): Promise<Image> {
    return this.imagesRepository.findOne({ where: { id } });
  }

  async create(
    createUpdateImageDto: CreateUpdateImageDto,
    file: Express.Multer.File,
  ): Promise<Image> {
    const image = new Image();
    image.id = path.basename(file.filename, path.extname(file.filename));
    image.extension = path.extname(file.filename);
    image.name = createUpdateImageDto.name || file.originalname;
    image.description = createUpdateImageDto.description || '';
    image.isPublic = createUpdateImageDto.isPublic;
    return this.imagesRepository.save(image);
  }

  async update(
    id: string,
    createUpdateImageDto: CreateUpdateImageDto,
  ): Promise<Image> {
    await this.imagesRepository.update(id, createUpdateImageDto);
    return this.imagesRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.imagesRepository.delete(id);
  }

  async clean(): Promise<void> {
    await this.imagesRepository.clear();
  }

  async getFile(id: string): Promise<any> {
    const image = await this.imagesRepository.findOne({
      where: { id },
      select: ['extension'],
    });
    const file = createReadStream(
      path.join(process.cwd(), 'uploaded/images', id + image.extension),
    );
    return {
      file: new StreamableFile(file),
      mimetype: getMymeType(image.extension),
    };
  }
}
