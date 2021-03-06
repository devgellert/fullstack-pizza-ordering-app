import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStorageService, LoginResponse } from './auth-storage.service';
import { UserService } from './user.service';

export interface UserAuthRequest {
  // name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token() {
    return this._token;
  }

  get isLoggedIn() {
    return this.token ? true : false;
  }

  private _token: string | null = null;

  constructor(
    private httpClient: HttpClient,
    //private userService: UserService,
    private authStorageService: AuthStorageService
    ) {
      const result = this.authStorageService.loadUser();
      this.setLoginResponse(result);
    }

    async login(userAuthRequest: UserAuthRequest) {
      const result = await (
        this.httpClient.post(
          'http://localhost:5000/api/auth/login',
          userAuthRequest
        ) as Observable<LoginResponse>
      ).toPromise();
      this.authStorageService.saveUser(result);

      this.setLoginResponse(result);
    }

    logout() {
      this.setLoginResponse(null);
      this.authStorageService.saveUser(null);
    }

    private setLoginResponse(result: LoginResponse | null | undefined) {
      if (!result) {
        this._token = null;
        //this.userService.setUser(null);
        return;
      }

      this._token = result.token;
      //this.userService.setUser(result.user);
    }


}
