import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPriceListComponent } from './list-price-list.component';

describe('ListPriceListComponent', () => {
  let component: ListPriceListComponent;
  let fixture: ComponentFixture<ListPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
