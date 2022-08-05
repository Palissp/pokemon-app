export interface Pokemon {
  id: number;
  name: string;
  image: string;
  attack: number;
  defense: number;
  hp: number;
  type: string;
  id_author: number;
}

export interface PokemonResquest {
  id?: number;
  name: string;
  defense: number;
  attack: number;
  hp: number;
  image: string;
  type: string;
  idAuthor: number;
}

export interface CustomEvent<T> {
  type: string;
  data?: T;
}
