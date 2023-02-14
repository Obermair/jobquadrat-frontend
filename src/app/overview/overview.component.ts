import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.currentUser = localStorage.getItem('jwt_user') || '';
    this.dataService.currentUserId = localStorage.getItem('jwt_user_id') || '';
    this.dataService.currentUserRole = localStorage.getItem('jwt_user_role') || '';
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  create(){
    this.router.navigate(['create'], {relativeTo:this.route});
  }

  view(){
    this.router.navigate(['view'], {relativeTo:this.route});
  }

  
}
