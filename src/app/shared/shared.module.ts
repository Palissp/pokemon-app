import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockPageComponent} from "./components/block-page/block-page.component";


@NgModule({
  declarations: [BlockPageComponent],
  imports: [
    CommonModule
  ],
  exports: [BlockPageComponent]
})
export class SharedModule {
}
