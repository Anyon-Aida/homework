import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';

@Module({
  providers: [PokemonService, FirebaseAdminService],
  controllers: [PokemonController],
})
export class PokemonModule {}
