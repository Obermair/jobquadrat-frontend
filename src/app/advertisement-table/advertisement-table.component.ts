import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../api/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advertisement-table',
  templateUrl: './advertisement-table.component.html',
  styleUrls: ['./advertisement-table.component.scss']
})
export class AdvertisementTableComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  changeAdvertisementProfile(advertisement: Advertisement){
    this.dataService.advertisementProfile = advertisement;
  }

}
