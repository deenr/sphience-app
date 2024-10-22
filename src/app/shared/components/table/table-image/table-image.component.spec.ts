/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableImageComponent } from './table-image.component';

describe('TableImageComponent', () => {
  let component: TableImageComponent;
  let fixture: ComponentFixture<TableImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
