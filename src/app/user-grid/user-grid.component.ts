import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { rolesNoSuperAdmin, userData, userHeaders } from '../app.constants';
import { LoginService } from '../login-page/services/login.service';
import { User } from '../shared/models/User.model';
import { UserOpsService } from './services/user-ops.service';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss'],
  providers:[MessageService]
})
export class UserGridComponent implements OnInit {

  allUsers = [];
  userHeaders;
  editUser: User;
  deleteIndex;
  user: User = new User('', '', '', '', []);
  userRoles;
  addUser = false;
  isLoading = false;
  @ViewChild('modalRef') private modalRef: ElementRef;
  constructor(private opsService: UserOpsService, private loginService: LoginService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.userHeaders = userHeaders;
    this.userRoles = rolesNoSuperAdmin;
    const allUsers = this.loginService.getUserData();
    if (allUsers.children.length > 0) {
      this.opsService.userOperations(allUsers.children, 'getAllUsers').subscribe(response => {
        this.isLoading = false;
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: `Failed to get Users-${error}`});
        this.isLoading = false;
      });
    } else {
      this.allUsers = [];
    }
    
    
    // this.userData = userData;

  }

  updateUser(row) {
    this.editUser = row;
  }

  deleteUser(rowIndex) {

    const parentUser = this.loginService.getUserData();
    this.opsService.userOperations({id: this.allUsers[rowIndex]._id}, 'deleteUser').subscribe(response => {
      if (response) {
        this.allUsers.splice(rowIndex, 1);
        this.allUsers = [...this.allUsers];
      }
      this.isLoading = false;
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: `Failed to delete Users-${error}`});
      this.isLoading = false;
    });
  }

  addClicked() {
    this.addUser = true;
  }

  userOperations(type: string, data?) {
    if(type === 'add') {
      const { name, email, password, role, children} = this.user;
      const parentUser = this.loginService.getUserData();
      this.opsService.userOperations({newUser: {name, email, password, role: role['value'], children}, parentUser}, 'createUser').subscribe(response => {
        if(response && response['data']) {
          this.allUsers = [...response['data']];
        }
        this.isLoading = false;
        this.addUser = false;
        this.modalRef.nativeElement.click();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to create Users'});
        this.isLoading = false;
        this.addUser = false;
      });
    }
    
  }

  closeModal() {
    this.modalRef.nativeElement.click();

  }

}
