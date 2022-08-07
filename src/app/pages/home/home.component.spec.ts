import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClientModule} from "@angular/common/http";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [PokemonService],
      imports: [HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('ngOnInit', () => {
    it('should has pokemon array', () => {
      expect(component.arrayOfPokemons).toBeTruthy();
    })
  })

  describe('createEditHandler', () => {
    it('shouldnt has pokemonSelected', () => {
      component.createEditHandler(undefined);
      expect(component.selectedPokemon).toBeFalsy();
    })
    it('should has pokemonSelected', () => {
      component.createEditHandler({
        name: 'pokemon',
        id: 1,
        id_author: 1,
        defense: 1,
        attack: 1,
        type: 'type',
        image: 'image',
        hp: 1,
      });
      expect(component.selectedPokemon).toBeTruthy();
    })
  })

  describe('eventHandler', () => {
    it('create should call getPokemons', () => {
      spyOn(component, 'getPokemons');
      component.eventHandler({type: 'create'});
      expect(component.getPokemons).toHaveBeenCalled();
    })
    it('update should call getPokemons', () => {
      spyOn(component, 'getPokemons');
      component.eventHandler({type: 'update'});
      expect(component.getPokemons).toHaveBeenCalled();
    })
    it('cancel shouldnt call getPokemons', () => {
      spyOn(component, 'getPokemons');
      component.eventHandler({type: 'cancel'});
      expect(component.getPokemons).not.toHaveBeenCalled();
    })
  })
});
