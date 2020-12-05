import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemEditComponent } from './blog-item-edit.component';

describe('BlogItemEditComponent', () => {
  let component: BlogItemEditComponent;
  let fixture: ComponentFixture<BlogItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
