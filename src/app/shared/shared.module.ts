import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockPageComponent} from "./components/block-page/block-page.component";
import { PaginatorComponent } from './components/paginator/paginator.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [BlockPageComponent, PaginatorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [BlockPageComponent, PaginatorComponent]
})
export class SharedModule {
}
