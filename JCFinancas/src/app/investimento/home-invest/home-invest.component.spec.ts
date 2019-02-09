import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInvestComponent } from './home-invest.component';

describe('HomeInvestComponent', () => {
  let component: HomeInvestComponent;
  let fixture: ComponentFixture<HomeInvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
