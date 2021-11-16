import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducHeaderBaseComponent } from './produc-header-base.component';

describe('ProducHeaderBaseComponent', () => {
  let component: ProducHeaderBaseComponent;
  let fixture: ComponentFixture<ProducHeaderBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducHeaderBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducHeaderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
