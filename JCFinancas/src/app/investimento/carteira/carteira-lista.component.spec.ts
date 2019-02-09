import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraListaComponent } from './carteira-lista.component';

describe('CarteiraListaComponent', () => {
  let component: CarteiraListaComponent;
  let fixture: ComponentFixture<CarteiraListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteiraListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteiraListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
