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
  })
});
