import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Image } from '../../images/entities/image.entity';
import { Roles } from '../../auth/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column('text', { default: [Roles.User], array: true })
  roles: Roles[];

  @Column({
    select: false,
    transformer: {
      from: (value: string) => value,
      to: (value: string) => bcrypt.hashSync(value, 10),
    },
  })
  password: string;

  @OneToMany(() => Image, (image) => image.owner)
  images: Image[];
}
