import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { DataService } from '../data.service';
import localeDe from '@angular/common/locales/de';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertisement-profile',
  templateUrl: './advertisement-profile.component.html',
  styleUrls: ['./advertisement-profile.component.scss']
})
export class AdvertisementProfileComponent implements OnInit {

  showSuccessPlacement = false;
  showCompanyContact = false;
  newCommunicationMessage = "";
  placementData: any = {
    recruiter: "",
    recruiterMail: "",
    companyName: "",
    jobTitle: "",
    contactPerson: "",
    placementBonus: "",
    actualSalary: "",
  }
  errorMessageFileUpload = "";
  
  selectedFiles: File[] = [];

  constructor(public dataService: DataService, public router: Router) { }

  ngOnInit(): void {
    registerLocaleData(localeDe); 
  }

  createNewCommunication(){
    this.dataService.addChatCommunication(this.newCommunicationMessage, this.selectedFiles); 
  }

  removeFile(file: File) {
    // Datei aus der Liste entfernen without filter
    const index = this.selectedFiles.indexOf(file);
    this.selectedFiles.splice(index, 1);
  }

  onFileChange(event: any) {
    // Ausgewählte Dateien abrufen
    const files = event.target.files;

    if(this.selectedFiles.length + files.length > 5){
      this.errorMessageFileUpload = 'Sie können maximal 5 Dateien auf einmal hochladen.';
      return;
    }

    // Dateigröße und Typ überprüfen
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      //nur PDF und Word Dokument sind erlaubt
      if (file.type != 'application/pdf' && file.type != 'application/msword' && file.type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.errorMessageFileUpload = 'Nur PDF und Word Dokumente sind erlaubt.';
        this.selectedFiles = [];
        return;
      }


      if (file.size > 5 * 1024 * 1024) {
        this.errorMessageFileUpload = 'Dateigröße überschreitet das Limit von 5MB.';
        this.selectedFiles = [];
        return;
      }


      this.selectedFiles.push(file);
    }

    if (this.selectedFiles.length > 5) {
      this.errorMessageFileUpload = 'Sie können maximal 5 Dateien auf einmal hochladen.';
      this.selectedFiles = [];
      return;
    }

    this.errorMessageFileUpload = '';
  }

  showValueinHTMLList(value: string){
    if(value != ""){
      let valueArray = value.split("<*>");
      valueArray.pop();

      let listResult = "<ul class='list-disc'>";
      //add <li> tags to each element of the array
      for(let i = 0; i < valueArray.length; i++){
        listResult += "<li>" + valueArray[i] + "</li>";
      }
      listResult += "</ul>";
      
      return listResult;
    } else{
      return [];
    }
  }
    

  toggleShowSuccessPlacement(){
    this.showSuccessPlacement = !this.showSuccessPlacement;
    //init placement data
    this.placementData.companyName = this.dataService.advertisementProfile.users_permissions_user?.username;
    this.placementData.jobTitle = this.dataService.advertisementProfile.jobTitle;
    this.placementData.contactPerson = this.dataService.advertisementProfile.users_permissions_user?.email;
    this.placementData.placementBonus = this.dataService.advertisementProfile.placementBonus;
    this.placementData.actualSalary = this.dataService.advertisementProfile.salary;
  }

  toggleCompanyContact(){
    this.showCompanyContact = !this.showCompanyContact;
  }

  successPlacement(){
    this.placementData.recruiter = localStorage.getItem('jwt_user') + '(ID: ' + localStorage.getItem('jwt_user_id') + ")";
    this.placementData.recruiterMail = localStorage.getItem('jwt_user_email');
    this.dataService.sendRecruiterSuccessPlacement(this.placementData);
    //deactivateAdvertisement
    this.dataService.deactivateAdvertisement(this.dataService.advertisementProfile);
    //reload advertisements
    window.location.reload();
    
    this.showSuccessPlacement = !this.showSuccessPlacement;
  }
}
