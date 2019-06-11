import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPriceListItemComponent } from './list-price-list-item.component';

describe('ListPriceListItemComponent', () => {
  let component: ListPriceListItemComponent;
  let fixture: ComponentFixture<ListPriceListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPriceListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPriceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
