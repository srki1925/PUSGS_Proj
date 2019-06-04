import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusStationComponent } from './create-bus-station.component';

describe('CreateBusStationComponent', () => {
  let component: CreateBusStationComponent;
  let fixture: ComponentFixture<CreateBusStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBusStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
