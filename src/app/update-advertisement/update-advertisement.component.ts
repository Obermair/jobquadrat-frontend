import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../api/models';
import { AdvertisementService } from '../api/services';
import { DataService } from '../data.service';
 
@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.scss']
})
export class UpdateAdvertisementComponent implements OnInit {

  advertisement: Advertisement = {
    id: "",
  }
  
  workingTimeOptions = ["Vollzeit", "Teilzeit"];
  errorMessage = "";
  placementBonus = 0;
  loading = true;

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute, 
    public advertisementService: AdvertisementService) {
      let filterParams: string = '?id=' + this.route.snapshot.params['id'];

      this.advertisementService.advertisementsCustomFilterGet(filterParams).subscribe(
        (data: any) => {
          if(data[0].users_permissions_user.id == this.dataService.currentUserId){
            this.advertisement = data[0];
            this.loading = false;
          }
        }
      );  
  }


  ngOnInit(): void {
    this.dataService.getDistricts();
    this.dataService.getPlacementBonusesByAdvertisement(this.route.snapshot.params['id']);
  }

  addPlacementBonus(){
    this.dataService.addPlacementBonus(this.placementBonus, this.route.snapshot.params['id']);
  }

  cancel(){
    this.router.navigate(['../../'], {relativeTo:this.route});
  }

  update(){
    if(this.advertisement.salary != undefined){
      this.advertisement.salary = this.advertisement.salary.toString();
    }

    if(this.advertisement.jobTitle != undefined && this.advertisement.workingTime != undefined && this.advertisement.district != undefined && this.advertisement.salary != undefined && this.advertisement.location != undefined && this.advertisement.assignment != undefined && this.advertisement.requirements != undefined && this.advertisement.benefits != undefined ){
      this.dataService.updateAdvertisement(this.advertisement);
      this.router.navigate(['../../'], {relativeTo:this.route});
    }else{
      this.errorMessage = "Bitte füllen Sie alle Felder aus!"
    }
  }
 
}
