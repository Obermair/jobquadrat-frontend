import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../firechat/chat';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Advertisement } from '../api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-discussion',
  templateUrl: './chat-discussion.component.html',
  styleUrls: ['./chat-discussion.component.scss']
})
export class ChatDiscussionComponent implements OnInit {
 
  @ViewChild('chatArea') chatArea!: ElementRef;

  currentMessage = "";
  private scrollToBottomSubscription: Subscription;
  showUploadFile = false;
  currentPlacementBonus = 0;
  errorMessageFileUpload = "";
  selectedFiles: File[] = [];


  constructor(public dataService: DataService, private renderer: Renderer2, private formBuilder: FormBuilder, public router: Router) { 
    this.scrollToBottomSubscription = this.dataService.getScrollToBottomChatTrigger().subscribe(() => {
      this.onScrollToBottomClick();
    }); 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  toggleUploadFileModal(){
    this.showUploadFile = !this.showUploadFile;
  }

  getFileSize(file: number){
    //according to the file size, return the size in KB or MB
    if(file < 1000){
      return file + " KB";
    } else {
      return (file / 1000).toFixed(2) + " MB";
    }
  }

  getFileType(ext: string){
    //return the file type based on the extension
    if(ext == ".pdf"){
      return "PDF";
    } else if(ext == ".doc" || ext == ".docx"){
      return "Word Document";
    } else if(ext == ".xls" || ext == ".xlsx"){
      return "Excel Document";
    } else if(ext == ".ppt" || ext == ".pptx"){
      return "Powerpoint Document";
    } else {
      return "File";
    }
  }

  getFileLink(filePath: string){
    return this.dataService.rootUrl + filePath;
  }

  scrollToBottom(): void {
    try {
      const scrollContainer = this.chatArea.nativeElement;
      this.renderer.setProperty(scrollContainer, 'scrollTop', scrollContainer.scrollHeight);
    } catch(err) { }
  }

  fileNameLength(name: string, ext: string){
    //return the file name with a maximum length of 33 characters but with the last 2 character to the file + the extension
    if(name.length > 33){
      return name.substring(0, 24) + "..." + name.substring(name.length - 2, name.length) + ext;
    } else {
      return name;
    }
  }

  getPlacementBonus(id: string){
    this.dataService.getActivePlacementBonus(id).then((bonus: any) => {
      if(bonus){
        this.currentPlacementBonus = bonus;
      } else {
        this.currentPlacementBonus = 0;
      }
    });
  }

  goToAdvertisementProfile(advertisement: Advertisement){
    this.router.navigate(['/advertisements/view']);
    //wait for the router to navigate to the advertisement profile
    setTimeout(() => {
      this.dataService.currentView = "profile";
      //find the advertisement in the this.dataService.displayedAdvertisements 
      //and set it as the this.dataService.advertisementProfile
      this.dataService.displayedAdvertisements.forEach((ad: Advertisement) => {
        if(ad.id == advertisement.id){
          this.dataService.advertisementProfile = ad;
        }
      });
    }, 500);
  }

  sendMessage(){
    //send message to the server
    this.dataService.addNewMessagetoFirechat(this.dataService.currentChatCommunicationId, this.currentMessage);
    this.dataService.updateChatCommunicationTimestamp(this.dataService.currentChatCommunicationId);

    this.currentMessage = "";
    this.onScrollToBottomClick();
  }

  onScrollToBottomClick(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);  
  }

  removeFile(file: File) {
    // Datei aus der Liste entfernen without filter
    const index = this.selectedFiles.indexOf(file);
    this.selectedFiles.splice(index, 1);
  }

  onFileChange(event: any) {
    // Ausgewählte Dateien abrufen
    const files = event.target.files;
  
    if(this.selectedFiles.length + files.length > 5){
      this.errorMessageFileUpload = 'Sie können maximal 5 Dateien auf einmal hochladen.';
      return;
    }

    // Dateigröße und Typ überprüfen
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type !== 'application/pdf') {
        this.errorMessageFileUpload = 'Nur PDF-Dateien sind erlaubt.';
        this.selectedFiles = [];
        return;
      }

      if (file.size > 1024 * 1024) {
        this.errorMessageFileUpload = 'Dateigröße überschreitet das Limit von 1MB.';
        this.selectedFiles = [];
        return;
      }

      this.selectedFiles.push(file);
    }

    if (this.selectedFiles.length > 5) {
      this.errorMessageFileUpload = 'Sie können maximal 5 Dateien auf einmal hochladen.';
      this.selectedFiles = [];
      return;
    }

    this.errorMessageFileUpload = '';
  }

  uploadFiles(){
    //upload the selected files to the server
    this.dataService.uploadFiles(this.dataService.currentChatCommunicationId, this.selectedFiles);
    this.showUploadFile = false;
    this.dataService.updateChatCommunicationTimestamp(this.dataService.currentChatCommunicationId);

    this.selectedFiles = [];
    this.onScrollToBottomClick();
  }
}
