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
  public currentUser: string = '';
  public isLoading: boolean = true;
  public wrongCredentials: boolean = false;
  public authError: boolean = false;
  public displayedAdvertisements: Advertisement[] = [];
  public districts: District[] = [];
  public registerSuccess: boolean = false;

  public advertisementProfile: Advertisement = {
    id: "",
  };

  //Style Elements
  currentBreakpoint: string = "xl";
  currentView: string = "table";

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
        localStorage.setItem('jwt_user', data.user.username);
        this.router.navigate(['/advertisements']);
      },
      (err: Error) => {
        this.wrongCredentials = true;
      }
    );
  }

  register(name: string, email: string, password: string, description: string, role: number){
    let createParams: any = {
      "body": {
        "username": name,
        "email": email,
        "password": password,
        "description": description
      },
    }

    let userParams: any;
    
    this.userPermissionService.authLocalRegisterPost(createParams).subscribe(
      (data: any) => {
        userParams = {
          "id": data.user.id,
          "body": {
            "role": {
              "id": role,
            }
          }
        }
        this.userPermissionService.usersIdPut(userParams).subscribe(
          (data: any) => {
            this.registerSuccess = true;
            localStorage.setItem('auth_user', data.user.email);
          }
        );
      },
      (err: Error) => {
        this.authError = true;
      }
    );
  }


  getAmountOfAdvertisements() {
    this.advertisementService.advertisementsCountGet().subscribe(
      (data: any) => {
        this.totalAdvertisementAmount = data;
      }
    );
  }

  getAdvertisements() {
    this.advertisementService.advertisementsGet({_limit: this.currentLimit}).subscribe(
      (data: Advertisement[]) => {
        this.displayedAdvertisements = data;
        this.advertisementProfile = data[0];
        this.isLoading = false;
      }
    );
  }

  getFilteredAdvertisements(searchInput: string) {
    let filterParams: string = '?_where[_or][0][jobTitle_contains]=' + searchInput + '&_where[_or][1][assignment_contains]=' + searchInput + '&_where[_or][2][benefits_contains]=' + searchInput + '&_where[_or][3][location_contains]=' + searchInput + '&_where[_or][4][requirements_contains]=' + searchInput + '&_where[_or][5][salary_contains]=' + searchInput;
 
    this.advertisementService.advertisementsCustomFilterGet(filterParams).subscribe(
      (data: any) => {
        this.displayedAdvertisements = data;
        this.advertisementProfile = data[0];
        this.isLoading = false;
      }
    );
  }

  getFilteredAdvertisementsByDistricts(districts: District[]) {
    let filterParams: string = '?_where[_or][0][district.id]=' + districts[0].id;
    for (let i = 1; i < districts.length; i++) {
      filterParams += '&_where[_or][' + i + '][district.id]=' + districts[i].id;
    }

    this.advertisementService.advertisementsCustomFilterGet(filterParams).subscribe(
      (data: any) => {
        this.displayedAdvertisements = data;
        this.advertisementProfile = data[0];
        this.isLoading = false;
      }
   );
  }

  getFilteredAdvertisementsByDistrictsAndSearch(districts: District[], searchInput: string) {
    let filterParams: string = '?_where[_and][0][_or][0][district.id]=' + districts[0].id;
    for (let i = 1; i < districts.length; i++) {
      filterParams += '&_where[_and][0][_or][' + i + '][district.id]=' + districts[i].id;
    }

    filterParams += '&_where[_and][1][_or][0][jobTitle_contains]=' + searchInput + '&_where[_and][1][_or][1][assignment_contains]=' + searchInput + '&_where[_and][1][_or][2][benefits_contains]=' + searchInput + '&_where[_and][1][_or][3][location_contains]=' + searchInput + '&_where[_and][1][_or][4][requirements_contains]=' + searchInput + '&_where[_and][1][_or][5][salary_contains]=' + searchInput;


    this.advertisementService.advertisementsCustomFilterGet(filterParams).subscribe(
      (data: any) => {
        this.displayedAdvertisements = data;
        this.advertisementProfile = data[0];
        this.isLoading = false;
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
