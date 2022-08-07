import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('paginator Functions', () => {
    it('should emit currentPage', () => {
      const currentPageEmit = spyOn(component.currentPageEmit, 'emit');
      component.nextPage();
      expect(currentPageEmit).toHaveBeenCalledWith(2);
    })
    it('should emit previousPage', () => {
      const currentPageEmit = spyOn(component.currentPageEmit, 'emit');
      component.previousPage();
      expect(currentPageEmit).toHaveBeenCalledWith(0);
    })
  })
});
