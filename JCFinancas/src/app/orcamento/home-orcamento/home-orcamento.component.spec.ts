import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOrcamentoComponent } from './home-orcamento.component';

describe('HomeOrcamentoComponent', () => {
  let component: HomeOrcamentoComponent;
  let fixture: ComponentFixture<HomeOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
