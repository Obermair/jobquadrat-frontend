import { Injectable } from '@angular/core';
import { Advertisement } from './api/models';
import { AdvertisementService } from './api/services';
import { UsersPermissionsUserService } from './api/services';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  public advertisements: Advertisement[] = [];
  public advertisementProfile: Advertisement = {
    id: "",
  };

  private authParams: any = {
    "body": {
      "identifier": "contact@fronius.at",
      "password": "Hello1234"
    }
  }

  constructor(
    private advertisementService: AdvertisementService, 
    private userPermissionService: UsersPermissionsUserService) { }

  authenticateDevCompany() {
    this.userPermissionService.authLocalPost(this.authParams).subscribe(
      (data: any) => {
        console.log(data.jwt);
        localStorage.setItem('jwt_token', data.jwt);
        localStorage.setItem('jwt_user', data.user);
      }
    )
  }

  getAdvertisements() {
    this.advertisementService.advertisementsGet().subscribe(
      (data: Advertisement[]) => {
        this.advertisements = data;
        this.advertisementProfile = data[0];
      }
    );
  }
}
