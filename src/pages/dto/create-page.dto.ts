import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PageButtons, Socials } from 'src/types/types';

export class CreatePageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsBoolean()
  premium: boolean;

  @ApiProperty()
  @IsArray()
  profilePicture: string[];

  @ApiProperty()
  @IsBoolean()
  verified: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty()
  @IsArray()
  socials: Socials[];

  @ApiProperty()
  @IsArray()
  buttons: PageButtons[];

  @ApiProperty()
  @IsString()
  backgroundImage: string;

  @ApiProperty()
  @IsString()
  font: string;

  @ApiProperty()
  @IsString()
  fontColor: string;

  @ApiProperty()
  @IsString()
  radius: string;

  @ApiProperty()
  @IsString()
  buttonStyle: string;

  @ApiProperty()
  @IsString()
  buttonTextColor: string;

  @ApiProperty()
  @IsString()
  background: string;
}
