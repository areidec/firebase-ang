import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/intarfaces';
import {PostsServise} from '../../shared/services/posts.servise';
import {AlertService} from '../shared/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  constructor(
    private postService: PostsServise,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    };
    this.postService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('Пост был создан');
    });
  }

}
