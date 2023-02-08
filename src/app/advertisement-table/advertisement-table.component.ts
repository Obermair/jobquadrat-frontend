import { Component, OnInit } from '@angular/core';
import { Advertisement, District } from '../api/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advertisement-table',
  templateUrl: './advertisement-table.component.html',
  styleUrls: ['./advertisement-table.component.scss']
})
export class AdvertisementTableComponent implements OnInit {

  searchInput = "";
  filterDistricts: District[] = [];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  loadDefaultAdvertisements(){
    if(this.searchInput == "" && this.filterDistricts.length == 0){
      this.dataService.currentLimit = 50;
      this.dataService.getAdvertisements();
    }
  }

  changeAdvertisementProfile(advertisement: Advertisement){
    this.dataService.currentView = "profile";
    this.dataService.advertisementProfile = advertisement;
  }

  loadMoreAdvertisements(){
    this.dataService.currentLimit += 5;
    this.dataService.getAdvertisements();
  }
  
  searchAndFilterAdvertisements(){ 
    if(this.searchInput != "" && this.filterDistricts.length == 0){
      this.dataService.getFilteredAdvertisements(this.searchInput);
    }else if(this.searchInput == "" && this.filterDistricts.length != 0){
      this.dataService.getFilteredAdvertisementsByDistricts(this.filterDistricts);
    }else
    //filter advertisements by searchInput and filterDistricts
    if(this.searchInput != "" && this.filterDistricts.length != 0){
      this.dataService.getFilteredAdvertisementsByDistrictsAndSearch(this.filterDistricts, this.searchInput);
    }
    else{
      this.loadDefaultAdvertisements();
    }
  }

  districtChanged(district: District){
    if(this.filterDistricts.includes(district)){
      this.filterDistricts = this.filterDistricts.filter((filterDistrict: District) => {
        return filterDistrict.id != district.id;
      });
    }else{
      this.filterDistricts.push(district);
    }

    this.searchAndFilterAdvertisements();
  }
}
