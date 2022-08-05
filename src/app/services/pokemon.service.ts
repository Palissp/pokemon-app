import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pokemon, PokemonResquest} from "../models/pokemon";
import {serviceResponse} from "../models/services";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private getPostPokemonUrl = environment.apiUrl + '?idAuthor=1'
  private actualizarBorrarPokemonUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  public getPokemons(): Observable<any> {
    return this._http.get(this.getPostPokemonUrl);
  }

  public postPokemon(pokemon: PokemonResquest): Observable<Pokemon & serviceResponse> {
    return this._http.post<Pokemon & serviceResponse>(this.getPostPokemonUrl, pokemon);
  }

  public actualizarPokemon(pokemon: PokemonResquest, id: number): Observable<Pokemon & serviceResponse> {
    return this._http.put<Pokemon & serviceResponse>(this.actualizarBorrarPokemonUrl + id, pokemon);
  }

  public borrarPokemon(id: number): Observable<Pokemon & serviceResponse> {
    return this._http.delete<Pokemon & serviceResponse>(this.actualizarBorrarPokemonUrl + id);
  }
}
