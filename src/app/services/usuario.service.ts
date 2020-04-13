import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: User = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }


  getUsuario() {
    if(this.usuario._id) {
      this.verifyToken();
    }
    return { ...this.usuario }
  }

  login(email: string, password: string) {

    const data = {
      email, password
    };

    return new Promise(resolve => {

      this.http.post(`${URL}/user/login`, data)
        .subscribe((resp: any) => {
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

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }

  async verifyToken(): Promise<boolean> {

    await this.loadToken();

    if(!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${URL}/user/`, { headers }).subscribe((resp: any) => {
        if(resp.ok) {
          this.usuario = resp.usuario;
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  updateUsuario(user: User) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {

      
      this.http.post(`${URL}/user/update`, user, { headers })
      .subscribe((resp: any) => {
        if(resp.ok) {
          this.saveToken(resp.token);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });


  }
}
