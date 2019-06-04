import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartureComponent } from './list-departure.component';

describe('ListDepartureComponent', () => {
  let component: ListDepartureComponent;
  let fixture: ComponentFixture<ListDepartureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDepartureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
