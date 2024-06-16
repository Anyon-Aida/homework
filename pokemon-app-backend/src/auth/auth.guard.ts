import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { Request as ExpressRequest } from 'express';

interface CustomRequest extends ExpressRequest {
  user?: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const user = request.user;

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
