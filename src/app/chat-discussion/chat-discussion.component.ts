import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat-discussion',
  templateUrl: './chat-discussion.component.html',
  styleUrls: ['./chat-discussion.component.scss']
})
export class ChatDiscussionComponent implements OnInit {
 
  @ViewChild('chatArea') chatArea!: ElementRef;

  public chatAdvertisement = {
    id: '1',
    jobTitle: 'Personalverrechner/in mit eigenständigem Aufgabengebiet (m/w/d)',
    location: 'Schachermayerstraße 2a, 4020 Linz',
    placementBonus: 15,
    published_at: '2021-01-01',
    requirements: 'Java, Angular, Spring',
    salary: '32.000 - 38.000€',
    currentPlacementBonus: 15,
  };

  currentSender="Schachermayer GmbH";
  currentMessage = "";
  showUploadFile = false;

  public chatMessages = [
    {
      sender: 'Schachermayer GmbH',
      message: 'Hello, how can I help you?',
      time: '10:00',
    },
    {
      sender: 'Hornbach Baumarkt GmbH',
      message: 'Hello, I would like to order some products.',
      time: '11:00',
    },
    {
      sender: 'Schachermayer GmbH',
      message: 'Sure, which products would you like to order?',
      time: '12:00',
    },
    {
      sender: 'Hornbach Baumarkt GmbH',
      message: 'I would like to order some screws and nails.',
      time: '13:00',
    },
    {
      sender: 'Schachermayer GmbH',
      message: 'Sure, how many screws and nails would you like to order?',
      time: '14:00',
    },
    {
      sender: 'Hornbach Baumarkt GmbH',
      message: 'I would like to order 100 screws and 50 nails.',
      time: '15:00',
    },
    {
      sender: 'Schachermayer GmbH',
      message: 'Sure, we will deliver the products to your address.',
      time: '16:00',
    },
    {
      sender: 'Hornbach Baumarkt GmbH',
      message: 'Thank you very much.',
      time: '17:00',
    },
  ];

  constructor(public dataService: DataService, private renderer: Renderer2) { }

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
    this.chatMessages.push({
      sender: this.currentSender,
      message: this.currentMessage,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
    });
    this.currentMessage = "";
    this.onScrollToBottomClick();
  }

  onScrollToBottomClick(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);  
  }
}
