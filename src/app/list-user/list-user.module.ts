import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user.component';
import { MaterialModule } from './../material/material.module';
import { TabulatorModule } from '../../shared/tabulator/tabulator.module';

@NgModule({
  declarations: [ListUserComponent],
  imports: [
    CommonModule,
    TabulatorModule,
    MaterialModule
  ],
  exports: [
    TabulatorModule
  ]
})
export class ListUserModule { }
