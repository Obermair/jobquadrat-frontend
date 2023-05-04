import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { DataService } from '../data.service';
import localeDe from '@angular/common/locales/de';

@Component({
  selector: 'app-advertisement-profile',
  templateUrl: './advertisement-profile.component.html',
  styleUrls: ['./advertisement-profile.component.scss']
})
export class AdvertisementProfileComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    registerLocaleData(localeDe);
  }

  showValueinHTMLList(value: string){
    if(value != ""){
      let valueArray = value.split("<*>");
      valueArray.pop();

      let listResult = "<ul class='list-disc'>";
      //add <li> tags to each element of the array
      for(let i = 0; i < valueArray.length; i++){
        listResult += "<li>" + valueArray[i] + "</li>";
      }
      listResult += "</ul>";
      
      return listResult;
    } else{
      return [];
    }
  }
    

}
