import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Advertisement } from '../api/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-save-advertisement',
  templateUrl: './save-advertisement.component.html',
  styleUrls: ['./save-advertisement.component.scss']
})
export class SaveAdvertisementComponent implements OnInit {

  advertisement: Advertisement = {
    id: "",
  }

  workingTimeOptions = ["Vollzeit", "Teilzeit"];
  errorMessage = "";
  placementBonus = 0;

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getDistricts();
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
