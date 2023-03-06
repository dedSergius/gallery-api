import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/decorators/roles.decorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles as Role } from './auth/roles.enum';
import { ImagesService } from './images/images.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('clean')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  cleanGallery() {
    return this.imagesService.clean();
  }

  @Get('img/:id')
  async getImage(@Param('id') id, @Res({ passthrough: true }) res) {
    const { file, mimetype } = await this.imagesService.getFile(id);
    res.set({
      'Content-Type': mimetype,
    });
    return file;
  }
}
