import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  openMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  scrollIntoView(elem: string) {
    document.querySelector(elem)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
