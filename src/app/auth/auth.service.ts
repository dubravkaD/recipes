import { Injectable } from '@angular/core';

export interface User {
  uid?: string;
  username?: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
