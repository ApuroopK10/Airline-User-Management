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
  providers: [MessageService],
})
export class UserGridComponent implements OnInit {
  allUsers = [];
  userHeaders;
  editUser: User;
  deleteIndex;
  user: User = new User();
  userRoles: Array<object>;
  addUser = false;
  isLoading = false;
  parentUser: User;
  @ViewChild('modalRef') private modalRef: ElementRef;
  constructor(
    private opsService: UserOpsService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userHeaders = userHeaders;
    this.userRoles = rolesNoSuperAdmin;
    const loggedInUser = this.loginService.getUserData();
    if (loggedInUser.children.length > 0) {
      this.opsService
        .userOperations({ ids: loggedInUser.children }, 'getAllUsers')
        .subscribe(
          (response) => {
            if (response && response['success'] && response['data']) {
              this.allUsers = [...response['data']];
            }
            this.isLoading = false;
          },
          (userError) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to get Users-${userError.error.error}`,
            });
            this.isLoading = false;
          }
        );
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
    this.opsService
      .userOperations(
        { id: this.allUsers[rowIndex]._id, parentUser },
        'deleteUser'
      )
      .subscribe(
        (response) => {
          if (response && response['success'] && response['data']) {
            this.allUsers = [...response['data']['gridData']];
            if (response['data']['parent']) {
              this.loginService.setUserData(response['data']['parent']);
            }
          }
          this.isLoading = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to delete Users-${error}`,
          });
          this.isLoading = false;
        }
      );
  }

  addClicked() {
    this.addUser = true;
    this.user = new User();
  }

  userOperations(type: string) {
    if (type === 'add') {
      const { name, email, password, role, children } = this.user;
      const parentUser = this.loginService.getUserData();
      this.opsService
        .userOperations(
          {
            newUser: { name, email, password, role: role['value'], children },
            parentUser,
          },
          'createUser'
        )
        .subscribe(
          (response) => {
            if (response && response['success'] && response['data']) {
              this.allUsers = [...response['data']['gridData']];
              if (response['data']['parent']) {
                this.loginService.setUserData(response['data']['parent']);
              }
            }
            this.isLoading = false;
            this.addUser = false;
            this.modalRef.nativeElement.click();
          },
          (addError) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to Add User - ${addError.error.error}`,
            });
            this.isLoading = false;
            this.addUser = false;
            this.modalRef.nativeElement.click();
          }
        );
    } else {
      this.opsService
        .userOperations(
          {
            updateUser: this.editUser,
          },
          'updateUser'
        )
        .subscribe(
          (response) => {
            if (
              response &&
              response['success'] &&
              response['data'] &&
              response['data']['updatedUser']
            ) {
              const updatedIdx = this.allUsers.findIndex(
                (user) => user._id === response['data']['updatedUser']['_id']
              );
              this.allUsers[updatedIdx] = {
                ...response['data']['updatedUser'],
              };
            }
            this.isLoading = false;
            this.addUser = false;
            this.editUser = new User();
            this.modalRef.nativeElement.click();
          },
          (updateError) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to Update User - ${updateError.error.error}`,
            });
            this.isLoading = false;
            this.editUser = new User();
            this.addUser = false;
            this.modalRef.nativeElement.click();
          }
        );
    }
  }

  closeModal() {
    this.modalRef.nativeElement.click();
  }
}
