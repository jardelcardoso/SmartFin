import { TestBed, inject } from '@angular/core/testing';

import { CorretoraService } from './corretora.service';

describe('CorretoraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorretoraServiceService]
    });
  });

  it('should be created', inject([CorretoraService], (service: CorretoraService) => {
    expect(service).toBeTruthy();
  }));
});
