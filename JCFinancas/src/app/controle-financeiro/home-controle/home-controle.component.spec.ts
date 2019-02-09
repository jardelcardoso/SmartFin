import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeControleComponent } from './home-controle.component';

describe('HomeControleComponent', () => {
  let component: HomeControleComponent;
  let fixture: ComponentFixture<HomeControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
