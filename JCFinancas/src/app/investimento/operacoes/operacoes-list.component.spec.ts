import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesListComponent } from './operacoes-list.component';

describe('OperacoesListComponent', () => {
  let component: OperacoesListComponent;
  let fixture: ComponentFixture<OperacoesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
