import { Component, OnInit } from '@angular/core';
import {PostsServise} from '../shared/services/posts.servise';
import {Observable} from 'rxjs';
import {Post} from '../shared/intarfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(
    private postService: PostsServise
  ) { }

  ngOnInit() {
    this.posts$ = this.postService.getAll();
  }

}
