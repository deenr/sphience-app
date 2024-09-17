/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickActionComponent } from './quick-action.component';

describe('QuickActionComponent', () => {
  let component: QuickActionComponent;
  let fixture: ComponentFixture<QuickActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
