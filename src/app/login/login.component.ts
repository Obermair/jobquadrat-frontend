import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  login(){
    this.dataService.login(this.email, this.password);
  }

}
