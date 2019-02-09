import { TestBed, inject } from '@angular/core/testing';

import { OperacaoService } from './operacao.service';

describe('OperacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperacaoService]
    });
  });

  it('should be created', inject([OperacaoService], (service: OperacaoService) => {
    expect(service).toBeTruthy();
  }));
});
