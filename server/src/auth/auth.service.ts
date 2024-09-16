import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { message: 'I am Sign In' };
  }

  signup() {
    return 'I am Sign Up';
  }
}
