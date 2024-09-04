import { Injectable } from '@angular/core';
import { Advertisement, District, PlacementBonus, UsersPermissionsUser } from './api/models';
import { AdvertisementService, DistrictService } from './api/services';
import { UsersPermissionsUserService } from './api/services';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { BreakpointObserverService } from './breakpoint.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ChatCommunications } from './api/models/chatCommunications';
import { ChatMessage } from './api/models/chatMessage';
import { Subject } from 'rxjs';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public firechat: FirebaseApp;
  public firechat_db: Database;

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
  public rootUrl: string = 'http://localhost:1337/api';
  public currentAdvertisementBonuses: PlacementBonus[] = [];
  public activePlacementBonus: number = 0;
  public formSent: boolean = false;
  public landingPageAdvertisements: Advertisement[] = [];
  public currentUserConversations: ChatCommunications[] = [];
  public publicConsultants: UsersPermissionsUser[] = [];
  public currentChatCommunicationId: string = "";
  public firebaseChatUser: string = "office@jobquadrat.com";
  public firebaseChatPassword: string = "jobquadrat2024";
  public chatAdvertisement: Advertisement = {
    id: "",
  };
  public chatMessages: ChatMessage[] = [];
  public advertisementProfile: Advertisement = {
    id: "",
  };

  public scrollToBottomChatTrigger = new Subject<void>();

  getScrollToBottomChatTrigger() {
    return this.scrollToBottomChatTrigger.asObservable();
  }

  //Style Elements
  currentBreakpoint: string = "xl";
  currentView: string = "table";
  chatView: string = "conversations";


  constructor(
    private advertisementService: AdvertisementService, 
    private districtService: DistrictService,
    private userPermissionService: UsersPermissionsUserService,
    private http: HttpClient,
    public router: Router,
  ) {
    this.firechat = initializeApp(environment.firebase);
    this.firechat_db = getDatabase(this.firechat);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.firebaseChatUser, this.firebaseChatPassword);
  }

  getInitials(name: string){
    //get initials from name - split name by space and take first letter of each word and if only one name then take first two letters
    let initials = name.split(' ').map((n: string) => n[0]).join('');
    if(initials.length > 2){
      initials = initials.substring(0, 2);
    }
    return initials;
  }

  // Main function to handle transforming the entire response
  private transformResponse(response: any): any[] {
    if (!response || !response.data) return []; // Ensure data exists
    return response.data.map((item: any) => this.transformV4toV3(item)); // Transform each job item
  }

  // Recursive function to transform Strapi v4 data structure into a v3-like format
  private transformV4toV3(data: any): any {
    // Check if the current data has `attributes` structure (Strapi v4 format)
    if (data && data.attributes) {
      // Flatten the object by merging `id` and recursively transformed `attributes`
      const transformedAttributes = this.transformAttributes(data.attributes);

      // Include `id` from the top level of Strapi v4 item
      return {
        id: data.id,
        ...transformedAttributes,
      };
    }

    // Return the data as is if it's neither an object with nested fields nor an array
    return data;
  }

  // Recursively transform nested attributes, handling nested `data` objects
  private transformAttributes(attributes: any): any {
    const transformedObject: any = {};

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        const value = attributes[key];

        // Handle nested Strapi objects with `data` structure
        if (value && value.data) {
          if (Array.isArray(value.data)) {
            // Transform arrays of nested objects
            transformedObject[key] = value.data.map((nestedItem: any) => 
              this.transformV4toV3(nestedItem)
            );
          } else {
            // Transform single nested object
            transformedObject[key] = this.transformV4toV3(value.data);
          }
        } else {
          // Directly assign other attributes
          transformedObject[key] = value;
        }
      }
    }

    return transformedObject;
  }
  login(username: string, password: string): void {
    this.http.post('http://localhost:1337/api/auth/local', {
      identifier: username,
      password: password,
    }).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('jwt_token', data.jwt);
        localStorage.setItem('jwt_user', data.user.username);
        localStorage.setItem('jwt_user_id', data.user.id);
        //localStorage.setItem('jwt_user_role', data.user.role.name);
        localStorage.setItem('jwt_user_description', data.user.description);
        localStorage.setItem('jwt_user_email', data.user.email);
        this.http.get<any>('http://localhost:1337/api/users?filters[id][$eq]='+ data.user.id + '&populate=*').subscribe(
          (result: any) => {
            localStorage.setItem('jwt_user_role', result[0].role.name);
            this.router.navigate(['advertisements']);
          } 
        ) 
      },
      (err: Error) => {
        this.wrongCredentials = true;
      }
    );
  }

  //todo
  register(name: string, email: string, password: string, description: string, role: number){
    let createParams: any = {
      "data": {
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

  //todo
  getCurrentUser(){
    this.currentUserId = localStorage.getItem('jwt_user_id') || '';

    if(this.currentUserId != ''){
      this.userPermissionService.usersIdGet({id: this.currentUserId}).subscribe(
        (data: any) => {
          console.log("Halllooooo" + data);
          this.user = data;
          this.currentUser = data.username;
          this.currentUserRole = data.role.name;
          if(this.user.profile_img == null){
            this.user.profile_img = "";
          }
        }
      );
    }
  }

  //todo
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

  //todo
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

  getAdvertisementsLandingPage() {
    //add a except to the advertisement
    this.http.get<any>('http://localhost:1337/api/jobs?sort=createdAt:desc&pagination[limit]=20').pipe(
      map(response => this.transformResponse(response))
    ).subscribe(
      (result: any) => {
        this.addPlacementBonusToLandingPageList(result);
        this.landingPageAdvertisements = result;
      } 
    ) 
  }

  getAmountOfAdvertisements() {
    this.http.get('http://localhost:1337/api/jobs?pagination[withCount]=true').subscribe(
      (data: any) => {
        this.totalAdvertisementAmount = data.meta.totalCount;
      }
    );
  }

  getAdvertisements() {
    this.http.get<any>('http://localhost:1337/api/jobs?pagination[limit]=' + this.currentLimit + '&populate=*')
      .pipe(
        map(response => this.transformResponse(response))
      )
      .subscribe(
      (result: any) => {
        //order data by published_at property
        let data: Advertisement[] = this.transformV4toV3(result);

        data = data.sort((a, b) => {
          return <any>new Date(b.published_at!) - <any>new Date(a.published_at!);
        });
        this.displayedAdvertisements = data;
        this.advertisementProfile = data[0];
        this.addPlacementBonusToList(this.displayedAdvertisements);
        this.isLoading = false;
      }
    );
  }

  //todo
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

  //todo
  loadPublicConsultants() {
    this.http.get<any>('http://localhost:1337/api/users?_where[public]=true')
      .subscribe((data: UsersPermissionsUser[]) => {
        this.publicConsultants = data;
        console.log(data);
      }
    )
  }

  //todo
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

  addPlacementBonusToLandingPageList(advertisements: Advertisement[]){
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
      this.http.get<any>('http://localhost:1337/api/placement-bonuses?_where[advertisement.id]=' + advertisementId)
      .pipe(
        map(response => this.transformResponse(response))
      ).subscribe((data: PlacementBonus[]) => {   
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


  //load all chatCommunications where chat sender is current user
  getChatCommunicationsOfConsultant(chatUpdate: boolean) {
    this.http.get<any>('http://localhost:1337/api/chat-communications?_where[chat_sender_p1.id]=' + this.currentUserId)
      .subscribe((data: any) => {
        //order data by last_message_timestamp property
        data = data.sort((a: ChatCommunications, b: ChatCommunications) => {
          return <any>new Date(b.last_message_timestamp!) - <any>new Date(a.last_message_timestamp!);
        });
        this.currentUserConversations = data;

        if(chatUpdate){
          this.currentChatCommunicationId = data[0].id;
          this.chatAdvertisement = data[0].advertisement.id || {id: ""};
          if(data[0].advertisement.id != ""){
            this.getActivePlacementBonus(data[0].advertisement.id).then((bonus: any) => {
              if(bonus){
                this.chatAdvertisement.currentPlacementBonus = bonus;
              } else {
                this.chatAdvertisement.currentPlacementBonus = 0;
              }
            });
          } 
          this.updateChatMessages(this.currentChatCommunicationId);
          this.updateChatCommunicationId(this.currentChatCommunicationId);
        } 
      }
    );
  }

  getChatCommunicationsOfCompany(chatUpdate: boolean) {
    this.http.get<any>('http://localhost:1337/api/chat-communications?_where[chat_receiver_p2.id]=' + this.currentUserId)
      .subscribe((data: any) => {
        //order data by last_message_timestamp property
        data = data.sort((a: ChatCommunications, b: ChatCommunications) => {
          return <any>new Date(b.last_message_timestamp!) - <any>new Date(a.last_message_timestamp!);
        });
        this.currentUserConversations = data;

        if(chatUpdate){
          this.currentChatCommunicationId = data[0].id;
          this.chatAdvertisement = data[0].advertisement || {id: ""};
          if(data[0].advertisement){
            this.getActivePlacementBonus(data[0].advertisement.id).then((bonus: any) => {
              if(bonus){
                this.chatAdvertisement.currentPlacementBonus = bonus;
              } else {
                this.chatAdvertisement.currentPlacementBonus = 0;
              }
            });
          } 
          this.updateChatMessages(this.currentChatCommunicationId);
          this.updateChatCommunicationId(this.currentChatCommunicationId);
        }
      }
    );
  }

  updateChatCommunicationId(chatCommunicationId: string) {
    this.currentChatCommunicationId = chatCommunicationId;
    this.updateChatMessages(chatCommunicationId);
    this.chatAdvertisement = this.currentUserConversations.find(x => x.id == chatCommunicationId)!.advertisement || {id: ""};

    this.getActivePlacementBonus(this.chatAdvertisement.id).then((bonus: any) => {
      if(bonus){
        this.chatAdvertisement.currentPlacementBonus = bonus;
      } else {
        this.chatAdvertisement.currentPlacementBonus = 0;
      }
    }); 

    if(this.currentUserRole == "HR-Consultant"){
      this.readMessages(chatCommunicationId, "p1");
    }
    if(this.currentUserRole == "Company"){
      this.readMessages(chatCommunicationId, "p2");
    }
  }

  updateChatCommunicationTimestamp(chatCommunicationId: string) {
    let chatParams: any;
    if(this.currentUserRole == "HR-Consultant"){
      chatParams = {
        "id": chatCommunicationId,
        "last_message_timestamp": new Date(),
        "unread_message_p2": true
      }
    }
    if(this.currentUserRole == "Company"){
      chatParams = {
        "id": chatCommunicationId,
        "last_message_timestamp": new Date(),
        "unread_message_p1": true
      }
    }

    this.http.put<any>('http://localhost:1337/api/chat-communications/' + chatCommunicationId, chatParams)
      .subscribe(data => { 
        if(this.currentUserRole == "HR-Consultant"){
          this.getChatCommunicationsOfConsultant(true);
        }
        if(this.currentUserRole == "Company"){
          this.getChatCommunicationsOfCompany(true);
        }
      }
    )
  }

  readMessages(chatCommunicationId: string, chatSender: string) {
    let chatParams: any;
    if(chatSender == "p1"){
      chatParams = {
        "id": chatCommunicationId,
        "unread_message_p1": false
      }
    }
    if(chatSender == "p2"){
      chatParams = {
        "id": chatCommunicationId,
        "unread_message_p2": false
      }
    }

    this.http.put<any>('http://localhost:1337/api/chat-communications/' + chatCommunicationId, chatParams)
      .subscribe(data => { 
        //go through all chatCommunications and update the unread messages
        if(this.currentUserRole == "HR-Consultant"){
          this.getChatCommunicationsOfConsultant(false);
        }
        if(this.currentUserRole == "Company"){
          this.getChatCommunicationsOfCompany(false);
        }
      }
    )
  }


  addChatCommunication(communicationMessage: string, files: File[]) {
    let chatParams: any = {
      "advertisement": {
        "id": this.advertisementProfile.id
      },
      "chat_sender_p1": {
        "id": this.currentUserId
      }, 
      "chat_receiver_p2": this.advertisementProfile.users_permissions_user,
      "last_message_timestamp": new Date(),
      "unread_message_p1": false,
      "unread_message_p2": true
    }

    
    this.http.post<any>('http://localhost:1337/api/chat-communications', chatParams)
      .subscribe(data => {
        this.addNewMessagetoFirechat(data.id, communicationMessage);
        if(files.length > 0){
          this.uploadFiles(data.id, files);
        }
        this.router.navigate(['advertisements/chat']);
      }
    )
  }

  updateChatMessages(chatCommunicationId: string){
    //get chats from the firebase database
    const chatsRef = ref(this.firechat_db, chatCommunicationId.toString());
    let activeUpdateChat = false;
    this.chatMessages = [];

    onValue(chatsRef, (snapshot: any) => {
      //get data from snapshot and push it to chatMessages array and remove all previous messages
      activeUpdateChat = false;
      const data = snapshot.val();
      for (let key in data) {
        if(data[key].chatId == this.currentChatCommunicationId){
          activeUpdateChat = true;
        }
      }

      if(activeUpdateChat){
        this.chatMessages = [];
        for (let key in data) {
          this.chatMessages.push(data[key]);
        }
        //order chatMessages by timestamp
        this.chatMessages = this.chatMessages.sort((a, b) => {
          return <any>new Date(a.timestamp) - <any>new Date(b.timestamp);
        });
        this.scrollToBottomChatTrigger.next();
      }

      if(this.currentUserRole == "HR-Consultant"){
        this.getChatCommunicationsOfConsultant(false);
      }
      if(this.currentUserRole == "Company"){
        this.getChatCommunicationsOfCompany(false);
      }
    });
  }

  uploadFiles(chatId: string, files: File[]){
    let formData = new FormData();
    //add files to formData
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    //upload to server and log errror
    this.http.post<any>('http://localhost:1337/api/upload', formData)
      .subscribe(data => {
        this.addUploadFileToFirechat(chatId, data);
      }
    )
  }

  uploadImage(file: File){
    let formData = new FormData();
    formData.append('files', file);
    return this.http.post<any>('http://localhost:1337/api/upload', formData);
  }

  addUploadFileToFirechat(chatId: string, files: any){
    if(this.currentUserRole == "HR-Consultant"){
      this.readMessages(chatId, "p1");
    }
    if(this.currentUserRole == "Company"){
      this.readMessages(chatId, "p2");
    }

    let newMessageId = uuidv4();
    
    let chatParams: any = {
      "messageId": newMessageId,
      "chatId": chatId,
      "username": this.currentUser,
      "timestamp": new Date().toString(),
      "file_message": true,
      "files": []
    }

    //add files to chatParams
    for (let i = 0; i < files.length; i++) {
      let fileParams: any = {
        "filePath": files[i].url,
        "name": files[i].name,
        "ext": files[i].ext,
        "size": files[i].size
      }
      chatParams["files"].push(fileParams);
    }
    
    set(ref(this.firechat_db, `${chatId}/${newMessageId}`), chatParams);

    //find chatCommunication by id
    let chatCommunication = this.currentUserConversations.find(x => x.id == chatId);

    if (chatCommunication) {
      if (this.currentUserRole == "HR-Consultant") {
        this.sendNewMessageMailToCompany(chatCommunication);
      }
      if (this.currentUserRole == "Company") {
        this.sendNewMessageMailToConstultant(chatCommunication);
      }
    }
  }

  addNewMessagetoFirechat(chatId: string, message: string) {
    if(this.currentUserRole == "HR-Consultant"){
      this.readMessages(chatId, "p1");
    }
    if(this.currentUserRole == "Company"){
      this.readMessages(chatId, "p2");
    }

    let newMessageId = uuidv4();
    
    let chatParams: any = {
      "messageId": newMessageId,
      "chatId": chatId,
      "message": message,
      "username": this.currentUser,
      "timestamp": new Date().toString(),
      "file_message": false
    }
    
    set(ref(this.firechat_db, `${chatId}/${newMessageId}`), chatParams);
    
    //find chatCommunication by id
    let chatCommunication = this.currentUserConversations.find(x => x.id == chatId);

    if (chatCommunication) {
      if (this.currentUserRole == "HR-Consultant") {
        this.sendNewMessageMailToCompany(chatCommunication);
      }
      if (this.currentUserRole == "Company") {
        this.sendNewMessageMailToConstultant(chatCommunication);
      }
    }
  }

  addPlacementBonus(bonus: number, advertisementId: number) {
    let placementBonusParams: any = {
      "bonus": bonus,
      "advertisement": {
        "id": advertisementId
      }
    }
    this.http.post<any>('http://localhost:1337/api/placement-bonuses', placementBonusParams)
      .subscribe(data => {
        this.getPlacementBonusesByAdvertisement(advertisementId);
      }
    )
  }

  getPlacementBonusesByAdvertisement(advertisementId: number) {
    this.http.get<any>('http://localhost:1337/api/placement-bonuses?_where[advertisement.id]=' + advertisementId)
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

  sendNewMessageMailToCompany(chatCommunication: ChatCommunications){
    let html = '<!DOCTYPE html> <html lang="de"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Neue Nachricht auf Jobquadrat</title> <style> body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; line-height: 1.6; margin: 0; padding: 20px; color: #333333; background-color: #f9f9f9; } .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); } h1 { font-size: 24px; margin-bottom: 20px; color: #f59e0b; } p { margin-bottom: 10px; } a { color: #f59e0b; text-decoration: none; font-weight: bold; } img { max-width: 100%; height: auto; display: block; margin-bottom: 20px; } </style> </head> <body> <div class="container"> <img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo"> <h1>Du hast eine neue Chatnachricht auf <a href="https://www.jobquadrat.com/">jobquadrat.com</a></h1> <p>Du hast soeben eine neue Nachricht zum Inserat <strong>' + chatCommunication.advertisement?.jobTitle + '</strong> von <strong>' + chatCommunication.chat_sender_p1?.username + '</strong> bekommen.</p> <p>Gehe jetzt auf <a href="https://www.jobquadrat.com/advertisements/chat">jobquadrat.com</a>, um dir die neue Nachricht anzusehen.</p> </div> </body> </html>'
 
    let emailParams: any = {
      "to": chatCommunication.chat_receiver_p2?.email,
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Nachricht auf Jobquadrat",
      "html": html
    }

    this.http.post<any>('http://localhost:1337/api/email', emailParams)
      .subscribe(data => { 
      }
    )
  }

  sendNewMessageMailToConstultant(chatCommunication: ChatCommunications){
    let html = '<!DOCTYPE html> <html lang="de"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Neue Nachricht auf Jobquadrat</title> <style> body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; line-height: 1.6; margin: 0; padding: 20px; color: #333333; background-color: #f9f9f9; } .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); } h1 { font-size: 24px; margin-bottom: 20px; color: #f59e0b; } p { margin-bottom: 10px; } a { color: #f59e0b; text-decoration: none; font-weight: bold; } img { max-width: 100%; height: auto; display: block; margin-bottom: 20px; } </style> </head> <body> <div class="container"> <img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo"> <h1>Du hast eine neue Chatnachricht auf <a href="https://www.jobquadrat.com/">jobquadrat.com</a></h1> <p>Du hast soeben eine neue Nachricht zum Inserat <strong>' + chatCommunication.advertisement?.jobTitle + '</strong> von <strong>' + chatCommunication.chat_receiver_p2?.username + '</strong> bekommen.</p> <p>Gehe jetzt auf <a href="https://www.jobquadrat.com/advertisements/chat">jobquadrat.com</a>, um dir die neue Nachricht anzusehen.</p> </div> </body> </html>'
 
    let emailParams: any = {
      "to": chatCommunication.chat_sender_p1?.email,
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Nachricht auf Jobquadrat",
      "html": html
    }

    this.http.post<any>('http://localhost:1337/api/email', emailParams)
      .subscribe(data => {
      }
    )
  }


  sendForm(form: any) {
    let html = '<img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo"><h2>Neue Email von Jobquadrat</h2><p><b>Name:</b> ' + form.firstname + " " + form.lastname + '</p><p><b>Unternehmen:</b> ' + form.company + '</p><p><b>Email:</b> ' + form.email + '</p><p><b>Nachricht:</b> ' + form.message + '</p>';

    let emailParams: any = {
      "to": "jobquadrat@gmail.com",
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Email von Jobquadrat",
      "html": html
    }

    this.http.post<any>('http://localhost:1337/api/email', emailParams)
      .subscribe(data => {
        this.formSent = true;
      }
    )
  }

  sendRecruiterSuccessPlacement(placementData: any){
    let html = '<!DOCTYPE html><html><head>  <meta charset="UTF-8">  <title>Neue Vermittlung von einem Personalvermittler gemeldet</title>  <style>    body {      font-family: Arial, sans-serif;      line-height: 1.6;      margin: 0;      padding: 20px;    }    h1 {      color: #333333;      font-size: 24px;      margin-bottom: 20px;    }    p {      color: #333333;      font-size: 16px;      margin-bottom: 10px;    }    table {      border-collapse: collapse;      width: 100%;    }    th, td {      border: 1px solid #dddddd;      padding: 8px;      text-align: left;    }    th {      background-color: #f5f5f5;    }  </style></head><body><img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo">  <h1>Neue Vermittlung gemeldet</h1> <p>Ein Personalvermittler hat eine neue Vermittlung gemeldet:</p>  <table>    <tr>      <th>Personalvermittler</th>      <td>' + placementData.recruiter + '</td>    </tr>    <tr>      <th>E-Mail-Adresse</th>      <td>' + placementData.recruiterMail + '</td>    </tr>    <tr>      <th>Inserat</th>      <td>' + placementData.jobTitle + '</td>    </tr>    <tr>      <th>Vermittlungsprämie</th>      <td>' + placementData.placementBonus + '%</td>    </tr> <tr>      <th>Bruttojahresgehalt</th>      <td>' + placementData.actualSalary + '€</td>    </tr>   <tr>      <th>Unternehmen</th>      <td>' + placementData.companyName + '</td>    </tr>    <tr>      <th>Kontaktperson</th>      <td>' + placementData.contactPerson + '</td>    </tr>  </table>  <p>Bitte überprüfen Sie die Details und nehmen Sie gegebenenfalls weitere Schritte vor.</p></body></html>'

    let emailParams: any = {
      "to": "jobquadrat@gmail.com",
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Vermittlung von Jobquadrat",
      "html": html
    }

    this.http.post<any>('http://localhost:1337/api/email', emailParams)
      .subscribe(data => {
      }
    )
  }

  sendCompanySuccessPlacement(placementData: any){
    let html = '<!DOCTYPE html><html><head>  <meta charset="UTF-8">  <title>Neue Vermittlung von einem Unternehmen gemeldet</title>  <style>    body {      font-family: Arial, sans-serif;      line-height: 1.6;      margin: 0;      padding: 20px;    }    h1 {      color: #333333;      font-size: 24px;      margin-bottom: 20px;    }    p {      color: #333333;      font-size: 16px;      margin-bottom: 10px;    }    table {      border-collapse: collapse;      width: 100%;    }    th, td {      border: 1px solid #dddddd;      padding: 8px;      text-align: left;    }    th {      background-color: #f5f5f5;    }  </style></head><body><img width="400px" src="https://www.jobquadrat.com/assets/images/logo.png" alt="Jobquadrat Logo">  <h1>Neue Vermittlung gemeldet</h1> <p>Ein Unternehmen hat eine neue Vermittlung gemeldet:</p>  <table>    <tr>      <th>Unternehmen</th>      <td>' + placementData.companyName + '(ID: '+ placementData.companyId + ')' + '</td>    </tr> <tr>      <th>UID</th>      <td>' + placementData.uid + '</td>    </tr> <tr>      <th>Straße</th>      <td>' + placementData.street + '</td>    </tr> <tr>      <th>Hausnummer</th>      <td>' + placementData.houseNr + '</td>    </tr> <tr>      <th>Postleitzahl</th>      <td>' + placementData.postalCode + '</td>    </tr>  <tr>      <th>Stadt</th>      <td>' + placementData.city + '</td>    </tr><tr>      <th>Unternehmenskontakt</th>      <td>' + placementData.contactPerson + '</td>    </tr>     <tr>      <th>Inserat</th>      <td>' + placementData.jobTitle + '</td>    </tr>    <tr>      <th>Vermittlungsprämie</th>      <td>' + placementData.placementBonus + '%</td>    </tr><tr>      <th>Bruttojahresgehalt</th>      <td>' + placementData.actualSalary + '€</td>    </tr>     <tr>      <th>Personalvermittler</th>      <td>' + placementData.recruiter + '</td>    </tr>    <tr>      <th>Kontakt Personalvermittler</th>      <td>' + placementData.recruiterMail + '</td>    </tr>  </table>  <p>Bitte überprüfen Sie die Details und nehmen Sie gegebenenfalls weitere Schritte vor.</p></body></html>'

    let emailParams: any = {
      "to": "jobquadrat@gmail.com",
      "from": "jobquadrat@gmail.com",
      "subject": "Neue Vermittlung von Jobquadrat",
      "html": html
    }

    this.http.post<any>('http://localhost:1337/api/email', emailParams)
      .subscribe(data => {
      }
    )
  }
}
