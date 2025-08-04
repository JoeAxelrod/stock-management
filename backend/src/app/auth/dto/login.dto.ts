import { IsEmail, IsOptional, IsArray } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsArray()
  roles?: string[];
}