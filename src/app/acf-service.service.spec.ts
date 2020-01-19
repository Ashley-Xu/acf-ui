import { TestBed } from '@angular/core/testing';

import { AcfServiceService } from './acf-service.service';

describe('AcfServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcfServiceService = TestBed.get(AcfServiceService);
    expect(service).toBeTruthy();
  });
});
