import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  code = "";

  constructor(public dataService: DataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(){
    this.code = this.route.snapshot.params['code'];
}

  resetPassword(){
    if(this.password == this.passwordRepeat && this.password != ""){
      this.dataService.resetPassword(this.password, this.passwordRepeat, this.code);
    }else{
      this.errorMessage = true;
    }
  }
}
