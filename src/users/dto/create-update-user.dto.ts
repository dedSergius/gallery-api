import { IsString, Length } from 'class-validator';
export class CreateUpdateUserDto {
  @IsString()
  @Length(1, 50)
  username: string;

  @IsString()
  @Length(6)
  password: string;
}
