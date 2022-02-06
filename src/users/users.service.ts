 import { Injectable, HttpStatus } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import GameEntity from '../games/games.entity';
    import UsersEntity from './users.entity';
    import { UsersDTO } from './users.dto';

    @Injectable()
    export class UsersService {
      constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
      ) {}

      async showAll() {
        return await this.usersRepository.find();
      }

      async create(data: UsersDTO) {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(user);
        return user;
      }

      async findByEmail(email: string): Promise<UsersDTO> {
        return await this.usersRepository.findOne({
          where: {
            email: email,
          },
        });
      }

      async findByName(name: string): Promise<UsersDTO> {
        return await this.usersRepository.findOne({
          where: {
            name: name,
          },
        });
      }
      async read(id: number) {
        return await this.usersRepository.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<UsersDTO>) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.usersRepository.delete({ id });
        return { deleted: true };	
      }
    
      async getGamesOfUser(userID: number): Promise<GameEntity[]> {
    	console.log(typeof(userID));
        const user: UsersEntity = await UsersEntity.findOne({where: {id: userID}, relations: ['games']});
	return user.games;
      }

    }
