import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomEvent, Pokemon, PokemonResquest} from "../../models/pokemon";

@Component({
  selector: 'app-create-edit-pokemon',
  templateUrl: './create-edit-pokemon.component.html',
  styleUrls: ['./create-edit-pokemon.component.css']
})
export class CreateEditPokemonComponent implements OnInit {
  @Input()
  public selectedPokemon?: any;
  @Output()
  public newPokemonEmmiter: EventEmitter<CustomEvent<PokemonResquest>> = new EventEmitter<CustomEvent<PokemonResquest>>()

  public pokemonForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.pokemonForm = this._fb.group({
      name: ['', Validators.required],
      attack: [0, Validators.required],
      image: ['', Validators.required],
      defense: [0, Validators.required],
      hp: [10],
      type: ['Water']
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.selectedPokemon) {
      this.pokemonForm.patchValue(this.selectedPokemon)
    } else {
      this.pokemonForm.reset();
    }
    document.getElementById("createEditPokemonComponent")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start"
    });
  }

  create(): any {
    if (!this.pokemonForm.valid) {
      return;
    }
    if (this.selectedPokemon) {
      let pokemonResquest: PokemonResquest = this.pokemonForm.value
      pokemonResquest.id = this.selectedPokemon.id
      this.newPokemonEmmiter.emit({
        type: 'edit',
        data: pokemonResquest
      })
    } else {
      this.newPokemonEmmiter.emit({
        type: 'create',
        data: this.pokemonForm.value as PokemonResquest
      })
    }
  }

  cancel() {
    this.newPokemonEmmiter.emit({
      type: 'cancel'
    })
  }
}
