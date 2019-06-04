import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusStationComponent } from './list-bus-station.component';

describe('ListBusStationComponent', () => {
  let component: ListBusStationComponent;
  let fixture: ComponentFixture<ListBusStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBusStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
