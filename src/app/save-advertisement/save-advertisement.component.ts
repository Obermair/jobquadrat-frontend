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

  currentAssignmentPoint = "";
  assignmentPoints = "";
  currentRequirementPoint = "";
  requirementsPoints = "";
  currentBenefitPoint = "";
  benefitsPoints = "";
  currentJobInformationPoints = "";
  jobInformationPoints = "";

  workingTimeOptions = ["Vollzeit", "Teilzeit"];
  errorMessage = "";
  placementBonus = 0;

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getDistricts();
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

  cancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  save(){
    if(this.advertisement.jobTitle != undefined && this.advertisement.workingTime != undefined && this.advertisement.district != undefined && this.advertisement.salary != undefined && this.advertisement.location != undefined && this.assignmentPoints != "" && this.requirementsPoints != "" && this.benefitsPoints != "" && this.jobInformationPoints != ""){
      this.advertisement.salary = this.advertisement.salary.toString();
      this.advertisement.assignment = this.assignmentPoints;
      this.advertisement.requirements = this.requirementsPoints;
      this.advertisement.benefits = this.benefitsPoints;
      this.advertisement.jobInfo = this.jobInformationPoints;

      this.dataService.postAdvertisement(this.advertisement, this.placementBonus);
      this.router.navigate(['../'], {relativeTo:this.route});
    } else{
      this.errorMessage = "Bitte füllen Sie alle Felder aus!"
    }
  }
}
