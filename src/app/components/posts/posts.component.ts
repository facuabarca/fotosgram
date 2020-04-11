import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input() posts: Array<Post> = [];

  constructor() { }

  ngOnInit() {
    console.log('Conmponente posts: ', this.posts);
  }

}
