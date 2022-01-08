import { Injectable } from '@angular/core';
import {ApiServiceService} from "./api-service.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private apiService: ApiServiceService) { }
}
