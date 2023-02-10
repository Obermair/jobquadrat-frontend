import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  password = "";
  passwordRepeat = "";
  errorMessage = false;

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword(){
    if(this.password == this.passwordRepeat && this.password != ""){
      this.dataService.resetPassword(this.password, '');
    }else{
      this.errorMessage = true;
    }
  }
}
