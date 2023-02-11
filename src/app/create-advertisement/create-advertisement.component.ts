import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.scss']
})
export class CreateAdvertisementComponent implements OnInit {

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getAdvertisementsByUser();
  }

}
