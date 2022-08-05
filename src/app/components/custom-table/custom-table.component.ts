import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input()
  public arrayOfPokemons: Pokemon[] = [];
  @Input()
  public searchString: string = '';
  @Output()
  public arrayOfPokemonsChange: EventEmitter<any> = new EventEmitter();

  @Output()
  public selectingPokemon: EventEmitter<Pokemon> = new EventEmitter();
  public tableIndex: number = 0;
  public currentRowPage: number = 0;
  public pokemonsTable: Pokemon[] = [];
  public dataTemp: any = [];

  constructor(private _pokemonService: PokemonService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.findPokemons(this.searchString);
  }

  deletePokemon(pokemon: Pokemon) {
    if (confirm('¿Estás seguro de que quieres borrar este Pokémon?')) {
      this._pokemonService.borrarPokemon(pokemon.id).subscribe({
        next: (data) => {
          if (data.success) {
            if (!data.success) {
              return alert(data.data)
            }
          }
          alert('Pokemon borrado correctamente')
          this.arrayOfPokemons = this.arrayOfPokemons.filter(pokemonArray => pokemonArray.id !== pokemon.id);
          this.arrayOfPokemonsChange.emit(this.arrayOfPokemons);
        }
      })
    }
  }

  editPokemon(pokemon: Pokemon) {
    this.selectingPokemon.emit(pokemon);
  }

  getData($event: any) {
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

  public findPokemons(value: string): void {
    let data = value;
    data = data.toLowerCase();
    if (this.dataTemp.length > 0) {
      this.arrayOfPokemons = this.dataTemp;
      this.pokemonsTable = this.dataTemp;
    } else {
      this.dataTemp = this.arrayOfPokemons;
      this.pokemonsTable = this.arrayOfPokemons;
    }
    this.arrayOfPokemons = this.arrayOfPokemons?.filter((m: any) => {
      if (m.name.toLowerCase().indexOf(data) !== -1) {
        return m;
      }
    });
    this.pokemonsTable = this.pokemonsTable?.filter((m: any) => {
      if (m.name.toLowerCase().indexOf(data) !== -1) {
        return m;
      }
    });
    if (data === '') {
      this.arrayOfPokemons = this.dataTemp;
      this.pokemonsTable = this.dataTemp;
    }
  }
}
