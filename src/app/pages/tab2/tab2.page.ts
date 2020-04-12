import { Component } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: Array<string> = [];

  post: Post = {
    mensaje: '',
    coords: null,
    position: false,
  };

  constructor(private postsService: PostsService, private route: Router) {}

  async crearPost() {

    const isCreated = await this.postsService.createPost(this.post);

    if(isCreated) {
      this.post = { 
        mensaje: '',
        coords: null,
        position: false,
      };

      this.route.navigateByUrl('/main/tabs/tab1');
    }
    
  }
}
