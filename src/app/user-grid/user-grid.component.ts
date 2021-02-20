import { Component, OnInit } from '@angular/core';
import { roles, userData, userHeaders } from '../app.constants';
import { User } from '../shared/models/User.model';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {

  userData;
  userHeaders;
  editUser: User;
  deleteIndex;
  user: User = new User('', '', '', '', []);
  userRoles;
  addUser = false;
  constructor() { }

  ngOnInit(): void {
    this.userData = userData;
    this.userHeaders = userHeaders;
    this.userRoles = roles;
  }

  updateUser(row) {
    this.editUser = row;
  }

  deleteUser(rowIndex) {
    this.userData.splice(rowIndex, 1);
    this.userData = [...this.userData];
  }

  addClicked() {
    this.addUser = true;
  }

}
