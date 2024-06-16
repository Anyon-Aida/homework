import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly firestore = admin.firestore();

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      console.log(`Searching for user with email: ${email}`);
      const userDoc = await this.firestore.collection('users').where('email', '==', email).get();
      if (userDoc.empty) {
        console.log(`No user found with email: ${email}`);
        return undefined;
      }
      const user = userDoc.docs[0].data() as User;
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return undefined;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const userDocs = await this.firestore.collection('users').get();
      return userDocs.docs.map(doc => doc.data() as User);
    } catch (error) {
      console.error('Error finding all users:', error);
      return [];
    }
  }

  async findOne(id: string): Promise<User | undefined> {
    try {
      const userDoc = await this.firestore.collection('users').doc(id).get();
      if (!userDoc.exists) {
        console.log(`No user found with id: ${id}`);
        return undefined;
      }
      return userDoc.data() as User;
    } catch (error) {
      console.error('Error finding user by id:', error);
      return undefined;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.firestore.collection('users').doc(id).delete();
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }

  async create(user: User): Promise<User> {
    try {
      user.id = uuidv4(); // Generálunk egy egyedi azonosítót
      console.log(`Creating user with email: ${user.email} and id: ${user.id}`);
      const userRef = this.firestore.collection('users').doc(user.id);
      await userRef.set(user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  }
}
