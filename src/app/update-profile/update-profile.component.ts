import { Component, OnInit } from '@angular/core';
import { NewUsersPermissionsUser, UsersPermissionsUser } from '../api/models';
import { DataService } from '../data.service';
import { UsersPermissionsUserService } from '../api/services';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  errorMessage = "";
  successMessage = "";
  showDeactivationAccount = false;
  showResetPasswort = false;
  oldPassword = "";
  newPassword = "";
  passwordRepeat = "";
  errorMessageFileUpload = "";
  currentServicePoint = "";
  uploadImage: File | null = null;

  constructor(public dataService: DataService, public userService: UsersPermissionsUserService, private router: Router, private http: HttpClient) { 
    this.dataService.user.description = localStorage.getItem('jwt_user_description') ?? '';
    this.dataService.user.username = localStorage.getItem('jwt_user') ?? '';
    this.dataService.user.email = localStorage.getItem('jwt_user_email') ?? '';
  }

  ngOnInit(): void {
    this.dataService.getCurrentUser();
  }

  update(): void {
    if(this.uploadImage != null){
      const formData = new FormData();
      formData.append('files', this.uploadImage);

      //delete old image if exists
      if(this.dataService.user.profile_img_id != "" && this.dataService.user.profile_img_id != null){
        let deleteId = this.dataService.user.profile_img_id;
        this.dataService.user.profile_img_id = "";
        this.http.delete<any>('http://v2202211186550206218.quicksrv.de:4300/api/upload/files/' + deleteId)
        .subscribe();
      }

      this.http.post<any>('http://v2202211186550206218.quicksrv.de:4300/api/upload', formData).subscribe(data => {
          this.dataService.user.profile_img_id = data[0].id;
          this.dataService.user.profile_img = data[0].url;
          this.updateUserData();
        }
      )
    }
    else{
      this.updateUserData();
    }
  }

  updateUserData(){
    if(this.dataService.user.username != "" && this.dataService.user.email != ""){
      const userParams: any = { 
          "username": this.dataService.user.username,
          "description": this.dataService.user.description,
          "email": this.dataService.user.email,
          "profile_img": this.dataService.user.profile_img,
          "profile_img_id": this.dataService.user.profile_img_id?.toString(),
          "services": this.dataService.user.services,
          "public": this.dataService.user.public
      };

      //todo
      this.http.put<any>('http://v2202211186550206218.quicksrv.de:4300/api/users/' + localStorage.getItem('jwt_user_id') ?? '', userParams)
      .subscribe(
        (updatedUser) => {
          this.successMessage = "Änderungen erfolgreich angepasst!";
          this.errorMessage = "";
          localStorage.setItem('jwt_user', updatedUser.username); 
          localStorage.setItem('jwt_user_description', updatedUser.description);
          localStorage.setItem('jwt_user_email', updatedUser.email);
          this.dataService.user = updatedUser;
        },
        (error: any) => {
          // Handle any errors that occurred during the update
          this.errorMessage = "Änderungen wurden nicht übernommen werden. Versuche es später erneut."
          this.successMessage = "";
        }
      ); 
    }
  }

  toggleDeactiveProfile(){
    this.oldPassword = "";
    this.newPassword = "";
    this.passwordRepeat = "";
    this.showDeactivationAccount = !this.showDeactivationAccount;
  }

  toggleResetPasswort(){
    this.showResetPasswort = !this.showResetPasswort;
  }

  resetPassword(){
    if(this.newPassword == this.passwordRepeat && this.newPassword != ''){
      const passwordParams: any = {
          password: this.newPassword,
          currentPassword: this.oldPassword,
          passwordConfirmation: this.passwordRepeat
      };

      this.http.post<any>('http://v2202211186550206218.quicksrv.de:4300/api/auth/change-password', passwordParams)
      .subscribe(
        (updatedUser) => {
          this.successMessage = "Änderungen erfolgreich angepasst!";
          this.errorMessage = "";
          this.toggleResetPasswort();
        },
        (error: any) => {
          // Handle any errors that occurred during the update
          this.errorMessage = "Passwort stimmt entweder nicht überein oder ist zu kurz. (mind. 6 Zeichen)"
          this.successMessage = "";
          this.toggleResetPasswort();
        }
      );
    }
  }

  deactiveProfile(){
    this.http.delete<any>('http://v2202211186550206218.quicksrv.de:4300/api/users/' + localStorage.getItem('jwt_user_id') ?? '')
      .subscribe(
      (updatedUser) => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (error: any) => {
        // Handle any errors that occurred during the update
        this.errorMessage = "Änderungen wurden nicht übernommen werden. Versuche es später erneut."
        this.successMessage = "";
        this.toggleDeactiveProfile();
      }
    );
  }

  onFileChange(event: any) {
    // Ausgewählte Dateien abrufen
    const files = event.target.files;
    
    if(files.length > 1){
      this.errorMessageFileUpload = 'Sie können nur ein Bild hochladen.';
      return;
    }

    if (files[0].size > 5 * 1024 * 1024) {
      this.errorMessageFileUpload = 'Dateigröße überschreitet das Limit von 5MB.';
      return;
    }

    // Typ (png, jpg, jpeg) überprüfen
    if (files[0].type != 'image/png' && files[0].type != 'image/jpeg' && files[0].type != 'image/jpg') {
      this.errorMessageFileUpload = 'Nur PNG und JPG Dateien sind erlaubt.';
      return;
    }

    this.errorMessageFileUpload = '';
    this.uploadImage = files[0];
  }

  getImgUrl(){
    if(this.uploadImage != null){
      return URL.createObjectURL(this.uploadImage);
    }
    else{
      return this.dataService.serverUrl + this.dataService.user.profile_img
    }
  }

  removeProfileImage(){
    this.uploadImage = null;
    this.dataService.user.profile_img = "";
  }
  
  servicePointList(){
    if (this.dataService.user.services != ""){
      let servicePointsArray = this.dataService.user.services?.split("<*>");
      servicePointsArray?.pop();
      return servicePointsArray;
    } else{
      return [];
    }
  }

  addServicePoint(){
    if(this.currentServicePoint != ""){
      this.dataService.user.services += this.currentServicePoint + "<*>";
      this.currentServicePoint = "";
    }
  }
 
  removeServicePoint(servicePoint: string){
    this.dataService.user.services = this.dataService.user.services?.replace(servicePoint + "<*>", "");
  }

}
