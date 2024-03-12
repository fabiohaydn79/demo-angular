import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabulatorComponent } from './tabulator.component';
import { MaterialModule } from '../../app/material/material.module';

@NgModule({
  declarations: [TabulatorComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    TabulatorComponent
  ]
})
export class TabulatorModule { }
