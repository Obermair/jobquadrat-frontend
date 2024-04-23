import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../firechat/chat';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-discussion',
  templateUrl: './chat-discussion.component.html',
  styleUrls: ['./chat-discussion.component.scss']
})
export class ChatDiscussionComponent implements OnInit {
 
  @ViewChild('chatArea') chatArea!: ElementRef;

  currentMessage = "";
  showUploadFile = false;

  constructor(public dataService: DataService, private renderer: Renderer2, private formBuilder: FormBuilder) {  
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  toggleUploadFileModal(){
    this.showUploadFile = !this.showUploadFile;
  }

  scrollToBottom(): void {
    try {
      const scrollContainer = this.chatArea.nativeElement;
      this.renderer.setProperty(scrollContainer, 'scrollTop', scrollContainer.scrollHeight);
    } catch(err) { }
  }

  sendMessage(){
    //send message to the server
    this.dataService.addNewMessagetoFirechat(this.dataService.currentChatCommunicationId, this.currentMessage);

    this.currentMessage = "";
    this.onScrollToBottomClick();
  }

  onScrollToBottomClick(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);  
  }
}
