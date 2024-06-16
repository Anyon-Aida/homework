import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../serviceAccountKey.json';

@Injectable()
export class FirebaseAdminService {
  private firebaseApp: admin.app.App;

  constructor() {
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  getFirestore() {
    return this.firebaseApp.firestore();
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.firebaseApp.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
}
