import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { User } from 'src/app/interfaces/interfaces';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  loginUser = {
    email: 'facuabarca@gmail.com',
    password: '123456qA'
  }

  registerUser: User = {
    email: 'test@',
    password: '123456',
    name: 'test',
    avatar: 'av-1.png'
  }

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const isValid = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (isValid) {
      // navegar a tabs.
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta.
      this.uiService.alertInfo('Usuario y contraseña no son correctas');
    }
  }

  async register(fRegister: NgForm) {

    if(fRegister.invalid) {
      return;
    }
    const isValid = await this.usuarioService.register(this.registerUser);
    if (isValid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alertInfo('Ese correo electrónico ya existe');
    }
  }


  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
