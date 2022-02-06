import {
      Controller,
      Get,
      Post,
      Patch,
      Delete,
      Body,
      Param,
      HttpStatus,
      Request,
      UseGuards
      } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GamesService } from './games.service';
import { GameDTO } from './games.dto';

    @Controller('games')
    export class GamesController {
      constructor(private gamesService: GamesService) {}

      @Get()
      async showAllGames() {
        const games =  await this.gamesService.showAll();
        return {
          statusCode: HttpStatus.OK,
          message: 'Games fetched successfully',
          games
        };
      }

      @UseGuards(JwtAuthGuard)
      @Post()
      async createGame(@Body() data: GameDTO) {
      console.log(data);
      const user = await this.gamesService.create(data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Game created successfully',
          user
        };
      }

      @Get(':id')
      async getGame(@Param('id') id: number) {
        const data =  await this.gamesService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Game fetched successfully',
          data,
        };
      }

      @UseGuards(JwtAuthGuard)
      @Patch(':id')
      async uppdateGame(@Param('id') id: number, @Body() data: Partial<GameDTO>) {
        await this.gamesService.update(id, data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Game updated successfully',
        };
      }

      @UseGuards(JwtAuthGuard)
      @Delete(':id')
      async deleteGame(@Param('id') id: number) {
        await this.gamesService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Game deleted successfully',
        };
      }
    }
