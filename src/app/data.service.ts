import { Injectable } from '@angular/core';
import { Advertisement, District } from './api/models';
import { AdvertisementService, DistrictService } from './api/services';
import { UsersPermissionsUserService } from './api/services';
import { BreakpointObserverService } from './breakpoint.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //Data Elements
  public totalAdvertisementAmount: number = 0;
  public totalAdvertisement: Advertisement[] = [];
  public currentLimit: number = 50;
  public displayedAdvertisements: Advertisement[] = [];
  public districts: District[] = [];

  public advertisementProfile: Advertisement = {
    id: "",
  };

  //Style Elements
  currentBreakpoint: string = "xl";
  currentView: string = "table";

  private authParams: any = {
    "body": {
      "identifier": "contact@fronius.at",
      "password": "Hello1234"
    }
  }

  constructor(
    private advertisementService: AdvertisementService, 
    private districtService: DistrictService,
    private userPermissionService: UsersPermissionsUserService,
    public router: Router) {}

  
  login(username: string, password: string): void {
    let loginParams: any = {
      "body": {
        "identifier": username,
        "password": password
      }
    }
    this.userPermissionService.authLocalPost(loginParams).subscribe(
      (data: any) => {
        localStorage.setItem('jwt_token', data.jwt);
        localStorage.setItem('jwt_user', data.user);

        this.router.navigate(['/advertisements']);
      },
      (err: Error) => {
        alert('Login failed');
      }
    );
  }

  authenticateDevCompany() {
    this.userPermissionService.authLocalPost(this.authParams).subscribe(
      (data: any) => {
        localStorage.setItem('jwt_token', data.jwt);
        localStorage.setItem('jwt_user', data.user);
      }
    )
  }

  getAmountOfAdvertisements() {
    this.advertisementService.advertisementsGet({_limit: -1}).subscribe(
      (data: Advertisement[]) => {
        this.totalAdvertisement = data;
        this.totalAdvertisementAmount = data.length;
      }
    );
  }

  getAdvertisements() {
    this.advertisementService.advertisementsGet({_limit: this.currentLimit}).subscribe(
      (data: Advertisement[]) => {
        this.displayedAdvertisements = data;
        this.advertisementProfile = data[0];
      }
    );
  }

  getDistricts() {
    this.districtService.districtsGet().subscribe(
      (data: any) => {
        this.districts = data;
      }
    );
  }

}
