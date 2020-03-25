import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsServise} from '../shared/services/posts.servise';
import {Observable} from 'rxjs';
import {Post} from '../shared/intarfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsServise
  ) { }

  ngOnInit() {
    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id'])
        })
      )
  }

}
