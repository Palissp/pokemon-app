import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private getPokemonUrl = environment.apiUrl + '?idAuthor=1'

  constructor(private _http: HttpClient) {
  }

  public getPokemons(): Observable<any> {
    return this._http.get(this.getPokemonUrl);
  }
}
