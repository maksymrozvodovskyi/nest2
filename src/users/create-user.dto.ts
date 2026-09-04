import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string!' })
  @MinLength(2, { message: 'Name must be at least 2 characters long!' })
  name: string;

  @IsString({ message: 'Bio must be a string!' })
  @MinLength(5, { message: 'Bio must be at least 5 characters long!' })
  bio: string;
}
