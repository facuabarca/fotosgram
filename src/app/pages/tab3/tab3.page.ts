import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  usuario: User = { };

  constructor(private usuarioService: UsuarioService, private uiService: UiServiceService, private postsService: PostsService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
  }

  async update(fUpdate: NgForm) {

    if(fUpdate.invalid) { return; }
    const isUpdated = await this.usuarioService.updateUsuario(this.usuario);
    if(isUpdated) {
      // toast
      this.uiService.toastInfo('Usuario actualizado!');
    } else {
      // toast error.
      this.uiService.toastInfo('Error al actualizar el usuario');
    }
  }

  logout(): void {
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
  }

}
