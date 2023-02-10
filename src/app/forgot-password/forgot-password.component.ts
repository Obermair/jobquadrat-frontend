import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email = "";

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    this.dataService.forgotPassword(this.email);
  }

}
