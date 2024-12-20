import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../api/models';
import { AdvertisementService } from '../api/services';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
 
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

  currentAssignmentPoint = "";
  assignmentPoints = "";
  currentRequirementPoint = "";
  requirementsPoints = "";
  currentBenefitPoint = "";
  benefitsPoints = "";
  currentJobInformationPoints = "";
  jobInformationPoints = "";

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute, 
    public advertisementService: AdvertisementService, private http: HttpClient) {
      this.http.get<any>('https://api.jobquadrat.com/api/jobs?filters[id][$eq]='+ this.route.snapshot.params['id'] + '&populate=*').pipe(
        map(response => this.dataService.transformResponse(response))
        ).subscribe(
        (data: any) => {
          if(data[0].users_permissions_user.id == this.dataService.currentUserId){
            this.advertisement = data[0];
            this.assignmentPoints = this.advertisement.assignment || "";
            this.requirementsPoints = this.advertisement.requirements || "";
            this.benefitsPoints = this.advertisement.benefits || "";
            this.jobInformationPoints = this.advertisement.jobInfo || "";
            this.loading = false;
          }
        }
      );  
  }

  addAssignmentPoint(){
    if(this.currentAssignmentPoint != ""){
      this.assignmentPoints += this.currentAssignmentPoint + "<*>";
      this.currentAssignmentPoint = "";
    }
  }
 
  assignmentPointsList(){
    if (this.assignmentPoints != ""){
      let assignmentPointsArray = this.assignmentPoints.split("<*>");
      assignmentPointsArray.pop();
      return assignmentPointsArray;
    } else{
      return [];
    }
  }

  removeAssignmentPoint(assignmentPoint: string){
    this.assignmentPoints = this.assignmentPoints.replace(assignmentPoint + "<*>", "");
  }

  addRequirementPoint(){
    if(this.currentRequirementPoint != ""){
      this.requirementsPoints += this.currentRequirementPoint + "<*>";
      this.currentRequirementPoint = "";
    }
  }

  requirementsPointsList(){
    if (this.requirementsPoints != ""){
      let requirementsPointsArray = this.requirementsPoints.split("<*>");
      requirementsPointsArray.pop();
      return requirementsPointsArray;
    } else{
      return [];
    }
  }

  removeRequirementPoint(requirementPoint: string){
    this.requirementsPoints = this.requirementsPoints.replace(requirementPoint + "<*>", "");
  }

  addBenefitPoint(){
    if(this.currentBenefitPoint != ""){
      this.benefitsPoints += this.currentBenefitPoint + "<*>";
      this.currentBenefitPoint = "";
    }
  }

  benefitsPointsList(){
    if (this.benefitsPoints != ""){
      let benefitsPointsArray = this.benefitsPoints.split("<*>");
      benefitsPointsArray.pop();
      return benefitsPointsArray;
    } else{
      return [];
    }
  }

  removeBenefitPoint(benefitPoint: string){
    this.benefitsPoints = this.benefitsPoints.replace(benefitPoint + "<*>", "");
  }

  addJobInformationPoint(){
    if(this.currentJobInformationPoints != ""){
      this.jobInformationPoints += this.currentJobInformationPoints + "<*>";
      this.currentJobInformationPoints = "";
    }
  }

  jobInformationPointList(){
    if (this.jobInformationPoints != ""){
      let jobInformationPointsArray = this.jobInformationPoints.split("<*>");
      jobInformationPointsArray.pop();
      return jobInformationPointsArray;
    } else{
      return [];
    }
  }

  removeJobInformationPoint(benefitPoint: string){
    this.jobInformationPoints = this.jobInformationPoints.replace(benefitPoint + "<*>", "");
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
    if(this.advertisement.jobTitle != undefined && this.advertisement.workingTime != undefined && this.advertisement.district != undefined && this.advertisement.salary != undefined && this.advertisement.location != undefined && this.assignmentPoints != "" && this.requirementsPoints != "" && this.benefitsPoints != ""&& this.jobInformationPoints != ""){
      this.advertisement.salary = this.advertisement.salary.toString();
      this.advertisement.assignment = this.assignmentPoints;
      this.advertisement.requirements = this.requirementsPoints;
      this.advertisement.benefits = this.benefitsPoints;
      this.advertisement.jobInfo = this.jobInformationPoints;

      this.dataService.updateAdvertisement(this.advertisement);
      this.router.navigate(['../../'], {relativeTo:this.route});
    }else{
      this.errorMessage = "Bitte füllen Sie alle Felder aus!"
    }
  }
 
}
