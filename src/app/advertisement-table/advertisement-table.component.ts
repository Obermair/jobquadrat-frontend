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
    this.loadDefaultAdvertisements();
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
    //filter advertisements by searchInput
    if(this.searchInput != "" && this.filterDistricts.length == 0){
      this.dataService.displayedAdvertisements = this.dataService.totalAdvertisement.filter((advertisement: Advertisement) => {
        return advertisement.jobTitle?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.location?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.requirements?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.salary?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.benefits?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.assignment?.toLowerCase().includes(this.searchInput.toLowerCase());
      });
    }else if(this.searchInput == "" && this.filterDistricts.length != 0){
      //filter advertisements by filterDistricts
      this.dataService.displayedAdvertisements = this.dataService.totalAdvertisement.filter((advertisement: Advertisement) => {
        return this.filterDistricts.find((filterDistrict: District) => {
          return filterDistrict.id == advertisement.district?.id;
        });
      });
    }else
    //filter advertisements by searchInput and filterDistricts
    if(this.searchInput != "" && this.filterDistricts.length != 0){
      this.dataService.displayedAdvertisements = this.dataService.totalAdvertisement.filter((advertisement: Advertisement) => {
        return this.filterDistricts.find((filterDistrict: District) => {
          return filterDistrict.id == advertisement.district?.id;
        }) && (advertisement.jobTitle?.toLowerCase().includes(this.searchInput.toLowerCase()) || 
        advertisement.location?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.requirements?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.salary?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.benefits?.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        advertisement.assignment?.toLowerCase().includes(this.searchInput.toLowerCase()));
      });
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
