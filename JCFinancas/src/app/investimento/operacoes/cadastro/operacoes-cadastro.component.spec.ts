import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesCadastroComponent } from './operacoes-cadastro.component';

describe('OperacoesCadastroComponent', () => {
  let component: OperacoesCadastroComponent;
  let fixture: ComponentFixture<OperacoesCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
