import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat-conversations',
  templateUrl: './chat-conversations.component.html',
  styleUrls: ['./chat-conversations.component.scss']
})
export class ChatConversationsComponent implements OnInit {
  public conversationParticipants = [
    {
      participant: 'Schachermayer GmbH',
      lastMessageTime: '10:00',
    },
    {
      participant: 'Hornbach Baumarkt GmbH',
      lastMessageTime: '11:00',
    },
    {
      participant: 'Bauhaus GmbH',
      lastMessageTime: '12:00',
    },
    {
      participant: 'OBI GmbH',
      lastMessageTime: '13:00',
    },
    {
      participant: 'Hagebau GmbH',
      lastMessageTime: '14:00',
    },
    {
      participant: 'Lagerhaus GmbH',
      lastMessageTime: '15:00',
    },
    {
      participant: 'BauMax GmbH',
      lastMessageTime: '16:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '17:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '18:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '19:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '20:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '21:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '22:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '23:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '00:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '01:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '02:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '03:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '04:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '05:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '06:00',
    },
    {
      participant: 'BauProfi GmbH',
      lastMessageTime: '07:00',
    }
  ];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
