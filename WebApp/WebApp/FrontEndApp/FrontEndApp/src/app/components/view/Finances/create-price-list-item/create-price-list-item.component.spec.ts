import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePriceListItemComponent } from './create-price-list-item.component';

describe('CreatePriceListItemComponent', () => {
  let component: CreatePriceListItemComponent;
  let fixture: ComponentFixture<CreatePriceListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePriceListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePriceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
