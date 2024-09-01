import { TestBed } from '@angular/core/testing';

import { GuardianServiceService } from './guardian-service.service';

describe('GuardianServiceService', () => {
  let service: GuardianServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardianServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
