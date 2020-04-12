import { Component } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: Array<string> = [];

  loadGeolocation: boolean = false;

  post: Post = {
    mensaje: '',
    coords: null,
    position: false,
  };

  constructor(private postsService: PostsService, private route: Router, private geolocation: Geolocation) {}

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

  getGeo() {
    console.log(this.post);
    if(!this.post.position) {
      this.post.coords = null;
      this.loadGeolocation = false;
      this.post.coords = '';
      return;
    }

    this.loadGeolocation = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.loadGeolocation = false;
      this.post.coords = coords;
      console.log('coords;;; ',this.post.coords);
     }).catch((error) => {
      this.loadGeolocation = false;
     });

  }
}
