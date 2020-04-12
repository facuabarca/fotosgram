import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Array<Post> = [];
  enabled: boolean = true;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.loadData();

    this.postService.newPost.subscribe((post: Post) => {
      this.posts.unshift(post);
    });
  }

  loadData(event?: any, pull: boolean = false): void {
    this.postService.getPosts(pull).subscribe(data => {
      this.posts.push(...data.posts);
      if (event) {
        event.target.complete();
        if (data.posts.length === 0) {
          this.enabled = false;
        }
      }
    });
  }

  reload(event: any): void {
    this.loadData(event, true);
    this.posts = [];
    this.enabled = true;
  }

}
