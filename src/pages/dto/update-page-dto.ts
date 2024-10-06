import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { PageButtons, Socials } from '../../types/types';

export class UpdatePageDto {
  @ApiProperty({ example: 'Such amazing page' })
  @IsString()
  bio: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  premium: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  verified: boolean;

  @ApiProperty({ example: 'John192' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://imageurl.com' })
  @IsString()
  img: string;

  @ApiProperty({
    example: [
      { name: 'facebook', url: 'https://facebook.com', icon: 'facebook' },
    ],
    type: [Socials],
  })
  @IsArray()
  socials: Socials[];

  @ApiProperty({
    example: [
      {
        name: 'Contact me',
        url: 'https://fake-contact.com',
        image: 'https://imageurl.com',
      },
    ],
    type: [PageButtons],
  })
  @IsArray()
  buttons: PageButtons[];

  @ApiProperty({ example: 'https://backgroundimagelink.com' })
  @IsString()
  backgroundImage: string;

  @ApiProperty({ example: 'Arial' })
  @IsString()
  font: string;

  @ApiProperty({ example: 'red' })
  @IsString()
  fontColor: string;

  @ApiProperty({ example: 'lg' })
  @IsString()
  radius: string;

  @ApiProperty({ example: 'rounded' })
  @IsString()
  buttonStyle: string;

  @ApiProperty({ example: 'white' })
  @IsString()
  buttonTextColor: string;

  @ApiProperty({ example: '#FFF' })
  @IsString()
  background: string;
}
