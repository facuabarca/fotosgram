import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { PostResponse, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts: number = 0;

  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  getPosts(pull: boolean = false) {
    if (pull) this.paginaPosts = 0;
    this.paginaPosts++;
    return this.http.get<PostResponse>(`${urlApi}/posts/?pagina=${this.paginaPosts}`);
  }

  createPost(post: Post) {

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.usuarioService.token
      });
      this.http.post(`${urlApi}/posts/`, post, { headers })
      .subscribe((resp: any) => {
        this.newPost.emit(resp.post);
        resolve(true);
      });
    });
  }

}
