import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-edit-pokemon',
  templateUrl: './create-edit-pokemon.component.html',
  styleUrls: ['./create-edit-pokemon.component.css']
})
export class CreateEditPokemonComponent implements OnInit {
  @Input()
  public selectedPokemon?: any;

  public pokemonForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.pokemonForm = this._fb.group({
      nombre: ['', Validators.required],
      ataque: [0, Validators.required],
      imagen: ['', Validators.required],
      defensa: [0, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  showRange($event: any) {

  }

  hideRange() {

  }
}
