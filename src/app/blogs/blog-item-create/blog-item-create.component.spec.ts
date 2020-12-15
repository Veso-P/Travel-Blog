import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemCreateComponent } from './blog-item-create.component';

describe('BlogItemCreateComponent', () => {
  let component: BlogItemCreateComponent;
  let fixture: ComponentFixture<BlogItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogItemCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
