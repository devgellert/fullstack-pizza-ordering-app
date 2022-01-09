import { Injectable } from '@angular/core';

export interface LoginResponse {
  token: string;
  isCourier: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private static TOKEN_KEY = 'token';
  private static IS_COURIER = 'is_courier';

  saveUser(loginResponse: LoginResponse | null | undefined) {
    if (!loginResponse) {
      sessionStorage.removeItem(AuthStorageService.TOKEN_KEY);
      sessionStorage.removeItem(AuthStorageService.IS_COURIER);
      return;
    }
    sessionStorage.setItem(AuthStorageService.TOKEN_KEY, loginResponse.token);
    sessionStorage.setItem(
      AuthStorageService.IS_COURIER,
      loginResponse.isCourier ? '1' : '0'
    );
  }

  loadUser(): LoginResponse | null | undefined {
    const token = sessionStorage.getItem(AuthStorageService.TOKEN_KEY);
    const isCourier =
      sessionStorage.getItem(AuthStorageService.IS_COURIER) === '1';
    if (!token) {
      return null;
    }
    return {
      token: token,
      isCourier,
    };
  }
}
