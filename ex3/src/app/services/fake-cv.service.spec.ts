import { TestBed } from '@angular/core/testing';

import { FakeCvService } from './fake-cv.service';

describe('FakeCvService', () => {
  let service: FakeCvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeCvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
