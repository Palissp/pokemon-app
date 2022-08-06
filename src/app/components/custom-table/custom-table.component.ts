import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CustomEvent, Pokemon} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, OnDestroy {
  public arrayOfPokemons: Pokemon[] = [];
  @Output()
  public onCreateEditPokemon: EventEmitter<Pokemon | undefined> = new EventEmitter<Pokemon | undefined>();
  @Output()
  public blockPageEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public tableIndex: number = 0;
  public currentRowPage: number = 0;
  public pokemonsTable: Pokemon[] = [];
  public dataTemp: any = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private _pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getPokemons(): void {
    this.blockPageEmitter.emit(true);
    this._pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.blockPageEmitter.emit(false);
        this.arrayOfPokemons = data;
      },
      error: (err) => {
        this.blockPageEmitter.emit(false);
        console.log(err);
      }
    })
  }

  public deletePokemon(pokemon: Pokemon): void {
    if (confirm('¿Estás seguro de que quieres borrar este Pokémon?')) {
      this.blockPageEmitter.emit(true);
      this.subscriptions.add(
        this._pokemonService.borrarPokemon(pokemon.id).subscribe({
          next: (data) => {
            if (data.success) {
              if (!data.success) {
                this.blockPageEmitter.emit(false);
                return alert(data.data)
              }
            }
            this.blockPageEmitter.emit(false);
            alert('Pokemon borrado correctamente')
            this.arrayOfPokemons = this.arrayOfPokemons.filter(pokemonArray => pokemonArray.id !== pokemon.id);
          },
          error: (err) => {
            alert('Error al borrar el pokemon')
            this.blockPageEmitter.emit(false);
          }
        }))
    }
  }

  public editPokemon(pokemon: Pokemon): void {
    this.onCreateEditPokemon.emit(pokemon);
  }

  public addPokemon(): void {
    this.onCreateEditPokemon.emit(undefined)
  }

  public getData($event: any): void {
    this.pokemonsTable = []
    this.pokemonsTable = $event;
  }

  getCurrentRowPage($event: number) {
    if (this.tableIndex == 1) {
      this.currentRowPage = 0;
    } else {
      this.currentRowPage = $event;
    }
  }

  getCurrentPage($event: number) {
    this.tableIndex = $event;
  }

  public findPokemons(input: Event): void {
    const target = input.target as HTMLInputElement;
    let data = target.value;
    data = data.toLowerCase();
    if (this.dataTemp.length > 0) {
      this.arrayOfPokemons = this.dataTemp;
      this.pokemonsTable = this.dataTemp;
    } else {
      this.dataTemp = this.arrayOfPokemons;
      this.pokemonsTable = this.arrayOfPokemons;
    }
    this.arrayOfPokemons = this.arrayOfPokemons?.filter((m) => m.name.toLowerCase().indexOf(data) !== -1);
    this.pokemonsTable = this.pokemonsTable?.filter((m) => m.name.toLowerCase().indexOf(data) !== -1);
    if (data === '') {
      this.arrayOfPokemons = this.dataTemp;
      this.pokemonsTable = this.dataTemp;
    }
  }


}
