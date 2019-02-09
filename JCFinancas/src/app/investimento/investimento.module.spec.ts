import { InvestimentoModule } from './investimento.module';

describe('InvestimentoModule', () => {
  let investimentoModule: InvestimentoModule;

  beforeEach(() => {
    investimentoModule = new InvestimentoModule();
  });

  it('should create an instance', () => {
    expect(investimentoModule).toBeTruthy();
  });
});
