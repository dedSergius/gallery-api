import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';

export class CreateUpdateImageDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isPublic? = true;
}
