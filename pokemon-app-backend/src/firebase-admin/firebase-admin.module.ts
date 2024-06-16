// src/firebase-admin/firebase-admin.module.ts

import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';

@Module({
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService], // Exportáljuk a FirebaseAdminService-t
})
export class FirebaseAdminModule {}
