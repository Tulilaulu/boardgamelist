import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as crypto from 'crypto';
@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
  console.log('Before insert')
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column()
  password: string;
}
