import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { PageButtons, Socials } from 'src/types/types';

export class UpdatePageDto {
  @IsString()
  bio: string;

  @IsBoolean()
  premium: boolean;

  @IsBoolean()
  verified: boolean;

  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  img: string;

  @IsArray()
  socials: Socials[];

  @IsArray()
  buttons: PageButtons[];

  @IsString()
  backgroundImage: string;

  @IsString()
  font: string;

  @IsString()
  fontColor: string;

  @IsString()
  radius: string;

  @IsString()
  buttonStyle: string;

  @IsString()
  buttonTextColor: string;

  @IsString()
  background: string;
}
