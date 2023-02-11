import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  view: string = "showAdvertisements";

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.currentUser = localStorage.getItem('jwt_user') || '';
    this.dataService.currentUserId = localStorage.getItem('jwt_user_id') || '';
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  showView(view: string){
    this.view = view;
  }
}
