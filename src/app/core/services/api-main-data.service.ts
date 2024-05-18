import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiMainDataService {
  constructor() {}
  baseURL: string = 'https://watbizness-api.eslamboully.online';
  version: number = 1;
}
