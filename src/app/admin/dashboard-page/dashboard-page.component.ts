import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsServise} from '../../shared/services/posts.servise';
import {Post} from '../../shared/intarfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  searchStr = '';
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  constructor(
    private postsService: PostsServise,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe( posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id);
      this.alert.warning('пост был удален');
    });
  }
}
