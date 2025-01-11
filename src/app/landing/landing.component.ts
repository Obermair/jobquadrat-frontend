import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  logos = [
    {
      src: '../../assets/images/testimonial1.png',
    },
    {
      src: '../../assets/images/testimonial2.png',
    },
    {
      src: '../../assets/images/testimonial3.png',
    },
    {
      src: '../../assets/images/testimonial4.png',
    },
    {
      src: '../../assets/images/testimonial5.png',
    },
    {
      src: '../../assets/images/testimonial6.png',
    },
    {
      src: '../../assets/images/testimonial7.png',
    },
    {
      src: '../../assets/images/testimonial8.png',
    },
    {
      src: '../../assets/images/testimonial9.png',
    },
    {
      src: '../../assets/images/testimonial10.png',
    },
    {
      src: '../../assets/images/testimonial11.png',
    },
  ];

  displayLogos = [...this.logos, ...this.logos]; // Duplicates the logos for infinite scrolling
  scrollOffset = 0;
  scrollSpeed = 1.8; // Adjust this for faster/slower scrolling
  intervalId!: any;

  openMenu: boolean = false;
  form: any = {
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    message: ''
  };
  showErrorMessage: boolean = false;
  showVideo: boolean = false;

  constructor(public dataService: DataService) { 
    this.getLandingPageAdvertisements();
    
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.scroll();
    }, 30); // Slide every 3 seconds
  }

  ngOnDestroy() {
    // Clear interval when component is destroyed
    clearInterval(this.intervalId);
  }

 
  scroll() {
    this.scrollOffset += this.scrollSpeed;

    // Reset scroll when the first set of logos has scrolled out of view
    const logoWidth = 4000 + 16; // Approx. logo width + padding (adjust as needed)
    const totalWidth = this.logos.length * logoWidth;

    if (this.scrollOffset >= totalWidth) {
      this.scrollOffset = 0;
    }
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
