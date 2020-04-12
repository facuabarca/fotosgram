import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/interfaces';

const URL = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;

  constructor(private http: HttpClient, private storage: Storage) { }

  login(email: string, password: string) {

    const data = {
      email, password
    };

    return new Promise(resolve => {

      this.http.post(`${URL}/user/login`, data)
        .subscribe((resp: any) => {
          console.log(resp);
          if (resp.ok) {
            this.saveToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });


  }

  register(usuario: User): Promise<any> {

    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario)
        .subscribe((resp: any) => {
          console.log(resp);
          if (resp.ok) {
            this.saveToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', this.token);
  }
}
