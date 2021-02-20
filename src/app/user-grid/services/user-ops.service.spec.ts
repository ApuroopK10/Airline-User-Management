import { TestBed } from '@angular/core/testing';

import { UserOpsService } from './user-ops.service';

describe('UserOpsService', () => {
  let service: UserOpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
