import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateUpdateImageDto } from './dto/create-update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ImageFilterInterceptor } from './interceptors/image-filter.intercetor';
import { Filter } from 'src/common/decorators/filter.decorator';
import { ImageOwnershipGuard } from 'src/images/guards/image-ownership.guard';
import { ImageUrlInterceptor } from './interceptors/image-url.interceptor';

@Controller('/api/images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(ImageUrlInterceptor)
  create(
    @UploadedFile()
    file: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description: string | undefined,
    @Body('is_public') isPublic: boolean,
  ) {
    const dto = new CreateUpdateImageDto();
    dto.name = name;
    dto.description = description ? description : undefined;
    dto.isPublic = isPublic;
    return this.imagesService.create(dto, file);
  }

  @Get()
  @UseInterceptors(ImageFilterInterceptor)
  @UseInterceptors(ImageUrlInterceptor)
  findForUser(@Filter() filter) {
    return this.imagesService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(ImageOwnershipGuard)
  @UseInterceptors(ImageUrlInterceptor)
  findOne(@Param('id') id: string) {
    return this.imagesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(ImageOwnershipGuard)
  @UseInterceptors(ImageUrlInterceptor)
  update(
    @Param('id') id: string,
    @Body() createUpdateImageDto: CreateUpdateImageDto,
  ) {
    return this.imagesService.update(id, createUpdateImageDto);
  }

  @Delete(':id')
  @UseGuards(ImageOwnershipGuard)
  @UseInterceptors(ImageUrlInterceptor)
  remove(@Param('id') id: string) {
    return this.imagesService.delete(id);
  }
}
