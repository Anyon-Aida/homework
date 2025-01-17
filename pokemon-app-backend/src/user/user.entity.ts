export class User {
  id: string; // Firestore használatához string típusú id
  email: string;
  password: string;
  username: string;

  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
