import { PrimaryKey } from '@mikro-orm/core';
import { Entity, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { PageButtons, Socials } from 'src/types/types';

@Entity({ collection: 'pages' })
export class Page {
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  bio: string;

  @Property()
  username: string;

  @Property({ default: [] })
  profilePicture: string[];

  @Property({ default: false })
  premium: boolean;

  @Property({ default: false })
  verified: boolean;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  img: string;

  @Property()
  backgroundImage: string;

  @Property({ default: [] })
  socials: Socials[];

  @Property({ default: [] })
  buttons: PageButtons[];

  @Property()
  background: string;

  @Property()
  font: string;

  @Property()
  fontColor: string;

  @Property()
  radius: string;

  @Property()
  buttonStyle: string;

  @Property()
  buttonTextColor: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
