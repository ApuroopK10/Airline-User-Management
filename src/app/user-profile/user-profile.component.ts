import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  updateForm: FormGroup;
  submitted = false;
  constructor(
    private loginService: LoginService,
    private opsService: UserOpsService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userRoles = roles;

    this.loggedInUser = this.loginService.getUserData();
    this.updateForm = this.formBuilder.group({
      name: [this.loggedInUser.name, Validators.required],
      email: [this.loggedInUser.email, [Validators.required, Validators.email]],
      password: [
        this.loggedInUser.password,
        [Validators.required, Validators.minLength(6)],
      ],
      role: [this.loggedInUser.role, Validators.required],
    });
    this.header = {
      name: this.loggedInUser.name,
      role: this.loggedInUser.role,
    };
  }

  // getter method for form control fields to validate
  get f() {
    return this.updateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }
    this.updateProfile();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  updateProfile() {
    this.isLoading = true;
    const { name, email, password, role } = this.updateForm.value;
    this.updateSub = this.opsService
      .userOperations(
        {
          updateUser: {
            name,
            email,
            password,
            role,
            children: this.loggedInUser.children,
            _id: this.loggedInUser['_id'],
          },
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
