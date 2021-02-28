import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { roles } from '../app.constants';
import { LoginService } from '../login-page/services/login.service';
import { User } from '../shared/models/User.model';
import { UserOpsService } from '../user-grid/services/user-ops.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  editMode = false;
  userRoles: Array<object>;
  updateSub: Subscription;
  isLoading = false;
  header;
  constructor(
    private loginService: LoginService,
    private opsService: UserOpsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userRoles = roles;
    this.loggedInUser = this.loginService.getUserData();
    this.header = {
      name: this.loggedInUser.name,
      role: this.loggedInUser.role,
    };
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  updateProfile() {
    this.isLoading = true;
    this.updateSub = this.opsService
      .userOperations(
        {
          updateUser: this.loggedInUser,
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
            this.loggedInUser = response['data']['updatedUser'];
            this.loginService.setUserData(response['data']['updatedUser']);
            this.header = {
              name: this.loggedInUser.name,
              role: this.loggedInUser.role,
            };
          }
          this.isLoading = false;
          this.displayToaster('success', 'Success', `Updated Successfully`);
        },
        (updateError) => {
          this.displayToaster(
            'error',
            'Error',
            `Failed to Update User - ${updateError.error.error}`
          );
          this.isLoading = false;
        }
      );
  }

  displayToaster(severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
