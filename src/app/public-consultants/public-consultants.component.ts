import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-public-consultants',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './public-consultants.component.html',
  styleUrl: './public-consultants.component.scss'
})
export class PublicConsultantsComponent {

  constructor(public dataService: DataService) { 
    this.dataService.loadPublicConsultants();
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
