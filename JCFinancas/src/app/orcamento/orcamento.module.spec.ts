import { OrcamentoModule } from './orcamento.module';

describe('OrcamentoModule', () => {
  let orcamentoModule: OrcamentoModule;

  beforeEach(() => {
    orcamentoModule = new OrcamentoModule();
  });

  it('should create an instance', () => {
    expect(orcamentoModule).toBeTruthy();
  });
});
