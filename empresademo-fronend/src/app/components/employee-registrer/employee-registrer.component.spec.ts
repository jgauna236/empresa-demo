import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegistrerComponent } from './employee-registrer.component';

describe('EmployeeRegistrerComponent', () => {
  let component: EmployeeRegistrerComponent;
  let fixture: ComponentFixture<EmployeeRegistrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRegistrerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
