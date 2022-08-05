import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input()
  public arrayOfPokemons: Array<any> = [];
  @Output()
  public arrayOfPokemonsChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
