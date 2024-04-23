import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat-conversations',
  templateUrl: './chat-conversations.component.html',
  styleUrls: ['./chat-conversations.component.scss']
})
export class ChatConversationsComponent implements OnInit {
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    if(this.dataService.currentUserRole == 'HR-Consultant'){
      this.dataService.getChatCommunicationsOfConsultant();
    }
    if(this.dataService.currentUserRole == 'Company'){
      this.dataService.getChatCommunicationsOfCompany();
    }
  }
}
