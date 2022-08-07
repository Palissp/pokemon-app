import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomEvent, Pokemon, PokemonResquest} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-edit-pokemon',
  templateUrl: './create-edit-pokemon.component.html',
  styleUrls: ['./create-edit-pokemon.component.css']
})
export class CreateEditPokemonComponent implements OnInit {
  @Input()
  public selectedPokemon?: PokemonResquest;
  @Output()
  public actionFinishedEmitter: EventEmitter<CustomEvent<Pokemon | undefined>> = new EventEmitter<CustomEvent<Pokemon | undefined>>()
  @Output()
  public blockPageEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public pokemonForm!: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private _fb: FormBuilder,
              private _pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.setFormValues();
    if(this.selectedPokemon) {
      this.pokemonForm.patchValue(this.selectedPokemon)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Funcion que se ejecuta cuando ocurre un cambio en la acción de la tabla (crear o editar)
   */
  ngOnChanges(): void {
    if (!this.pokemonForm) {
      return
    }
    if (this.selectedPokemon) {
      this.pokemonForm.patchValue(this.selectedPokemon)
    } else {
      this.setFormValues();
    }
    document.getElementById("createEditPokemonComponent")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start"
    });
  }

  private setFormValues(): void {
    this.pokemonForm = this._fb.group({
      name: ['', Validators.required],
      attack: [0, Validators.required],
      image: ['', Validators.required],
      defense: [0, Validators.required],
      hp: [10],
      type: ['Water'],
    })
  }

  /**
   * Funcion que se ejecuta cuando se presiona el boton de crear o editar pokemon
   */
  public formHandler(): void {
    if (!this.pokemonForm.valid) {
      alert('Debe completar todos los campos del formulario!')
      return;
    }
    let pokemonRequest: PokemonResquest = this.pokemonForm.value
    pokemonRequest.idAuthor = 1;
    if (this.selectedPokemon) {
      pokemonRequest.id = this.selectedPokemon.id
      this.updatePokemon(pokemonRequest);
    } else {
      this.createPokemon(pokemonRequest);
    }
  }


  public createPokemon(pokemonData: PokemonResquest): void {
    this.blockPageEmitter.emit(true);
    this.subscriptions.add(
      this._pokemonService.postPokemon(pokemonData).subscribe({
        next: (data) => {
          if (data.success) {
            if (!data.success)
              return alert(data.data)
          }
          this.blockPageEmitter.emit(false);
          // this.arrayOfPokemons.push(data);
          alert('Pokemon creado con exito');
          this.actionFinishedEmitter.emit({
            type: 'create',
            data: data
          });
        }, error: (err) => {
          this.blockPageEmitter.emit(false);
          alert(err)
          console.log(err);
        }
      })
    )
  }

  public updatePokemon(pokemonData: PokemonResquest): void {
    this.blockPageEmitter.emit(true);
    this.subscriptions.add(
      this._pokemonService.actualizarPokemon(pokemonData, pokemonData.id!).subscribe({
        next: (data) => {
          if (data.success) {
            if (!data.success)
              return alert(data.data)
          }
          this.blockPageEmitter.emit(false)
          alert('Pokemon editado con exito');
          this.actionFinishedEmitter.emit({
            type: 'update',
            data: data
          });
        }, error: (err) => {
          alert(err);
          console.error(err);
        }
      })
    )
  }

  public cancel(): void {
    this.actionFinishedEmitter.emit({
      type: 'cancel',
      data: undefined
    })
  }
}
