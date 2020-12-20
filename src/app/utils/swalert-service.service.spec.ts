import { TestBed } from '@angular/core/testing';

import { SwalertServiceService } from './swalert-service.service';

describe('SwalertServiceService', () => {
  let service: SwalertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
