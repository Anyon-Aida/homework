export class CatchPokemonDto {
    id: string;
    uid: string;
  
    constructor(id: string, uid: string) {
      this.id = id;
      this.uid = uid;
    }
  }