import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { CatchPokemonDto } from './dto/catch-pokemon.dto';

@Injectable()
export class PokemonService {
  private readonly firestore;

  constructor(private readonly firebaseAdminService: FirebaseAdminService) {
    this.firestore = this.firebaseAdminService.getFirestore();
  }

  async catchPokemon(id: string, email: string) {
    console.log(`Attempting to catch Pokemon with id ${id} for user with email ${email}`);
    const userCollection = this.firestore.collection('users');
    const userSnapshot = await userCollection.where('email', '==', email).get();

    if (userSnapshot.empty) {
      console.error('User does not exist');
      throw new Error('User does not exist');
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const caughtPokemons = userData?.caughtPokemons || [];

    if (!caughtPokemons.includes(id)) {
      caughtPokemons.push(id);
      await userDoc.ref.update({ caughtPokemons });
    }

    return { caughtPokemons };
  }

  async releasePokemon(id: string, email: string) {
    console.log(`Attempting to release Pokemon with id ${id} for user with email ${email}`);
    const userCollection = this.firestore.collection('users');
    const userSnapshot = await userCollection.where('email', '==', email).get();

    if (userSnapshot.empty) {
      console.error('User does not exist');
      throw new Error('User does not exist');
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const caughtPokemons = userData?.caughtPokemons || [];

    const updatedPokemons = caughtPokemons.filter((pokemonId: string) => pokemonId !== id);
    await userDoc.ref.update({ caughtPokemons: updatedPokemons });

    return { caughtPokemons: updatedPokemons };
  }
}
