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
  errorMessage = "";
  placementBonus = 0;

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute, 
    public advertisementService: AdvertisementService) {
      let filterParams: string = '?id=' + this.route.snapshot.params['id'];

      this.advertisementService.advertisementsCustomFilterGet(filterParams).subscribe(
        (data: any) => {
          this.advertisement = data[0];
        }
      );  
  }


  ngOnInit(): void {
    this.dataService.getDistricts();
    this.dataService.getPlacementBonusesByAdvertisement(this.route.snapshot.params['id']);
  }

  addPlacementBonus(bonus: number, advertisementId: number){
    this.dataService.addPlacementBonus(bonus, advertisementId);
  }

  cancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  save(){
    if(this.advertisement.jobTitle != undefined && this.advertisement.workingTime != undefined && this.advertisement.district != undefined && this.advertisement.salary != undefined && this.advertisement.location != undefined && this.advertisement.assignment != undefined && this.advertisement.requirements != undefined && this.advertisement.benefits != undefined ){
      this.dataService.postAvertisement(this.advertisement, this.placementBonus);
      this.router.navigate(['../'], {relativeTo:this.route});
    }else{
      this.errorMessage = "Bitte füllen Sie alle Felder aus!"
    }
  }
}
