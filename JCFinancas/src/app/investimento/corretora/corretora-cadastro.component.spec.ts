import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorretoraCadastroComponent } from './corretora-cadastro.component';

describe('CorretoraCadastroComponent', () => {
  let component: CorretoraCadastroComponent;
  let fixture: ComponentFixture<CorretoraCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorretoraCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorretoraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
