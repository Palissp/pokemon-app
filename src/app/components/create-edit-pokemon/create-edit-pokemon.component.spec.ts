import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPokemonComponent } from './create-edit-pokemon.component';

describe('CreateEditPokemonComponent', () => {
  let component: CreateEditPokemonComponent;
  let fixture: ComponentFixture<CreateEditPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
