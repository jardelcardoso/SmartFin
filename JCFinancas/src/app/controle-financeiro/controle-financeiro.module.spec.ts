import { ControleFinanceiroModule } from './controle-financeiro.module';

describe('ControleFinanceiroModule', () => {
  let controleFinanceiroModule: ControleFinanceiroModule;

  beforeEach(() => {
    controleFinanceiroModule = new ControleFinanceiroModule();
  });

  it('should create an instance', () => {
    expect(controleFinanceiroModule).toBeTruthy();
  });
});
