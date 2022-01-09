import { Injectable } from '@angular/core';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  private static TOKEN_KEY = 'token';

  saveUser(loginResponse: LoginResponse | null | undefined){
    if(!loginResponse){
      sessionStorage.removeItem(AuthStorageService.TOKEN_KEY);
      return;
    }
    sessionStorage.setItem(AuthStorageService.TOKEN_KEY, loginResponse.token);
  }

  loadUser(): LoginResponse | null | undefined {
    const token = sessionStorage.getItem(AuthStorageService.TOKEN_KEY);
    if(!token){
      return null;
    }
    return {
      token: token,
    }
  }

}
