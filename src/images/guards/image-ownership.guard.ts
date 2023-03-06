import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.enum';
import { User } from '../../users/entities/user.entity';
import { ImagesService } from '../images.service';
import { plainToClass } from 'class-transformer';
import { IsUUID, validate } from 'class-validator';

class UuidParamValidator {
  @IsUUID()
  id: string;
}

@Injectable()
export class ImageOwnershipGuard implements CanActivate {
  constructor(private readonly imagesService: ImagesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const id = req.params.id;
    const user: User = req.user;

    const validator = plainToClass(UuidParamValidator, { id });
    const errors = await validate(validator);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed (id must be a UUID)');
    }

    const image = await this.imagesService.findById(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }

    if (
      !user.roles.find((r) => r == Roles.Admin) &&
      image.owner &&
      image.owner.id !== user.id
    ) {
      throw new ForbiddenException();
    }

    return true;
  }
}
