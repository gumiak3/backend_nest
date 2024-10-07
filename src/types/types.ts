import { ApiProperty } from '@nestjs/swagger';

export class Socials {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  icon: string;
}

export class PageButtons {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  image: string;
}
