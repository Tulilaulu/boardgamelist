import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, BaseEntity, ManyToOne, ManyToMany } from 'typeorm';
import UsersEntity from '../users/users.entity';

@Entity('game')
export default class GameEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  year: number;

  @ManyToOne(type => UsersEntity, user => user.games)
  user: UsersEntity;

  @Column({nullable: true})
  imagelink: string;

  @Column({nullable: true})
  players: string;

  @Column({nullable: true})
  type: string;

  @Column({nullable: true, length: 1000})
  description: string
}
