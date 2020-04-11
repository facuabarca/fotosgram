import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { PostResponse } from '../interfaces/interfaces';

const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts: number = 0;

  constructor(private http: HttpClient) { }

  getPosts() {
    this.paginaPosts++;
    return this.http.get<PostResponse>(`${urlApi}/posts/?pagina=${this.paginaPosts}`);
  }

}
