import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  openMenu: boolean = false;
  form: any = {
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    message: ''
  };
  showErrorMessage: boolean = false;

  constructor(public dataService: DataService) { 
    this.getLandingPageAdvertisements();
    
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  scrollIntoView(elem: string) {
    document.querySelector(elem)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  sendForm() {
    if(!this.dataService.formSent){
      //check if all fields are filled
      if (this.form.firstname == '' || this.form.lastname == '' || this.form.company == '' || this.form.email == '' || this.form.message == '') {
        this.showErrorMessage = true;
      }
      else {
        this.showErrorMessage = false;
        this.dataService.sendForm(this.form);
      }
    }
  }

  getLandingPageAdvertisements(){
    this.dataService.getAdvertisementsLandingPage();
  }
}
