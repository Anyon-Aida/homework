import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { PokemonModule } from './pokemon/pokemon.module'; // Add PokemonModule if needed

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseAdminModule,
    UserModule,
    AuthModule,
    PokemonModule, // Add PokemonModule if needed
  ],
})
export class AppModule {}
