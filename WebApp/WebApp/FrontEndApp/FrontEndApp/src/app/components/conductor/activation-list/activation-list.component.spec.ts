import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationListComponent } from './activation-list.component';

describe('ActivationListComponent', () => {
  let component: ActivationListComponent;
  let fixture: ComponentFixture<ActivationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
