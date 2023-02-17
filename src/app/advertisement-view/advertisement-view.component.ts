import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.scss']
})
export class AdvertisementViewComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
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
