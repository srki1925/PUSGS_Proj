import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationsComponent } from './add-stations.component';

describe('AddStationsComponent', () => {
  let component: AddStationsComponent;
  let fixture: ComponentFixture<AddStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
