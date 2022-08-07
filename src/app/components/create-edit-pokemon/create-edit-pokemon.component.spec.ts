import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateEditPokemonComponent} from './create-edit-pokemon.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PokemonService} from "../../services/pokemon.service";
import {HttpClientModule} from "@angular/common/http";

describe('CreateEditPokemonComponent', () => {
  let component: CreateEditPokemonComponent;
  let fixture: ComponentFixture<CreateEditPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditPokemonComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [PokemonService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CreateEditPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Form Data Validations', () => {
    it('should create form with data when receive selectedPokemon', () => {
      component.selectedPokemon = {
        name: 'Pikachu',
        attack: 1,
        type: 'electric',
        image: 'https://img.pokemondb.net/artwork/pikachu.jpg',
        defense: 1,
        hp: 1,
      }
      component.ngOnChanges();
      expect(component.pokemonForm.value).toEqual(
        component.selectedPokemon
      );
    })
    it('should create form with initial data when not receive selected Pokemon', () => {
      expect(component.pokemonForm.value).toEqual({
        name: '',
        attack: 0,
        image: '',
        defense: 0,
        hp: 10,
        type: 'Water'
      })
    })
    it('shouldnt send form when form data is incomplete', () => {
      component.pokemonForm.patchValue({
        name: '',
        attack: 0,
        image: '',
        defense: 0,
        hp: 10,
        type: 'Water'
      })
      spyOn(component, 'createPokemon');
      component.formHandler()
      expect(component.createPokemon).not.toHaveBeenCalled();
    })
    it('should send form when form data is complete and hasnt selectedPokemon', () => {
      component.pokemonForm.patchValue({
        name: 'Pikachu',
        attack: 1,
        image: 'https://img.pokemondb.net/artwork/pikachu.jpg',
        defense: 1,
        hp: 1,
        type: 'electric'
      })
      spyOn(component, 'updatePokemon');
      spyOn(component, 'createPokemon');
      component.formHandler()
      expect(component.createPokemon).toHaveBeenCalled();
    })
    it('should send form when form data is complete and has selectedPokemon', () => {
      component.selectedPokemon = {
        name: 'Pikachu',
        attack: 1,
        image: 'https://img.pokemondb.net/artwork/pikachu.jpg',
        defense: 1,
        hp: 1,
        type: 'electric'
      }
      component.pokemonForm.patchValue({
        name: 'Pikachu',
        attack: 1,
        image: 'https://img.pokemondb.net/artwork/pikachu.jpg',
        defense: 1,
        hp: 1,
        type: 'electric'
      })
      spyOn(component, 'updatePokemon');
      component.formHandler()
      expect(component.updatePokemon).toHaveBeenCalled();
    })
  })
})
