import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.scss']
})
export class AdvertisementViewComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    //this.dataService.authenticateDevCompany();
    this.loadDefaults();
    this.dataService.getAmountOfAdvertisements();
    this.dataService.getDistricts();
  }

  loadDefaults(){
    this.dataService.currentLimit = 50;
    this.dataService.getAdvertisements();
  }

  switchToTable() {
    this.dataService.currentView = "table";
  }  

}
