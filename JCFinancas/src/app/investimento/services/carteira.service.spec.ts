import { TestBed, inject } from '@angular/core/testing';

import { CarteiraService } from './carteira.service';

describe('CarteiraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarteiraServiceService]
    });
  });

  it('should be created', inject([CarteiraService], (service: CarteiraService) => {
    expect(service).toBeTruthy();
  }));
});
