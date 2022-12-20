import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('jwt_token') != null) {
      this.router.navigate(['/advertisements']);
    }
  }

  login(){
    this.dataService.login(this.email, this.password);
  }

}
