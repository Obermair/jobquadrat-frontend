import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name = "";
  email = "";
  password = "";
  passwordRepeat = "";
  description = "";
  role: number = 0;
  inputWrong = false;
  errorMessage = "";
  policyChecked = false;

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('jwt_token') != null) {
      this.router.navigate(['/advertisements']);
    }
  }

  register(){
    if(this.policyChecked == false){
      this.inputWrong = true;
      this.errorMessage = "Bitte akzeptieren Sie die Datenschutzbestimmungen!";
    }
    else {
      if(this.email == "" || this.password == "" || this.passwordRepeat == "" || this.role == 0){
        this.inputWrong = true;
        this.errorMessage = "Bitte füllen Sie alle Felder aus!";
      }
      else {
        this.inputWrong = false;

        if(this.name.length >= 3){
          if(this.password == this.passwordRepeat && this.password != ""){
            if(this.password.length >= 6){
              this.dataService.register(this.name, this.email, this.password, this.description, this.role);
            }
            else{
              this.inputWrong = true;
              this.errorMessage = "Das Passwort muss mindestens 6 Zeichen lang sein!";
            }
          } else{
            this.inputWrong = true;
            this.errorMessage = "Die Passwörter stimmen nicht überein!";
          }
        } else {
          this.inputWrong = true;
          this.errorMessage = "Der Name muss mindestens 3 Zeichen lang sein!";
        } 
      }
    }
    
  }

  assignRole(role: number){
    this.role = role;
  }
}
