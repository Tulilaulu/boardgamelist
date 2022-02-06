import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import GameEntity from './games.entity';
import { GameDTO } from './games.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private gamesRepository: Repository<GameEntity>,
  ) {}

  async showAll() {
    return await this.gamesRepository.find();
  }

  async create(data: GameDTO) {
    const user = this.gamesRepository.create(data);
    await this.gamesRepository.save(user);
    return user;
  }

  async findByName(name: string): Promise<GameEntity> {
    return await this.gamesRepository.findOne({
      where: {
        name: name,
      },
    });
  }
  async read(id: number) {
    return await this.gamesRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<GameDTO>) {
    await this.gamesRepository.update({ id }, data);
    return await this.gamesRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.gamesRepository.delete({ id });
    return { deleted: true };
  }
}
