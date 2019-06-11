import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListItemsComponent } from './price-list-items.component';

describe('PriceListItemsComponent', () => {
  let component: PriceListItemsComponent;
  let fixture: ComponentFixture<PriceListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
