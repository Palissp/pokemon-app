import {Component, OnInit} from '@angular/core';
import {CustomEvent, Pokemon, PokemonResquest} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public blockPage: boolean = false;
  public showAddPokemon: boolean = false;
  public selectedPokemon?: Pokemon;
  public arrayOfPokemons: Pokemon[] = [];
  constructor(private _pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.getPokemons();
  }

  createEditHandler($event: Pokemon | undefined) {
    this.selectedPokemon = $event;
    this.showAddPokemon = true;
  }

  eventHandler($event: CustomEvent<Pokemon | undefined>) {
    switch ($event.type) {
      case'cancel':
        this.showAddPokemon = false;
        break;
      case 'create':
        this.getPokemons();
        this.showAddPokemon = false;
        break;
      case 'update':
        this.getPokemons();
        this.showAddPokemon = false;
        break;
    }
  }

  public getPokemons(): void {
    this.blockPage = true;
    this._pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.blockPage = false;
        this.arrayOfPokemons = data;
      },
      error: (err) => {
        this.blockPage = false;
        console.log(err);
      }
    })
  }

}
