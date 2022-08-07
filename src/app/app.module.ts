import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { CreateEditPokemonComponent } from './components/create-edit-pokemon/create-edit-pokemon.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PokemonService} from "./services/pokemon.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomTableComponent,
    CreateEditPokemonComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        FormsModule
    ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
