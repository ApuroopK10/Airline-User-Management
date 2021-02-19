import { Component, OnInit } from '@angular/core';
import { userData, userHeaders } from '../app.constants';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {

  userData;
  userHeaders;
  editUser;
  deleteIndex;
  constructor() { }

  ngOnInit(): void {
    this.userData = userData;
    this.userHeaders = userHeaders;
  }

  updateUser(row) {
    this.editUser = row;
  }

  deleteUser(rowIndex) {
    this.userData.splice(rowIndex, 1);
    this.userData = [...this.userData];
  }

}
