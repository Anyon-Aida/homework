import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { CatchPokemonDto } from './dto/catch-pokemon.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('catch')
  async catchPokemon(@Body() catchPokemonDto: CatchPokemonDto) {
    return this.pokemonService.catchPokemon(catchPokemonDto.id, catchPokemonDto.uid);
  }

  @Post('release')
  async releasePokemon(@Body() catchPokemonDto: CatchPokemonDto) {
    return this.pokemonService.releasePokemon(catchPokemonDto.id, catchPokemonDto.uid);
  }
}
