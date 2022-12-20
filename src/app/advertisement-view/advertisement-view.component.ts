import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.scss']
})
export class AdvertisementViewComponent implements OnInit {

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    //this.dataService.authenticateDevCompany();
    this.loadDefaults();
    this.dataService.getAmountOfAdvertisements();
    this.dataService.getDistricts();
    this.dataService.currentUser = localStorage.getItem('jwt_user') || '';
  }

  loadDefaults(){
    this.dataService.currentLimit = 50;
    this.dataService.getAdvertisements();
  }

  switchToTable() {
    this.dataService.currentView = "table";
  }  

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
