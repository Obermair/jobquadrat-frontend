import { Component, OnInit } from '@angular/core';
import { NewUsersPermissionsUser, UsersPermissionsUser } from '../api/models';
import { DataService } from '../data.service';
import { UsersPermissionsUserService } from '../api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  company: NewUsersPermissionsUser = {
    description: "",
    email: "",
    username: ""
  };

  errorMessage = "";
  successMessage = "";
  showDeactivationAccount = false;
  showResetPasswort = false;
  password = "";
  passwordRepeat = "";

  constructor(public dataService: DataService, public userService: UsersPermissionsUserService, private router: Router) { 
    this.company.description = localStorage.getItem('jwt_user_description') ?? '';
    this.company.username = localStorage.getItem('jwt_user') ?? '';
    this.company.email = localStorage.getItem('jwt_user_email') ?? '';
  }

  ngOnInit(): void {
  }

  update(): void {
    if(this.company.description != "" && this.company.username != "" && this.company.email != ""){
      const userParams: any = {
        "id": localStorage.getItem('jwt_user_id') ?? '',
        "body": this.company
      };
      this.userService.usersIdPut(userParams)
      .subscribe(
        (updatedUser) => {
          this.successMessage = "Änderungen erfolgreich angepasst!";
          this.errorMessage = "";
          localStorage.setItem('jwt_user', updatedUser.username); 
          localStorage.setItem('jwt_user_description', updatedUser.description);
          localStorage.setItem('jwt_user_email',updatedUser.email);
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
    this.password = "";
    this.passwordRepeat = "";
    this.showDeactivationAccount = !this.showDeactivationAccount;
  }

  toggleResetPasswort(){
    this.showResetPasswort = !this.showResetPasswort;
  }

  resetPassword(){
    if(this.password == this.passwordRepeat && this.password != ''){
      const userParams: any = {
        "id": localStorage.getItem('jwt_user_id') ?? '',
        "body": {
          "password": this.password
        }
      };
  
      this.userService.usersIdPut(userParams)
      .subscribe(
        (updatedUser) => {
          this.successMessage = "Änderungen erfolgreich angepasst!";
          this.errorMessage = "";
          this.toggleResetPasswort();
        },
        (error: any) => {
          // Handle any errors that occurred during the update
          this.errorMessage = "Änderungen wurden nicht übernommen werden. Versuche es später erneut."
          this.successMessage = "";
          this.toggleResetPasswort();
        }
      );
    }
  }

  deactiveProfile(){
    const deleteParams: any = {
      "id": localStorage.getItem('jwt_user_id') ?? '',
    };

    this.userService.usersIdDelete(deleteParams).subscribe(
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
}
