import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartureComponent } from './create-departure.component';

describe('CreateDepartureComponent', () => {
  let component: CreateDepartureComponent;
  let fixture: ComponentFixture<CreateDepartureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDepartureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
