import { Component } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

// Plugins
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

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

  constructor(private postsService: PostsService, private route: Router, private geolocation: Geolocation, private camera: Camera) {}

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
     }).catch((error) => {
      this.loadGeolocation = false;
     });

  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.processImage(options);
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.processImage(options);
  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.tempImages.push(img);
      }, (err) => {
       // Handle error
      });
  }
}
