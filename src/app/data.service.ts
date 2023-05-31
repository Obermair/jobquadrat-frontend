import { Injectable } from '@angular/core';
import { Advertisement, District, PlacementBonus, UsersPermissionsUser } from './api/models';
import { AdvertisementService, DistrictService } from './api/services';
import { UsersPermissionsUserService } from './api/services';
import { BreakpointObserverService } from './breakpoint.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //Data Elements
  public totalAdvertisementAmount: number = 0;
  public totalAdvertisement: Advertisement[] = [];
  public currentLimit: number = 50;
  public user: UsersPermissionsUser = {
    id: "",
    description: "",
    email: "",
    username: ""
  };
  public currentUser: string = '';
  public currentUserId: string = '';
  public currentUserRole: string = '';
  public isLoading: boolean = true;
  public districtsLoading: boolean = true;
  public wrongCredentials: boolean = false;
  public wrongMail: boolean = false;
  public forgotSent: boolean = false;
  public authError: boolean = false;
  public resetSent: boolean = false;
  public displayedAdvertisements: Advertisement[] = [];
  public districts: District[] = [];
  public registerSuccess: boolean = false;
  public userAdvertisements: Advertisement[] = [];
  public currentAdvertisementLimit: number = 30;
  public userAdvertisementsLoading: boolean = true;
  public resetPath: string = "https://www.jobquadrat.com/reset-password";
  public currentAdvertisementBonuses: PlacementBonus[] = [];
  public activePlacementBonus: number = 0;
  public formSent: boolean = false;

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
    private http: HttpClient,
    public router: Router,
  ) {}

  
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
        localStorage.setItem('jwt_user_id', data.user.id);
        localStorage.setItem('jwt_user_role', data.user.role.name);
        localStorage.setItem('jwt_user_description', data.user.description);
        localStorage.setItem('jwt_user_email', data.user.email);
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
            localStorage.setItem('auth_user', data.email);
          }
        );
        
      },
      (err: Error) => {
        this.authError = true;
      }
    );
  }

  forgotPassword(email: string){
    let forgotParams: any = {
      "body": {
        "email": email,
        "url": this.resetPath
      }
    }
    this.userPermissionService.authForgotPasswordPost(forgotParams).subscribe(
      (data: any) => {
        this.forgotSent = true;
      },
      (err: Error) => {
        this.wrongMail = true;
      }
    );
  }

  resetPassword(password: string, passwordRepeat: string, code: string){
    let resetParams: any = {
      "body": {
        "code": code,
        "password": password,
        "passwordConfirmation": passwordRepeat,
      } 
    }

    this.userPermissionService.authResetPasswordPost(resetParams).subscribe(
      (data: any) => {
        this.resetSent = true;
      },
      (err: Error) => {
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
        this.addPlacementBonusToList(this.displayedAdvertisements);
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
        this.addPlacementBonusToList(this.displayedAdvertisements);
        this.isLoading = false;
      }
    );
  }

 
  getAdvertisementsByUser() {
    let userParams: string = '?_where[users_permissions_user.id]=' + this.currentUserId;
    userParams += '&_limit=' + this.currentAdvertisementLimit;
    this.advertisementService.advertisementsCustomFilterGet(userParams).subscribe(
      (data: any) => {
        this.userAdvertisements = data;
        this.userAdvertisementsLoading = false;
        this.addPlacementBonusToList(this.userAdvertisements);
      }
    );
  }
  
  addPlacementBonusToList(advertisements: Advertisement[]){
    for (let i = 0; i < advertisements.length; i++) {
      this.getActivePlacementBonus(advertisements[i].id).then((bonus: any) => {
        if(bonus){
          advertisements[i].placementBonus = bonus;
        } else {
          advertisements[i].placementBonus = 0;
        }
      });
    }
  }

  getActivePlacementBonus(advertisementId: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>('https://api.jobquadrat.com/placement-bonuses?_where[advertisement.id]=' + advertisementId)
        .subscribe((data: PlacementBonus[]) => {
          //sort data by data.created_at property
          data = data.sort((a, b) => {
            return <any>new Date(b.created_at!) - <any>new Date(a.created_at!);
          });
          this.currentAdvertisementBonuses = data;
          this.activePlacementBonus = data[0].bonus || 0;
          resolve(data[0].bonus || 0);
        }
      )
    });
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
        this.addPlacementBonusToList(this.displayedAdvertisements);
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
        this.addPlacementBonusToList(this.displayedAdvertisements);
        this.isLoading = false;
      }
    );
  }
  
  getDistricts() {
    this.districtService.districtsGet().subscribe(
      (data: any) => {
        this.districts = data;
        //sort discricts by name
        this.districts = this.districts.sort((a, b) => {
          return a.name!.localeCompare(b.name!);
        });

        this.districtsLoading = false;
      }
    );
  }

  addPlacementBonus(bonus: number, advertisementId: number) {
    let placementBonusParams: any = {
      "bonus": bonus,
      "advertisement": {
        "id": advertisementId
      }
    }
    this.http.post<any>('https://api.jobquadrat.com/placement-bonuses', placementBonusParams)
      .subscribe(data => {
        this.getPlacementBonusesByAdvertisement(advertisementId);
      }
    )
  }

  getPlacementBonusesByAdvertisement(advertisementId: number) {
    this.http.get<any>('https://api.jobquadrat.com/placement-bonuses?_where[advertisement.id]=' + advertisementId)
      .subscribe((data: PlacementBonus[]) => {
        //sort data by data.created_at property
        data = data.sort((a, b) => {
          return <any>new Date(b.created_at!) - <any>new Date(a.created_at!);
        });
        this.currentAdvertisementBonuses = data;
        this.activePlacementBonus = data[0].bonus || 0;
      }
    )
  }

  postAvertisement(advertisement: Advertisement, placementBonus: number) {
    let advertisementParams: any = {
      "body": {
        "jobTitle": advertisement.jobTitle,
        "workingTime": advertisement.workingTime,
        "assignment": advertisement.assignment,
        "benefits": advertisement.benefits,
        "location": advertisement.location,
        "requirements": advertisement.requirements,
        "salary": advertisement.salary,
        "district": {
          "id": advertisement.district!.id
        },
        "users_permissions_user": {
          "id": this.currentUserId
        }
      }
    }

    this.advertisementService.advertisementsPost(advertisementParams).subscribe(
      (data: any) => {
        this.getAdvertisementsByUser();
        this.addPlacementBonus(placementBonus, data.id);
      }
    );
  }

  updateAdvertisement(advertisement: Advertisement) {
    let advertisementParams: any = {
      "id": advertisement.id,
      "body": {
        "jobTitle": advertisement.jobTitle,
        "workingTime": advertisement.workingTime,
        "assignment": advertisement.assignment,
        "benefits": advertisement.benefits,
        "location": advertisement.location,
        "requirements": advertisement.requirements,
        "salary": advertisement.salary,
        "district": {
          "id": advertisement.district!.id
        },
        "users_permissions_user": {
          "id": this.currentUserId
        }
      }
    }

    this.advertisementService.advertisementsIdPut(advertisementParams).subscribe(
      (data: any) => {
        this.getAdvertisementsByUser();
      }
    );
  }

  deactivateAdvertisement(advertisement: Advertisement) {
    let advertisementParams: any = {
      "id": advertisement.id,
      "body": {
        "published_at": null
      }
    }

    this.advertisementService.advertisementsIdPut(advertisementParams).subscribe(
      (data: any) => {
        this.getAdvertisementsByUser();
      }
    );
  }

  sendForm(form: any) {
    let html = '<img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo"><h2>Neue Email von Jobquadrat</h2><p><b>Name:</b> ' + form.firstname + " " + form.lastname + '</p><p><b>Unternehmen:</b> ' + form.company + '</p><p><b>Email:</b> ' + form.email + '</p><p><b>Nachricht:</b> ' + form.message + '</p>';

    let emailParams: any = {
      "to": "jobquadrat@gmail.com",
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Email von Jobquadrat",
      "html": html
    }

    this.http.post<any>('https://api.jobquadrat.com/email', emailParams)
      .subscribe(data => {
        this.formSent = true;
      }
    )
  }

  sendRecruiterSuccessPlacement(placementData: any){
    let html = '<!DOCTYPE html><html><head>  <meta charset="UTF-8">  <title>Neue Vermittlung von einem Personalvermittler gemeldet</title>  <style>    body {      font-family: Arial, sans-serif;      line-height: 1.6;      margin: 0;      padding: 20px;    }    h1 {      color: #333333;      font-size: 24px;      margin-bottom: 20px;    }    p {      color: #333333;      font-size: 16px;      margin-bottom: 10px;    }    table {      border-collapse: collapse;      width: 100%;    }    th, td {      border: 1px solid #dddddd;      padding: 8px;      text-align: left;    }    th {      background-color: #f5f5f5;    }  </style></head><body><img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo">  <h1>Neue Vermittlung gemeldet</h1> <p>Ein Personalvermittler hat eine neue Vermittlung gemeldet:</p>  <table>    <tr>      <th>Personalvermittler</th>      <td>' + placementData.recruiter + '</td>    </tr>    <tr>      <th>E-Mail-Adresse</th>      <td>' + placementData.recruiterMail + '</td>    </tr>    <tr>      <th>Inserat</th>      <td>' + placementData.jobTitle + '</td>    </tr>    <tr>      <th>Vermittlungsprämie</th>      <td>' + placementData.placementBonus + '%</td>    </tr>    <tr>      <th>Unternehmen</th>      <td>' + placementData.companyName + '</td>    </tr>    <tr>      <th>Kontaktperson</th>      <td>' + placementData.contactPerson + '</td>    </tr>  </table>  <p>Bitte überprüfen Sie die Details und nehmen Sie gegebenenfalls weitere Schritte vor.</p></body></html>'

    let emailParams: any = {
      "to": "jobquadrat@gmail.com",
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Vermittlung von Jobquadrat",
      "html": html
    }

    this.http.post<any>('https://api.jobquadrat.com/email', emailParams)
      .subscribe(data => {
      }
    )
  }

  sendCompanySuccessPlacement(placementData: any){
    let html = '<!DOCTYPE html><html><head>  <meta charset="UTF-8">  <title>Neue Vermittlung von einem Unternehmen gemeldet</title>  <style>    body {      font-family: Arial, sans-serif;      line-height: 1.6;      margin: 0;      padding: 20px;    }    h1 {      color: #333333;      font-size: 24px;      margin-bottom: 20px;    }    p {      color: #333333;      font-size: 16px;      margin-bottom: 10px;    }    table {      border-collapse: collapse;      width: 100%;    }    th, td {      border: 1px solid #dddddd;      padding: 8px;      text-align: left;    }    th {      background-color: #f5f5f5;    }  </style></head><body><img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo">  <h1>Neue Vermittlung gemeldet</h1> <p>Ein Unternehmen hat eine neue Vermittlung gemeldet:</p>  <table>    <tr>      <th>Unternehmen</th>      <td>' + placementData.companyName + '(ID: '+ placementData.companyId + ')' + '</td>    </tr> <tr>      <th>UID</th>      <td>' + placementData.uid + '</td>    </tr> <tr>      <th>Straße</th>      <td>' + placementData.street + '</td>    </tr> <tr>      <th>Hausnummer</th>      <td>' + placementData.houseNr + '</td>    </tr> <tr>      <th>Postleitzahl</th>      <td>' + placementData.postalCode + '</td>    </tr>  <tr>      <th>Stadt</th>      <td>' + placementData.city + '</td>    </tr><tr>      <th>Unternehmenskontakt</th>      <td>' + placementData.contactPerson + '</td>    </tr>     <tr>      <th>Inserat</th>      <td>' + placementData.jobTitle + '</td>    </tr>    <tr>      <th>Vermittlungsprämie</th>      <td>' + placementData.placementBonus + '%</td>    </tr>    <tr>      <th>Personalvermittler</th>      <td>' + placementData.recruiter + '</td>    </tr>    <tr>      <th>Kontakt Personalvermittler</th>      <td>' + placementData.recruiterMail + '</td>    </tr>  </table>  <p>Bitte überprüfen Sie die Details und nehmen Sie gegebenenfalls weitere Schritte vor.</p></body></html>'

    let emailParams: any = {
      "to": "jobquadrat@gmail.com",
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Vermittlung von Jobquadrat",
      "html": html
    }

    this.http.post<any>('https://api.jobquadrat.com/email', emailParams)
      .subscribe(data => {
      }
    )
  }
}
