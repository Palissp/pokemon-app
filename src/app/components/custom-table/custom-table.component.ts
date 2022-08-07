import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CustomEvent, Pokemon} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, OnDestroy {
  @Input()
  public arrayOfPokemons: Pokemon[] = [];
  @Output()
  public onCreateEditPokemon: EventEmitter<Pokemon | undefined> = new EventEmitter<Pokemon | undefined>();
  @Output()
  public blockPageEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public showAddPokemon?: boolean;
  @Output()
  public showAddPokemonChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public tableIndex: number = 0;
  public currentRowPage: number = 0;
  public pokemonsTable: Pokemon[] = [];
  public dataTemp: any = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private _pokemonService: PokemonService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  public deleteHandler(pokemon: Pokemon): void {
    if(!pokemon){
      return alert('No se puede borrar un Pokémon que no existe');
    }
    if (confirm('¿Estás seguro de que quieres borrar este Pokémon?')) {
      this.deletePokemon(pokemon);
    }
  }

  public deletePokemon(pokemon: Pokemon): void {
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
          this.showAddPokemonChange.emit(false);
          this.arrayOfPokemons = this.arrayOfPokemons.filter(pokemonArray => pokemonArray.id !== pokemon.id);
        },
        error: (err) => {
          alert('Error al borrar el pokemon')
          this.blockPageEmitter.emit(false);
        }
      }))
  }

  public editPokemon(pokemon: Pokemon): void {
    this.onCreateEditPokemon.emit(pokemon);
  }

  public addPokemon(): void {
    this.onCreateEditPokemon.emit(undefined)
  }

  public getData($event: any): void {
    this.pokemonsTable = $event;
    this.cd.detectChanges();
  }

  public getCurrentRowPage($event: number): void {
    if (this.tableIndex == 1) {
      this.currentRowPage = 0;
    } else {
      this.currentRowPage = $event;
    }
  }

  public getCurrentPage($event: number): void {
    this.tableIndex = $event;
  }

  public findPokemon(input: Event): void {
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
