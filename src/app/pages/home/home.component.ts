import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public arrayOfPokemons: Pokemon[] = [];
  public blockPage: boolean = false;

  constructor(private _pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.blockPage = true
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
