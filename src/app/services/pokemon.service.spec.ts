import {TestBed} from '@angular/core/testing';

import {PokemonService} from './pokemon.service';
import {HttpClientModule} from "@angular/common/http";
import {PokemonResquest} from "../models/pokemon";

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
  });

  describe('Test for check return of services', () => {
    it('getPokemons should return an array of Pokemons', (doneFn) => {
      service.getPokemons().subscribe(pokemons => {
        expect(pokemons.length).toBeGreaterThan(0);
        doneFn();
      })
    });
    it('postPokemon should create a new Pokemon', (doneFn) => {
      let pokemon: PokemonResquest = {
        name: 'Create Pokemon Test',
        idAuthor: 1,
        attack: 50,
        defense: 50,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        hp: 50,
        type: 'electric',
      }
      service.postPokemon(pokemon).subscribe(pokemonCreated => {
        expect(pokemonCreated.name).toBe(pokemon.name);
        doneFn();
      })
    });
    it('actualizarPokemon should update a Pokemon', (doneFn) => {
      let pokemon: PokemonResquest = {
        name: 'Pikachu',
        idAuthor: 1,
        attack: 50,
        defense: 50,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        hp: 50,
        type: 'electric',
        id: 1,
      }
      service.postPokemon(pokemon).subscribe(pokemonCreated => {
        pokemon.name = 'Update Pokemon Test';
        service.actualizarPokemon(pokemon, pokemonCreated.id).subscribe(pokemonUpdated => {
          expect(pokemonUpdated.name).toBe(pokemon.name);
          doneFn();
        })
      })
    })
    it('borrarPokemon should delete a Pokemon', (doneFn) => {
      let pokemon: PokemonResquest = {
        name: 'Caterpie',
        idAuthor: 1,
        attack: 50,
        defense: 50,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
        hp: 50,
        type: 'electric',
        id: 1,
      }
      service.postPokemon(pokemon).subscribe(pokemonCreated => {
        service.borrarPokemon(pokemonCreated.id).subscribe(pokemonDeleted => {
          expect(pokemonDeleted.success).toBeTruthy();
          doneFn();
        })
      })
    })
  })

});
