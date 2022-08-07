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

  public getPokemons(): Observable<Pokemon[]> {
    return this._http.get<Pokemon[]>(this.getPostPokemonUrl);
  }

  public postPokemon(pokemon: PokemonResquest): Observable<Pokemon & serviceResponse> {
    return this._http.post<Pokemon & serviceResponse>(this.getPostPokemonUrl, pokemon);
  }

  public actualizarPokemon(pokemon: PokemonResquest, id: number): Observable<Pokemon & serviceResponse> {
    return this._http.put<Pokemon & serviceResponse>(this.actualizarBorrarPokemonUrl + id, pokemon);
  }

  public borrarPokemon(id: number): Observable<serviceResponse> {
    return this._http.delete<serviceResponse>(this.actualizarBorrarPokemonUrl + id);
  }

  public getPokemonById(id: number): Observable<Pokemon> {
    return this._http.get<Pokemon>(this.actualizarBorrarPokemonUrl + id);
  }

  public getByNRegistros(n: number): Observable<Pokemon[]> {
    return this._http.get<Pokemon[]>(this.getPostPokemonUrl + n + '?idAuthor=1');
  }
}
