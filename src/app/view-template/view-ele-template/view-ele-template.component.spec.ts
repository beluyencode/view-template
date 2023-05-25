import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEleTemplateComponent } from './view-ele-template.component';

describe('ViewEleTemplateComponent', () => {
  let component: ViewEleTemplateComponent;
  let fixture: ComponentFixture<ViewEleTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEleTemplateComponent]
    });
    fixture = TestBed.createComponent(ViewEleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
