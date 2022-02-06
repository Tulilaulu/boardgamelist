import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, BaseEntity } from 'typeorm';
import * as crypto from 'crypto';
import GameEntity from '../games/games.entity';
@Entity('users')
export default class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany( type => GameEntity, game => game.user)
  games: GameEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
  console.log('Before insert')
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column()
  password: string;
}
