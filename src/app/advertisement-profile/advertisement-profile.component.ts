import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advertisement-profile',
  templateUrl: './advertisement-profile.component.html',
  styleUrls: ['./advertisement-profile.component.scss']
})
export class AdvertisementProfileComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
