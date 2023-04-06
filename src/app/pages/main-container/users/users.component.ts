import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  searchText:string='';
  selected:number=5;
  pages:any=1;
  totalUsers:any=this.userService.getUsers().length;
  constructor(
    private userService:UsersService,
    private route: ActivatedRoute,
    private router: Router
    ){}
    userList:any=this.userService.getUsers();
  public pageChangeEvent(){
    let item=this.userService.getUsers();
    if(item!=undefined){
      if(this.searchText!=''){
      item = item.filter((data:any) => (data.name?.toLowerCase().includes(this.searchText?.toLowerCase())||data.email?.toLowerCase().includes(this.searchText?.toLowerCase())||data.type?.includes(this.searchText)));
    }
    this.totalUsers=item.length;
    this.userList=item.slice((this.pages - 1) * this.selected,this.pages * this.selected);
    }
    const queryParams: Params = {page: this.pages, perPage: this.selected,search:this.searchText || null };
  this.router.navigate(
    [],
    {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  public onValueChange(event:any){
    if(event==""){
      this.pageChangeEvent()
    }
   }
}
