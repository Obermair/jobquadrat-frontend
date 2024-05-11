import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  openMenu: boolean = false;

  constructor(public dataService: DataService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.currentUser = localStorage.getItem('jwt_user') || '';
    this.dataService.currentUserId = localStorage.getItem('jwt_user_id') || '';
    this.dataService.currentUserRole = localStorage.getItem('jwt_user_role') || '';
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  create(){
    this.router.navigate(['create'], {relativeTo:this.route});
    this.openMenu = !this.openMenu;
  }

  view(){
    this.router.navigate(['view'], {relativeTo:this.route});
    this.openMenu = !this.openMenu;
  }

  profile(){
    this.router.navigate(['profile'], {relativeTo:this.route});
    this.openMenu = !this.openMenu;
  }

  chat(){
    this.router.navigate(['chat'], {relativeTo:this.route});
    this.openMenu = !this.openMenu;
  }
}
