import { TestBed, inject } from '@angular/core/testing';

import { CCPService } from './ccp.service';

describe('CCPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CCPService]
    });
  });

  it('should be created', inject([CCPService], (service: CCPService) => {
    expect(service).toBeTruthy();
  }));
});
