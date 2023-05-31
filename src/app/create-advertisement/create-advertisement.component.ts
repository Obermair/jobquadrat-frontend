import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../api/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.scss']
})
export class CreateAdvertisementComponent implements OnInit {

  showSuccessPlacement = false;
  showDeactivationAdvertisement = false;
  currentUserAd: Advertisement = {
    id: ""
  }
  placementData: any = {
    recruiter: "",
    recruiterMail: "",
    companyName: "",
    companyId: "",
    jobTitle: "",
    contactPerson: "",
    placementBonus: "",
    uid: "",
    street: "",
    houseNr: "",
    postalCode: "",
    city: ""
  }

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getAdvertisementsByUser();
  }

  loadMoreAdvertisements(){
    this.dataService.currentAdvertisementLimit += 30;
    this.dataService.getAdvertisementsByUser();
    // consume active placement bonus from dataService promise
  }

  save(){
    this.router.navigate(['save'], {relativeTo:this.route});
  }

  edit(advertisementId: string){
    this.router.navigate(['update/' + advertisementId], {relativeTo:this.route});
  }

  showDeactiveAdvertisement(userAd: Advertisement){
    this.currentUserAd = userAd;
    this.showDeactivationAdvertisement = true;
  }

  deactiveAdvertisement(){
    this.dataService.deactivateAdvertisement(this.currentUserAd); 
    this.showDeactivationAdvertisement = false;
  }

  toggleShowSuccessPlacement(userAd: Advertisement){
    this.showSuccessPlacement = !this.showSuccessPlacement;
    this.placementData.jobTitle = userAd.jobTitle;
    this.placementData.placementBonus = userAd.placementBonus;
    this.placementData.companyName = userAd.users_permissions_user?.username;
    this.placementData.contactPerson = userAd.users_permissions_user?.email;
    this.placementData.companyId = userAd.users_permissions_user?.id;
    this.currentUserAd = userAd;
  }

  successPlacement(){
    console.log(this.placementData)
    if(this.placementData.recruiter != "" && this.placementData.recruiterMail != "" && this.placementData.street != "" && this.placementData.houseNr != "" && this.placementData.postalCode != "" && this.placementData.city != "" && this.placementData.uid != ""){
      this.dataService.sendCompanySuccessPlacement(this.placementData);
      //deactivateAdvertisement
      this.dataService.deactivateAdvertisement(this.currentUserAd);
      
      //reload advertisements
      window.location.reload();
      
      this.showSuccessPlacement = !this.showSuccessPlacement;
    }
  }
}
