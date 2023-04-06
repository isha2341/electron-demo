import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  posts:any;
  // obj:any;
  // post:any;
  postsLoaded: boolean=false;
  constructor(private service:PostService) {}

  ngOnInit() {
      this.service.getPosts()
        .subscribe(response => {
          this.posts = response;
          this.postsLoaded = true;
        });
        // this.service.getData()
        // .subscribe(response => {
        //   this.obj = response;
        // });
        // this.service.getPost()
        // .subscribe(response => {
        //   this.post = response;
        // });
  }
}
