import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomTableComponent} from './custom-table.component';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClientModule} from "@angular/common/http";
import {Pokemon} from "../../models/pokemon";

describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTableComponent],
      providers: [PokemonService],
      imports: [HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deletePokemon', () => {
    it('should delete on confirm and has assigned a Pokemon', () => {
      const pokemon: Pokemon = {
        id: 1,
        name: 'pikachu',
        attack: 55,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        defense: 40,
        type: 'electric',
        hp: 35,
        id_author: 1
      };
      spyOn(component, 'deletePokemon');
      component.deleteHandler(pokemon);
      expect(component.deletePokemon).toHaveBeenCalled();
    });
    it('should call service to delete pokemon', (donFn) => {
      const pokemon: Pokemon = {
        id: 1,
        name: 'pikachu',
        attack: 55,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        defense: 40,
        type: 'electric',
        hp: 35,
        id_author: 1
      };
      component.deletePokemon(pokemon).then((resolve) => {
        expect(resolve).toBeTruthy();
        donFn();
      })
    })
  })

  describe('Emit Functions', () => {
    it('should emit onCreateEditPokemon', () => {
      const pokemon: Pokemon = {
        id: 1,
        name: 'pikachu',
        attack: 55,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        defense: 40,
        type: 'electric',
        hp: 35,
        id_author: 1
      };
      spyOn(component.onCreateEditPokemon, 'emit');
      component.editPokemon(pokemon);
      expect(component.onCreateEditPokemon.emit).toHaveBeenCalled();
    })
    it('should emit addPokemon', () => {
      spyOn(component.onCreateEditPokemon, 'emit');
      component.addPokemon();
      expect(component.onCreateEditPokemon.emit).toHaveBeenCalled();
    })
  })

  describe('getData Function', () => {
    it('should emit getData', () => {
      const pokemons: Pokemon[] = [{
        id: 1,
        name: 'pikachu',
        attack: 55,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        defense: 40,
        type: 'electric',
        hp: 35,
        id_author: 1
      }];
      component.getData(pokemons)
      expect(component.pokemonsTable).toEqual(pokemons)
    })
  })

  describe('getCurrentRowPage Function', () => {
    it('should set getCurrentRowPage', () => {
      component.getCurrentRowPage(1)
      expect(component.currentRowPage).toEqual(1)
    })
  })
  describe('getCurrentPage Function', () => {
    it('should set getCurrentPage', () => {
      component.getCurrentPage(1)
      expect(component.tableIndex).toEqual(1)
    })
  })

});
