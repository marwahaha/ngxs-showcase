import {Component, OnInit} from '@angular/core';
import {AppState} from '../../shared/store/states/app.state';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Person} from '../../models/person.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Select(AppState.getSelectedPerson)
  selectedPerson$: Observable<Person>;

  showAddressMenu: boolean;

  constructor() {
  }

  ngOnInit() {
    this.selectedPerson$.subscribe(
      person => {
        if (person) {
          this.showAddressMenu = true;
        } else {
          this.showAddressMenu = false;
        }
      }
    );
  }

}
