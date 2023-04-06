import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  // private newUrl='https://jsonplaceholder.typicode.com/posts/1/comments'
  // private url1='https://jsonplaceholder.typicode.com/posts/1'

  constructor(private httpClient: HttpClient) { }

  getPosts(){
    return this.httpClient.get(this.url);
  }

  // getData(){
  //   return this.httpClient.get(this.url1);
  // }

  // getPost(){
  //   return this.httpClient.get(this.newUrl);
  // }
}
