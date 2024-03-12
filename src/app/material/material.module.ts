import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  exports: [
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: []
})
export class MaterialModule {
  constructor() {}
}
