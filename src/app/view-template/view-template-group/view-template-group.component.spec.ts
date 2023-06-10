import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTemplateGroupComponent } from './view-template-group.component';

describe('ViewTemplateGroupComponent', () => {
  let component: ViewTemplateGroupComponent;
  let fixture: ComponentFixture<ViewTemplateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTemplateGroupComponent]
    });
    fixture = TestBed.createComponent(ViewTemplateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
