import {Component, OnInit} from '@angular/core';
import {CustomEvent, Pokemon, PokemonResquest} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public arrayOfPokemons: Pokemon[] = [];
  public blockPage: boolean = false;
  public showAddPokemon: boolean = false;
  public pokemon?: Pokemon;
  public selectedPokemon?: Pokemon;
  public searchString: string = '';

  constructor(private _pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.getPokemons();
  }


  private getPokemons(): void {
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

  addPokemon() {
    this.selectedPokemon = undefined;
    this.showAddPokemon = true
  }


  createPokemon($event: CustomEvent<PokemonResquest>) {
    if ($event.type === 'cancel') {
      this.showAddPokemon = false;
      return;
    }
    if ($event.data) {
      $event.data.idAuthor = 1;
      this.blockPage = true;
      switch ($event.type) {
        case 'create':
          this._pokemonService.postPokemon($event.data).subscribe({
            next: (data) => {
              debugger
              if (data.success) {
                if (!data.success)
                  return alert(data.data)
              }
              this.blockPage = false;
              this.arrayOfPokemons.push(data);
              alert('Pokemon creado con exito');
              this.showAddPokemon = false;
            }, error: (err) => {
              this.blockPage = false;
              console.log(err);
            }
          })
          break;
        case 'edit':
          this._pokemonService.actualizarPokemon($event.data, $event.data.id!).subscribe({
            next: (data) => {
              if (data.success) {
                if (!data.success)
                  return alert(data.data)
              }
              this.blockPage = false;
              this.arrayOfPokemons.findIndex((pokemon) => {
                if (pokemon.id === $event.data!.id) {
                  this.arrayOfPokemons[this.arrayOfPokemons.indexOf(pokemon)] = data;
                }
              })
              alert('Pokemon editado con exito');
              this.showAddPokemon = false;
            }
          })
          break;
        default:
          this.blockPage = false;
          break;
      }
    }
  }

  onEditPokemon($event: Pokemon) {
    this.selectedPokemon = $event;
    this.showAddPokemon = true;
  }



}
