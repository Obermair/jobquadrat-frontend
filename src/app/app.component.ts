import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserverService } from './breakpoint.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jobquadrat';

  constructor(private dataService: DataService,
    private _breakpointObserverService: BreakpointObserverService) {
    this._breakpointObserverService.size$.subscribe(
      (data: string) => {
        this.dataService.currentBreakpoint = data;
      }
    );
  }
}
